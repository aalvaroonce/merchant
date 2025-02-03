'use server';
import { cookies } from 'next/headers';

async function handleLogin(body) {
    try {
        const response = await fetch(`${process.env.API_URL}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        console.log(response)

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();

        if (!data.data.token) {
            throw new Error("Token no encontrado en la respuesta");
        }

        const cookieStore = cookies();

        cookieStore.set({
            name: 'token',
            value: data.data.token,
            path: '/',
        });

        if (data.data.user) {
            cookieStore.set({
                name: 'user',
                value: JSON.stringify(data.data.user), 
                path: '/',
            });

        } else if (data.data.biz) {
            cookieStore.set({
                name: 'biz',
                value: JSON.stringify(data.data.biz), 
                path: '/'
            });

            const responseWeb = await fetch(`${process.env.API_URL}/web/${data.data.biz.CIF}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (responseWeb.ok) {
                const dataWeb = await responseWeb.json();
            
                cookieStore.set({
                    name: 'web',
                    value: JSON.stringify(dataWeb.data), 
                    path: '/'
                });
            }
        }

        return data;
    } catch (error) {
        console.error("Error during login:", error);
        throw new Error("No se pudo iniciar sesión. Intenta nuevamente.");
    }
}

export default handleLogin;
