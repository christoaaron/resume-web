import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import { verifyTOTPToken } from "@/lib/totp"

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    providers: [
        Credentials({
            name: "TOTP",
            credentials: {
                token: { label: "6-digit code", type: "text" },
            },
            async authorize(credentials) {
                const token = credentials?.token as string;
                if (!token) return null;

                const adminUser = await prisma.user.findFirst({
                    where: { twoFactorEnabled: true }
                });

                if (!adminUser || !adminUser.twoFactorSecret) return null;

                const isValid = verifyTOTPToken(token, adminUser.twoFactorSecret);
                if (isValid) {
                    return { id: adminUser.id, name: adminUser.name, email: adminUser.email }
                }
                return null;
            },
        }),
    ],
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        session: async ({ session, token }) => {
            if (session.user) {
                session.user.id = token.id as string;
            }
            return session;
        },
        authorized: async ({ auth }) => {
            return !!auth
        },
    },
})
