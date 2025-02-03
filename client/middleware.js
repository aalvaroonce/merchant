// import { NextResponse } from "next/server";

// export function middleware(request) {
//     const { pathname } = request.nextUrl;

//     // Obtener cookies y roles
//     const userCookie = request.cookies.get('user')?.value;
//     const bizCookie = request.cookies.get('biz')?.value;
//     const userRole = userCookie ? JSON.parse(userCookie).role : undefined;

//     // Determinar el rol del usuario
//     const role = userRole === 'admin'
//         ? 'admin'
//         : userRole
//         ? 'user'
//         : bizCookie
//         ? 'biz'
//         : 'guest';

//     console.log("Middleware ejecutado para:", { role, pathname });

//     // Excluir rutas públicas y estáticas
//     const publicRoutes = ['/login', '/register', '/'];
//     if (
//         pathname.startsWith('/_next') ||
//         pathname.startsWith('/static') ||
//         pathname.startsWith('/images') ||
//         pathname.startsWith('/favicon.ico') ||
//         pathname.startsWith('/robots.txt') ||
//         pathname.startsWith('/sitemap.xml') ||
//         pathname.match(/\.(jpg|jpeg|png|gif|svg|ico|webp|css|js|woff|woff2|ttf|otf|eot|ttc)$/i)
//     ) {
//         return NextResponse.next();
//     }

//     // Si el usuario tiene rol pero intenta acceder a una ruta pública
//     if (role !== 'guest' && publicRoutes.includes(pathname)) {
//         const target = `/${role}`;
//         if (pathname === target) {
//             return NextResponse.next(); // Ya está en la ruta correcta
//         }
//         return NextResponse.redirect(new URL(target, request.url));
//     }

//     // Si el usuario es 'guest' pero intenta acceder a una ruta protegida
//     if (
//         role === 'guest' &&
//         (pathname.startsWith('/admin') || pathname.startsWith('/user') || pathname.startsWith('/biz'))
//     ) {
//         if (pathname === '/login') {
//             return NextResponse.next(); // Ya está en login
//         }
//         return NextResponse.redirect(new URL('/login', request.url));
//     }

//     // Si el usuario es 'user' pero intenta acceder a otra sección
//     if (role === 'user' && !pathname.startsWith('/user')) {
//         if (pathname === '/user') {
//             return NextResponse.next(); // Ya está en la ruta correcta
//         }
//         return NextResponse.redirect(new URL('/user', request.url));
//     }

//     // Si el usuario es 'biz' pero intenta acceder a otra sección
//     if (role === 'biz' && !pathname.startsWith('/biz')) {
//         if (pathname === '/biz') {
//             return NextResponse.next(); // Ya está en la ruta correcta
//         }
//         return NextResponse.redirect(new URL('/biz', request.url));
//     }

//     // Si el usuario es 'admin', permitir acceso a todas las rutas
//     if (role === 'admin') {
//         return NextResponse.next();
//     }

//     // Por defecto, redirigir a login si no se cumple ninguna condición
//     if (pathname === '/login') {
//         return NextResponse.next(); // Ya está en login
//     }
//     return NextResponse.redirect(new URL('/login', request.url));
// }

// export const config = {
//     matcher: '/:path*',
// };
