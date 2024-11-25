'use server';

export async function showUsers(token) {
    try {
        
        const response = await fetch(`${process.env.API_URL}/business/users`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error deleting user:", error);
        throw new Error("No se pudo borrar el usuario. Intenta nuevamente.");
    }
}
