'use server';

import { cookies } from "next/headers";

async function getUsers(filters) {
    try {

        const cookieStore = cookies();
        const tokenInfo = cookieStore.get('token')
        const token= tokenInfo.value
        let url = `${process.env.API_URL}/users?upwards=${filters.upwards}&deleted=${filters.deleted}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        return data.users;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw new Error("Error al obtener los datos de los usuarios.");
    }
}

export default getUsers
