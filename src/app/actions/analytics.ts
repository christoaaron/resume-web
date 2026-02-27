"use server";

import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import crypto from "crypto";

export async function trackVisit() {
    try {
        const headersList = await headers();
        const ip = headersList.get("x-forwarded-for") || "unknown";
        const userAgent = headersList.get("user-agent") || "unknown";

        // PRIVACY: Hash the IP address so we don't store actual IPs
        const ipHash = crypto.createHash("sha256").update(ip).digest("hex");

        // Simple duplicate check: prevent creating same visit within last 1 hour? 
        // Or just log everything? Let's log unique visits per 24h for "Unique" stat.

        await prisma.visitor.create({
            data: {
                ipHash,
                userAgent,
            }
        });

        return { success: true };
    } catch (e) {
        console.error("Tracking error:", e);
        return { success: false };
    }
}

export async function getVisitorStats() {
    try {
        const totalVisits = await prisma.visitor.count();

        // For unique visitors, we can group by ipHash. 
        // Prisma doesn't support distinct count directly in easy API for all DBs, 
        // but for now let's just count unique hashes distinct.
        const uniqueVisitors = await prisma.visitor.groupBy({
            by: ['ipHash'],
        });

        return {
            total: totalVisits,
            unique: uniqueVisitors.length
        };
    } catch {
        return { total: 0, unique: 0 };
    }
}
