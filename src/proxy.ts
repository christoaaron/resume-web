import { auth } from "@/auth"

export default auth((req) => {
    const isLoggedIn = !!req.auth
    const isAuthPage = req.nextUrl.pathname.startsWith("/auth")
    const isAdminPage = req.nextUrl.pathname.startsWith("/admin")

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
