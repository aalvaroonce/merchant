'use server';

export async function getBizs(filters) {
    try {
        let url = `http://localhost:3000/api/business?upwards=${filters.upwards}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        return data.bizs;
    } catch (error) {
        console.error("Error fetching bizs:", error);
        throw new Error("Error al obtener los datos de los comercios.");
    }
}
