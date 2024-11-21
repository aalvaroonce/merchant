'use server';

export async function updateBiz(bizCIF, token, body) {
    try {
        const response = await fetch(`http://localhost:3000/api/business/${bizCIF}`, {
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
        return data;
    } catch (error) {
        console.error("Error updating business:", error);
        throw new Error("No se pudo actualizar el comercio. Intenta nuevamente.");
    }
}
