export function middleware(request) {
    const currentUser = request.cookies.get('token')?.value

    if (currentUser && !request.nextUrl.pathname.startsWith('/dashboard') &&
                       !request.nextUrl.pathname.startsWith('/verification') &&
                       !request.nextUrl.pathname.startsWith('/register')) {
                        return Response.redirect(new URL('/', request.url))
                       }
    
    if (!currentUser && request.nextUrl.pathname.startsWith('/dashboard')){
        return Response.redirect(new URL('/login', request.url))
    }
}

export const 