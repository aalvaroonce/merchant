'use server';

import { cookies } from "next/headers";


export default async function restoreWeb(cif) {
    try {

        const cookieStore = cookies();
        const tokenInfo = cookieStore.get('token')
        const token= tokenInfo.value

        const response = await fetch(`${process.env.API_URL}/web/restore/${cif}`, {
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
        console.error("Error web restoring:", error);
        throw new Error("No se pudo la restauración de datos. Intenta nuevamente.");
    }
}
