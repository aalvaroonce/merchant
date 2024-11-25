'use server';
import { cookies } from 'next/headers';

export async function deleteUser(logic = false) {
    try {
        const cookiesStore = cookies();
        const token = cookiesStore.get('token')?.value;
        const user = JSON.parse(cookiesStore.get('user')?.value || '{}');
        const userId = user._id;

        if (!token || !userId) {
            throw new Error("Faltan credenciales para eliminar el usuario.");
        }

        // Construye la URL con el parámetro `logic` si es necesario
        const url = `${process.env.API_URL}/users/${userId}${logic ? '?logic=true' : ''}`;

        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error deleting user:", error);
        throw new Error("No se pudo borrar el usuario. Intenta nuevamente.");
    }
}
