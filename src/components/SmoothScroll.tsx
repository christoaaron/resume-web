"use client";

import { ReactLenis } from "@studio-freight/react-lenis";

export default function SmoothScroll({
    children,
}: {
    children: any;
}) {
    return (
        <ReactLenis root options={{ duration: 1.2, smoothWheel: true }}>
            {children}
        </ReactLenis>
    );
}
