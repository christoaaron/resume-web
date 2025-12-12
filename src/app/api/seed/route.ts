import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { education, experience, organizations, projects, skills, certifications } from "@/config/resume";

export async function GET() {
    try {
        // Clear existing data (optional, be careful in prod)
        // await prisma.project.deleteMany(); 
        // ...

        // Seed Experience
        for (const item of experience) {
            await prisma.experience.create({
                data: {
                    title: item.title,
                    subtitle: item.subtitle,
                    location: item.location,
                    date: item.date,
                    description: item.description || [],
                },
            });
        }

        // Seed Education
        for (const item of education) {
            await prisma.education.create({
                data: {
                    title: item.title,
                    subtitle: item.subtitle,
                    location: item.location,
                    date: item.date,
                },
            });
        }

        // Seed Organizations
        for (const item of organizations) {
            await prisma.organization.create({
                data: {
                    title: item.title,
                    subtitle: item.subtitle,
                    location: item.location,
                    date: item.date,
                },
            });
        }

        // Seed Projects
        for (const item of projects) {
            await prisma.project.create({
                data: {
                    title: item.title,
                    subtitle: item.subtitle,
                    location: item.location,
                    date: item.date,
                    description: item.description || [],
                },
            });
        }

        // Seed Skills
        for (const skill of skills.hard) {
            await prisma.skill.create({ data: { name: skill, type: "HARD" } });
        }
        for (const skill of skills.soft) {
            await prisma.skill.create({ data: { name: skill, type: "SOFT" } });
        }

        // Seed Certifications
        for (const cert of certifications) {
            await prisma.certification.create({ data: { name: cert } });
        }

        return NextResponse.json({ success: true, message: "Database seeded successfully" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: "Failed to seed database" }, { status: 500 });
    }
}
