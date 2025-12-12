import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { z } from "zod"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                // Hardcoded admin for "Admin Page" requirement
                // ideally move to env vars: process.env.ADMIN_USER, process.env.ADMIN_PASS
                if (
                    credentials?.username === "admin" &&
                    credentials?.password === "password123" // Change this!
                ) {
                    return { id: "1", name: "Christopher Aaron", email: "admin@example.com" }
                }
                return null
            },
        }),
    ],
    pages: {
        signIn: "/auth/signin",
    },
    callbacks: {
        authorized: async ({ auth }) => {
            return !!auth
        },
    },
})
