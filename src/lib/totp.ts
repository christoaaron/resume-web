import { authenticator } from "otplib";
import qrcode from "qrcode";

/**
 * Generates a random secret for TOTP.
 */
export const generateTOTPSecret = () => authenticator.generateSecret();

/**
 * Generates a QR code data URL for the given user email and secret.
 */
export const generateTOTPQRCode = async (email: string, secret: string) => {
    const otpauth = authenticator.keyuri(
        email,
        "Christopher Aaron Portfolio", // Service name
        secret
    );
    return await qrcode.toDataURL(otpauth);
};

/**
 * Verifies a 6-digit TOTP token against a secret.
 */
export const verifyTOTPToken = (token: string, secret: string) => {
    return authenticator.check(token, secret);
};
