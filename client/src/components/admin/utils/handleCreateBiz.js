'use server';

export async function createBiz(body) {
    try {
        const response = await fetch(`${process.env.API_URL}/api/business`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error during registration:", error);
        throw new Error("No se pudo completar el registro. Intenta nuevamente.");
    }
}
