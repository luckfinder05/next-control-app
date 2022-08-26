import { NextRequest, NextResponse, userAgent } from 'next/server'
import { getToken } from "next-auth/jwt"

export async function middleware(req) {
    if (req.nextUrl.pathname.startsWith('/secure')) {
        // This logic is only applied to /secure
        const session = await getToken({ req, secret: process.env.SECRET })
        console.log('session: ', session);
        // You could also check for any property on the session object,
        // like role === "admin" or name === "John Doe", etc.
        if (!session) return NextResponse.redirect("/api/auth/signin")

        return NextResponse.next()
    }

    // if (request.nextUrl.pathname.startsWith('/dashboard')) {
    //     // This logic is only applied to /dashboard
    // }
}