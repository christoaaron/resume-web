"use server";

import { prisma } from "@/lib/prisma";
import { generateTOTPSecret, generateTOTPQRCode, verifyTOTPToken } from "@/lib/totp";
import { signIn } from "@/auth";

/**
 * Gets the initial TOTP setup info if no admin exists.
 */
export async function getTOTPSetup() {
    const adminUser = await prisma.user.findFirst({
        where: { twoFactorEnabled: true }
    });

    if (adminUser) return null;

    const email = "admin@example.com";
    const secret = generateTOTPSecret();
    const qrCode = await generateTOTPQRCode(email, secret);

    return { email, secret, qrCode };
}

/**
 * Verifies the initial TOTP setup and enables it for the admin user.
 */
export async function activateTOTP(token: string, secret: string) {
    const isValid = verifyTOTPToken(token, secret);
    if (!isValid) return { error: "Invalid 6-digit code. Please try again." };

    const email = "admin@example.com";
    
    // Create or update the admin user
    const user = await prisma.user.upsert({
        where: { email },
        update: {
            twoFactorSecret: secret,
            twoFactorEnabled: true,
            name: "Administrator"
        },
        create: {
            email,
            name: "Administrator",
            twoFactorSecret: secret,
            twoFactorEnabled: true
        }
    });

    return { success: true };
}

/**
 * Verifies the TOTP code and logs the user in.
 */
export async function verifyAndLogin(token: string) {
    const adminUser = await prisma.user.findFirst({
        where: { twoFactorEnabled: true }
    });

    if (!adminUser || !adminUser.twoFactorSecret) {
        return { error: "No administrator found. Please perform setup." };
    }

    const isValid = verifyTOTPToken(token, adminUser.twoFactorSecret);
    if (!isValid) return { error: "Invalid 6-digit code." };

    // In Auth.js v5, we can't easily trigger a persistent session from a server action 
    // without using the `signIn` function which expects a provider.
    // However, we can use a custom Credentials provider that specifically handles our TOTP logic.
    // For now, we'll return success and let the client call signIn("credentials", { token }).
    
    return { success: true };
}
