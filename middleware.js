export function middleware(request) {
    if (request.nextUrl.pathname.startsWith('/secure')) {
        // This logic is only applied to /about
    }

    // if (request.nextUrl.pathname.startsWith('/dashboard')) {
    //     // This logic is only applied to /dashboard
    // }
}