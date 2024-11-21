'use server';

export async function getBizDetails(cif) {
    try {
        const url = `http://localhost:3000/api/business/${cif}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.statusText}`);
        }

        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Error fetching business details:", error);
        throw new Error("Error al obtener los detalles del comercio.");
    }
}
