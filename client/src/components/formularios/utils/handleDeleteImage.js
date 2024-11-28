'use server'
import { cookies } from "next/headers";

async function deleteImage(imageUrl) {
    try{
        const cookiesStore= cookies()
        const tokenInfo = cookiesStore.get('token')
        const token= tokenInfo.value
        const biz = cookiesStore.get('biz')
        const bizCIF= JSON.parse(biz.value).CIF

        const response = await fetch(`${process.env.API_URL}/web/memory/deleteimage/${bizCIF}`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ imageUrl: imageUrl }),
        });

        if (!response.ok) {
            throw new Error("Error al eliminar la imagen.");
        }

        const data= response.json()
        
        return data

    } catch (error) {
        console.error("Error deleting image:", error);
        throw new Error("No se pudo borrar la imagen. Intenta nuevamente.");
    }
}

export default deleteImage