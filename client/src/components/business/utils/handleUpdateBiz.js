'use server';

import { cookies } from "next/headers";

async function updateBiz(body, cif) {
    try {

        const cookiesStore= cookies();
        const tokenInfo = cookiesStore.get('token')
        const token= tokenInfo.value

        const response = await fetch(`${process.env.API_URL}/business/${cif}`, {
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
            name: 'biz',
            value: JSON.stringify(data.data), 
            path: '/'
        });

        return data;
    } catch (error) {
        console.error("Error updating business:", error);
        throw new Error("No se pudo actualizar el comercio. Intenta nuevamente.");
    }
}

export default updateBiz;
