'use server';

import { cookies } from "next/headers";

async function changePassword(body) {
    try {

        const cookiesStore= cookies();
        const tokenInfo = cookiesStore.get('token')
        const token= tokenInfo.value
        const user = JSON.parse(cookiesStore.get('user').value)
        const userID= user._id

        const response = await fetch(`${process.env.API_URL}/users/changepswd/${userID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            console.log(response)
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error updating user:", error);
        throw new Error("No se pudo cambiar la contraseña comercio. Intenta nuevamente.");
    }
}

export default changePassword;
