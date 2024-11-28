'use server';

import { cookies } from "next/headers";

async function handleUpdateWeb( body ) {
    try {

        const cookiesStore = cookies();
        const tokenInfo = cookiesStore.get('token')
        const token= tokenInfo.value
        
        const web = JSON.parse(cookiesStore.get('web').value)
        const bizCIF = web.businessCIF

        const response = await fetch(`${process.env.API_URL}/web/${bizCIF}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();

        cookiesStore.set({
            name: 'web',
            value: JSON.stringify(data.data),
            path: '/',
        });
        return data;
    } catch (error) {
        console.error("Error updating business:", error);
        throw new Error("No se pudo actualizar el comercio. Intenta nuevamente.");
    }
}

export default handleUpdateWeb;
