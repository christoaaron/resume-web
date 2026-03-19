import NextAuth from "next-auth"
import Passkey from "next-auth/providers/passkey"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        Passkey,
    ],
    experimental: { enableWebAuthn: true },
    callbacks: {
        session: async ({ session, user }) => {
            if (session.user && user) {
                session.user.id = user.id;
            }
            return session;
        },
        authorized: async ({ auth }) => {
            return !!auth
        },
    },
})
