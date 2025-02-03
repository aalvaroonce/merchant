'use server';
import { cookies } from 'next/headers';

async function handleSignIn(body) {
    try {
        const response = await fetch(`${process.env.API_URL}/users/register`, {
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
                path: '/'

            });
        }
        return data;
    } catch (error) {
        console.error("Error during registration:", error);
        throw new Error("No se pudo completar el registro. Intenta nuevamente.");
    }
}

export default handleSignIn
