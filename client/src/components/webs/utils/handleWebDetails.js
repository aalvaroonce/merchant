'use server';

async function getWebDetails(cif) {
    try {
        const url = `${process.env.API_URL}/web/${cif}`;
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
        console.error("Error fetching web details:", error);
        throw new Error("Failed to fetch web details.");
    }
}

export default getWebDetails