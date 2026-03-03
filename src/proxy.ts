import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
    const isLoggedIn = !!req.auth
    const isAuthPage = req.nextUrl.pathname.startsWith("/auth")
    const isAdminPage = req.nextUrl.pathname.startsWith("/admin")

    // We pass the pathname to standard headers so that app/layout.tsx (Server Component) 
    // can read it and perform DB-dependent maintenance mode redirection
    const requestHeaders = new Headers(req.headers)
    requestHeaders.set("x-pathname", req.nextUrl.pathname)

    if (isAuthPage) {
        if (isLoggedIn) {
            return NextResponse.redirect(new URL("/admin", req.nextUrl))
        }
        return NextResponse.next({
            request: {
                headers: requestHeaders,
            },
        })
    }

    if (isAdminPage && !isLoggedIn) {
        return NextResponse.redirect(new URL("/auth/signin", req.nextUrl))
    }

    return NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    })
})

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
