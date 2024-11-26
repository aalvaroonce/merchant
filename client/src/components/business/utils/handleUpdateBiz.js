'use server';

async function handleUpdateBiz(body) {
    try {

        const cookiesStore= cookies();
        const tokenInfo = cookiesStore.get('token')
        const token= tokenInfo.value
        const biz = JSON.parse(cookiesStore.get('biz').value)
        const bizCIF= biz.CIF

        const response = await fetch(`${process.env.API_URL}/business/${bizCIF}`, {
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

export default handleUpdateBiz;
