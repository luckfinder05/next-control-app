import { NextRequest, NextResponse, userAgent } from 'next/server'

export async function middleware(request) {
    if (request.nextUrl.pathname.startsWith('/secure')) {
        // This logic is only applied to /about
    }

    // if (request.nextUrl.pathname.startsWith('/dashboard')) {
    //     // This logic is only applied to /dashboard
    // }
}