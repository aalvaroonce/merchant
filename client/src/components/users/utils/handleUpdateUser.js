'use server';
import { cookies } from 'next/headers';

async function updateUser(body) {
    try {

        const cookiesStore= cookies();
        const tokenInfo = cookiesStore.get('token')
        const token= tokenInfo.value
        const user = JSON.parse(cookiesStore.get('user').value)
        const userId= user._id

        const response = await fetch(`${process.env.API_URL}/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();

        cookiesStore.set({
            name: 'user',
            value: JSON.stringify(data.data.user), 
            path: '/',
        });
        return data;
    } catch (error) {
        console.error("Error updating user:", error);
        throw new Error("No se pudo actualizar el usuario. Intenta nuevamente.");
    }
}

export default updateUser
