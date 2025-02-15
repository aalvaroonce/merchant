'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import FormularioSignIn from '@/components/formularios/FormularioSignIn';
import Mensaje from '@/components/Mensaje';
import Notification from '@/components/Notification';
import handleSignIn from '@/components/users/utils/handleSignIn'; 

function SignIn() {
    const [mensaje, setMensaje] = useState(null);
    const [notification, setNotification] = useState(null);
    const [loading, setLoading] = useState(false);
    const router= useRouter()

    const handleSendData = async (data) => {
        setLoading(true)
        setMensaje(null); 

        try {
            const result = await handleSignIn(data); 

            if (result.data?.token && result.data?.user?._id) {
                setNotification({ type: "success", message: result.message });
                setTimeout(() => {
                    router.push("/user");
                }, 2000);

            } else if (result.errors && Array.isArray(result.errors)) {
                const errorMessages = result.errors.map((error) => error.msg).join(", ");
                setMensaje({ text: errorMessages, type: "error" });
            } else {
                setMensaje({ text: "Ocurrió un error desconocido", type: "error" });
            }
        } catch (error) {
            setMensaje({ text: error.message || "Error en la conexión", type: "error" });
        } finally{
            setLoading(false)
        }
    };

    return (
        <>
            <FormularioSignIn sendData={handleSendData} />
            {notification && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification(null)}
                />)}
            {loading ? <p>Cargando...</p>:mensaje && <Mensaje mensaje={mensaje} />}
        </>
    );
}

export default SignIn;
