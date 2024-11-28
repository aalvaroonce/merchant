import { NextResponse } from "next/server";

export function middleware(request) {
    const user = request.cookies.get('user')?.value;
    const userRole = user? JSON.parse(user).role: undefined;
    const bizRole = request.cookies.get('biz')?.value;

    const role = userRole === 'user'? 'user': userRole? 'admin': bizRole? 'biz': 'guest';


    const publicRoutes = ['/login', '/register', '/'];

  
    if (
        pathname.startsWith('/_next') || 
        pathname.startsWith('/static') ||
        pathname.startsWith('/images') || 
        pathname.startsWith('/favicon.ico') || 
        pathname.startsWith('/robots.txt') || 
        pathname.startsWith('/sitemap.xml') || 
        pathname.match(/\.(jpg|jpeg|png|gif|svg|ico|webp|css|js|woff|woff2|ttf|otf|eot|ttc)$/i) 
    ) {
        return NextResponse.next();
    }

   
    if (token && publicRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    if (!token && (pathname.startsWith('/dashboard') || pathname.startsWith('/user') || pathname.startsWith('/biz'))) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (role === 'user' && !pathname.startsWith('/user')) {
        return NextResponse.redirect(new URL('/user', request.url));
    }

    if (role === 'biz' && !pathname.startsWith('/biz')) {
        return NextResponse.redirect(new URL('/biz', request.url));
    }

    if (role === 'admin') {
        return NextResponse.next();
    }

    return NextResponse.redirect(new URL('/login', request.url));
}

export const config = {
    matcher: '/:path*'
};
