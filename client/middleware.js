export function middleware(request) {
    const currentUser = request.cookies.get('token')?.value;

    const staticFileExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.css', '.ico', '.woff', '.woff2', '.ttf', '.eot'];
    const pathname = request.nextUrl.pathname;

    if (staticFileExtensions.some((ext) => pathname.endsWith(ext))) {
        return; 
    }

    if (currentUser && 
        !pathname.startsWith('/dashboard') &&
        !pathname.startsWith('/login') &&
        !pathname.startsWith('/register')) {
        return Response.redirect(new URL('/', request.url));
    }

    if (!currentUser && pathname.startsWith('/dashboard')) {
        return Response.redirect(new URL('/login', request.url));
    }
}

export const config = {
    matcher: '/:path*', 
};
