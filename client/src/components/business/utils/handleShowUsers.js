'use server';

import { cookies } from "next/headers";

async function showUsers() {
    const cookiesStore= cookies();
    const tokenInfo = cookiesStore.get('token')
    const token= tokenInfo.value

    try {
        
        const response = await fetch(`${process.env.API_URL}/business/users`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error showing users:", error);
        throw new Error("No se pudo enseñar el usuario. Intenta nuevamente.");
    }
}


export default showUsers