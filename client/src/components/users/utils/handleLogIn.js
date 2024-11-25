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
                value: JSON.stringify(data.data.user), // Serializa el objeto si es necesario
                path: '/',
            });
        } else if (data.data.biz) {
            cookieStore.set({
                name: 'biz',
                value: JSON.stringify(data.data.biz), // Serializa el objeto si es necesario
                path: '/',
            });
        }

        return data;
    } catch (error) {
        console.error("Error during login:", error);
        throw new Error("No se pudo iniciar sesión. Intenta nuevamente.");
    }
}

export default handleLogin;
