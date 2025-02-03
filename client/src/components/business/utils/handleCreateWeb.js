'use server';
import { cookies } from 'next/headers';

async function handleCreateWeb(body) {
    try {
        const cookiesStore= cookies();
        const tokenInfo = cookiesStore.get('token')
        const token= tokenInfo.value
        const biz = JSON.parse(cookiesStore.get('biz').value)
        const bizCIF= biz.CIF

        const bodyData= {
            businessCIF: bizCIF,
            ...body
        }
        
        const response = await fetch(`${process.env.API_URL}/web`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(bodyData),
        });

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();

        cookiesStore.set({
            name: 'web',
            value: JSON.stringify(data.data),
            path: '/'
        });
        
        return data;
    } catch (error) {
        console.error("Error during web creation:", error);
        throw new Error("No se pudo crear la web. Intenta nuevamente.");
    }
}

export default handleCreateWeb
