import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Passkey from "next-auth/providers/passkey"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        Passkey,
        Credentials({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                const adminUser = process.env.ADMIN_USER || "admin";
                const adminPassword = process.env.ADMIN_PASSWORD || "password123";

                if (
                    credentials?.username === adminUser &&
                    credentials?.password === adminPassword
                ) {
                    // Find or create the admin user in the database to link with sessions/passkeys
                    let user = await prisma.user.findUnique({
                        where: { email: "admin@example.com" }
                    });

                    if (!user) {
                        user = await prisma.user.create({
                            data: {
                                name: "Christopher Aaron",
                                email: "admin@example.com",
                            }
                        });
                    }

                    return { id: user.id, name: user.name, email: user.email }
                }
                return null
            },
        }),
    ],
    experimental: { enableWebAuthn: true },
    pages: {
        signIn: "/auth/signin",
    },
    callbacks: {
        authorized: async ({ auth }) => {
            return !!auth
        },
    },
})
