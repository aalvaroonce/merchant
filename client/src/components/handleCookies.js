'use server'
import { cookies } from 'next/headers';

export default async function handleCookies() {
    try{
        const cookieStore = cookies();

        cookieStore.set('token', '', { path: '/', expires: new Date(0) });
        cookieStore.set('user', '', { path: '/', expires: new Date(0) });
        cookieStore.set('biz', '', { path: '/', expires: new Date(0) });
        cookieStore.set('web', '', { path: '/', expires: new Date(0) });
        return { message: 'Sesión cerrada exitosamente', ok: true };

    } catch(error){
        console.error("Error eliminating cookies user:", error);
        throw new Error("No se pudo cerrar sesión. Intenta nuevamente.");
    }

}
