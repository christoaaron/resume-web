"use client"

import { Card } from "@/components/ui/card"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { Fingerprint } from "lucide-react"

export default function SignIn() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        await signIn("credentials", { username, password, redirectTo: "/admin" })
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
            <Card className="w-full max-w-md p-8 bg-card border-border">
                <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-muted border border-border rounded-md px-3 py-2 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-muted border border-border rounded-md px-3 py-2 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary/90 transition-colors"
                    >
                        Sign In
                    </button>
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-border"></span>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => signIn("passkey", { redirectTo: "/admin" })}
                        className="w-full flex items-center justify-center gap-2 border border-border py-2 rounded-md hover:bg-muted transition-colors font-medium"
                    >
                        <Fingerprint className="w-4 h-4 text-primary" /> Sign in with Passkey
                    </button>
                </form>
            </Card>
        </div>
    )
}
