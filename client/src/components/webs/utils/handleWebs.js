'use server';

async function getWebs(filters) {
    try {

        let url = `${process.env.API_URL}/web`;
        if (filters.city || filters.activity || filters.sortByScoring) {
            url += `/search/${filters.city || "empty"}/${filters.activity || "empty"}`;
            if (filters.sortByScoring) {
                url += `?sortByScoring=true&upwards=${filters.upwards}`;
            }
        }

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            console.log(response)
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        return data.webs;
    } catch (error) {
        console.error("Error fetching webs:", error);
        throw new Error("Error al obtener los datos de las webs.");
    }
}

export default getWebs