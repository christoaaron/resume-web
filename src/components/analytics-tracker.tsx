import { trackVisit } from "@/app/actions/analytics";

export async function AnalyticsTracker() {
    // This is a Server Component. It runs on the server.
    // We invoke the server action directly.
    // Fire and forget - don't await strictly to block UI? 
    // Actually in RSC we should probably just call it.

    await trackVisit();

    return null; // Renders nothing
}
