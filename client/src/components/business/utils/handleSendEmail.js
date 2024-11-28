'use server'
import { cookies } from "next/headers";

const sendEmail = async (emailData) => {
    const cookiesStore= cookies();
    const tokenInfo = cookiesStore.get('token')
    const token= tokenInfo.value
    try {
        
        const response = await fetch(`${process.env.API_URL}/business/mail`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(emailData),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("No se pudo mandar el email. Intenta nuevamente.");
    }
};

export default sendEmail;
