import Link from "next/link";
import {
    User,
    Briefcase,
    GraduationCap,
    Building2,
    FolderKanban,
    Award,
    ArrowRight,
    LayoutDashboard,
    Activity
} from "lucide-react";
import { getVisitorStats } from "@/app/actions/analytics";

const adminSections = [
    {
        title: "Profile",
        description: "Manage your personal information, bio, and social links.",
        icon: User,
        href: "/admin/profile",
        color: "text-blue-500",
        bg: "bg-blue-500/10",
    },
    {
        title: "Projects",
        description: "Add or edit your portfolio projects and case studies.",
        icon: FolderKanban,
        href: "/admin/projects",
        color: "text-purple-500",
        bg: "bg-purple-500/10",
    },
    {
        title: "Experience",
        description: "Update your work history and professional roles.",
        icon: Briefcase,
        href: "/admin/experience",
        color: "text-amber-500",
        bg: "bg-amber-500/10",
    },
    {
        title: "Education",
        description: "Manage your academic background and degrees.",
        icon: GraduationCap,
        href: "/admin/education",
        color: "text-emerald-500",
        bg: "bg-emerald-500/10",
    },
    {
        title: "Organizations",
        description: "Edit volunteer work and organizational memberships.",
        icon: Building2,
        href: "/admin/organizations",
        color: "text-rose-500",
        bg: "bg-rose-500/10",
    },
    {
        title: "Skills & Certs",
        description: "Update your technical skills and certifications.",
        icon: Award,
        href: "/admin/skills",
        color: "text-cyan-500",
        bg: "bg-cyan-500/10",
    },
];

export const revalidate = 0; // Ensure fresh stats

export default async function AdminDashboard() {
    const stats = await getVisitorStats();

    return (
        <div className="flex min-h-screen bg-background text-foreground">
            {/* Sidebar - Hidden on mobile, consistent with other admin pages if they use a layout, 
          but for now we'll focus on the main content area as a landing pad */}

            <main className="flex-1 p-8 md:p-12 max-w-7xl mx-auto">
                <header className="mb-12">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-3 bg-primary/10 rounded-xl">
                            <LayoutDashboard className="w-8 h-8 text-primary" />
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
                    </div>
                    <p className="text-lg text-muted-foreground max-w-2xl">
                        Welcome back. Select a section below to manage your portfolio content and keep your digital presence up to date.
                    </p>
                </header>

                {/* STATS WIDGET */}
                <div className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-card border border-border rounded-2xl p-6 flex items-center gap-4 shadow-sm">
                        <div className="p-4 bg-green-500/10 text-green-500 rounded-xl">
                            <Activity className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-muted-foreground text-sm font-medium">Unique Visitors (Estimate)</p>
                            <h3 className="text-3xl font-bold">{stats.unique}</h3>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {adminSections.map((section) => (
                        <Link key={section.title} href={section.href} className="group block h-full">
                            <div className="h-full bg-card border border-border rounded-2xl p-6 hover:border-primary/50 hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                                <div className={`absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity ${section.color}`}>
                                    <section.icon className="w-24 h-24 transform translate-x-4 -translate-y-4" />
                                </div>

                                <div className="relative z-10">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${section.bg} ${section.color}`}>
                                        <section.icon className="w-6 h-6" />
                                    </div>

                                    <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                                        {section.title}
                                    </h2>
                                    <p className="text-muted-foreground text-sm mb-6 line-clamp-2">
                                        {section.description}
                                    </p>

                                    <div className="flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                        Manage <ArrowRight className="w-4 h-4 ml-1" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
}
