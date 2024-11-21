'use server';

export async function addReview(businessCIF, reviewData, token) {
    try {
        const response = await fetch(`http://localhost:3000/api/web/addreview/${businessCIF}`, {
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
