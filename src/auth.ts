import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
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
