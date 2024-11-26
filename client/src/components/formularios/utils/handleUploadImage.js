'use server'
import { cookies } from "next/headers";

async function uploadImage(file) {

    try {
        const cookieStore = cookies();
        const tokenInfo = cookieStore.get('token')
        const token= tokenInfo.value
        const biz = cookieStore.get('biz');
        const bizCIF= JSON.parse(biz.value).bizCIF

        const formData = new FormData();
        formData.append("image", file);

        const response = await fetch(`${process.env.API_URL}/web/memory/addimage/${bizCIF}`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error("Error al subir la imagen. Verifique el archivo.");
        }

        const data = await response.json();
        return data; 
    } catch (error) {
        console.error("Error during image upload:", error);
        throw new Error("No se pudo subir la imagen. Intenta nuevamente.");
    }
};

export default uploadImage;
