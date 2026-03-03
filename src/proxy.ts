import { auth } from "@/auth"
import { NextResponse } from "next/server"

// Set this to true to enable maintenance mode across the entire public site
const MAINTENANCE_MODE = true;

export default auth((req) => {
    const isLoggedIn = !!req.auth
    const isAuthPage = req.nextUrl.pathname.startsWith("/auth")
    const isAdminPage = req.nextUrl.pathname.startsWith("/admin")
    const isMaintenancePage = req.nextUrl.pathname === "/maintenance"
    const isApiPage = req.nextUrl.pathname.startsWith("/api")
    const isStaticFile = /\.(.*)$/.test(req.nextUrl.pathname)
    
    // Redirect to maintenance page if we're in maintenance mode
    // We still allow access to /admin, /auth, and /api routes for the site owner
    if (MAINTENANCE_MODE && !isAdminPage && !isAuthPage && !isApiPage && !isMaintenancePage && !isStaticFile) {
        return NextResponse.redirect(new URL("/maintenance", req.nextUrl))
    }

    if (isAuthPage) {
        if (isLoggedIn) {
            return Response.redirect(new URL("/admin", req.nextUrl))
        }
        return
    }

    if (isAdminPage && !isLoggedIn) {
        return Response.redirect(new URL("/auth/signin", req.nextUrl))
    }
})

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
