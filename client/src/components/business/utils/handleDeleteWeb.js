'use server';
import { cookies } from 'next/headers';

async function deleteWeb(logic = false) {
    try {
        const cookiesStore = cookies();
        const token = cookiesStore.get('token')?.value;
        const biz = JSON.parse(cookiesStore.get('biz')?.value || '{}');
        const bizCIF = biz.CIF;

        const url = `${process.env.API_URL}/web/${bizCIF}${logic ? '?logic=true' : ''}`;

        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        
        cookiesStore.set('web', '', { path: '/', expires: new Date(0) });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error deleting business:", error);
        throw new Error("No se pudo borrar el comercio. Intenta nuevamente.");
    }
}

export default deleteWeb