'use server';

import { cookies } from "next/headers";


export default async function restoreBiz(id) {
    try {

        const cookieStore = cookies();
        const tokenInfo = cookieStore.get('token')
        const token= tokenInfo.value

        const response = await fetch(`${process.env.API_URL}/users/restore/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}- ${response.message}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error during restauration:", error);
        throw new Error("No se pudo completar la restauranción. Intenta nuevamente.");
    }
}
