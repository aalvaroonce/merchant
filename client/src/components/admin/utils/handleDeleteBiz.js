'use server';

import { cookies } from "next/headers";

export async function deleteBiz(logic= false) {
    try {
        const cookieStore = cookies();
        const tokenInfo = cookieStore.get('token')
        const token= tokenInfo.value
        const biz = JSON.parse(cookieStore.get('biz').value)
        const bizCIF = biz.CIF

        const url = `${process.env.API_URL}/business/${bizCIF}${logic ? '?logic=true' : ''}`;
        
        const response = await fetch(url, {
            method: 'DELETE',
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
        console.error("Error deleting biz:", error);
        throw new Error("No se pudo borrar el comercio. Intenta nuevamente.");
    }
}
