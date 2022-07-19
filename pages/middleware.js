

export function middleware(request) {
    console.log('request: ', request);
    if (request.nextUrl.pathname.startsWith('/about')) {
        // This logic is only applied to /about
    }

    if (request.nextUrl.pathname.startsWith('/dashboard')) {
        // This logic is only applied to /dashboard
    }
}