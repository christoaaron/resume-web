import { auth, signOut } from "@/auth"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await auth()
    if (!session) redirect("/auth/signin")

    return (
        <div className="min-h-screen bg-background text-foreground flex">
            <aside className="w-64 border-r border-border p-6 hidden md:block">
                <h2 className="text-xl font-bold mb-8">Admin Panel</h2>
                <nav className="space-y-2">
                    <Link href="/admin" className="block px-4 py-2 hover:bg-muted rounded text-sm">Dashboard</Link>
                    <Link href="/admin/projects" className="block px-4 py-2 hover:bg-muted rounded text-sm">Projects</Link>
                    <Link href="/admin/experience" className="block px-4 py-2 hover:bg-muted rounded text-sm">Experience</Link>
                </nav>
                <div className="mt-8 pt-8 border-t border-border">
                    <form action={async () => {
                        "use server"
                        await signOut()
                    }}>
                        <button className="text-sm text-red-500 hover:text-red-600">Sign Out</button>
                    </form>
                </div>
            </aside>
            <main className="flex-1 p-8 overflow-auto">
                {children}
            </main>
        </div>
    )
}
