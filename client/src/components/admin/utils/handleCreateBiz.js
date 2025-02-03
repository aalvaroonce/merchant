'use server';

import { cookies } from "next/headers";

async function createBiz(body) {
    try {
        const cookiesStore= cookies()
        const tokenInfo = cookiesStore.get('token')
        const token= tokenInfo.value
        
        const response = await fetch(`${process.env.API_URL}/business`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();

        cookiesStore.set({
            name: 'biz',
            value: JSON.stringify(data.data), 
            path: '/',
        });

        return data;
    } catch (error) {
        console.error("Error during registration:", error);
        throw new Error("No se pudo completar el registro. Intenta nuevamente.");
    }
}

export default createBiz
