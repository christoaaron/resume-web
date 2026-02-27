"use client";

import { useEffect } from "react";
import { trackVisit } from "@/app/actions/analytics";

export function AnalyticsTracker() {
    useEffect(() => {
        // Fire and forget, invoke server action securely from client on mount
        trackVisit().catch((err) => console.error("Tracking error:", err));
    }, []);

    return null; // Renders nothing
}
