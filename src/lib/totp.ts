import { TOTP, generateSecret, generateURI, verifySync } from "otplib";
import qrcode from "qrcode";

/**
 * Generates a random secret for TOTP.
 */
export const generateTOTPSecret = () => generateSecret();

/**
 * Generates a QR code data URL for the given user email and secret.
 */
export const generateTOTPQRCode = async (email: string, secret: string) => {
    const otpauth = generateURI({
        secret,
        label: email,
        issuer: "Christopher Aaron Portfolio",
    });
    return await qrcode.toDataURL(otpauth);
};

/**
 * Verifies a 6-digit TOTP token against a secret.
 */
export const verifyTOTPToken = (token: string, secret: string) => {
    const result = verifySync({
        token,
        secret
    }) as { valid: boolean };
    
    return result.valid;
};
