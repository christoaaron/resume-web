"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getSettings() {
    let settings = await prisma.systemSettings.findUnique({
        where: { id: "global" }
    });
    
    if (!settings) {
        settings = await prisma.systemSettings.create({
            data: { id: "global" }
        });
    }
    
    return settings;
}

export async function updateSettings(data: { maintenanceActive: boolean, maintenanceMessage: string }) {
    await prisma.systemSettings.upsert({
        where: { id: "global" },
        update: data,
        create: {
            id: "global",
            ...data
        }
    });
    
    revalidatePath("/", "layout"); // Revalidate the whole app layout so the changes take effect everywhere
    return { success: true };
}
