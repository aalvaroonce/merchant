'use server';

import { cookies } from "next/headers";

async function addReview(businessCIF, reviewData) {
    try {

        const cookiesStore= cookies();
        const tokenInfo = cookiesStore.get('token')
        const token = tokenInfo.value

        const response = await fetch(`${process.env.API_URL}/web/addreview/${businessCIF}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(reviewData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al enviar la reseña');
        }

        return await response.json();
    } catch (error) {
        console.error('Error al enviar la reseña:', error);
        throw new Error(error.message || 'Error al enviar la reseña');
    }
}

export default addReview
