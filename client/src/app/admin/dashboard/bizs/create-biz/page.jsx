'use client';

import { useState } from 'react';
import FormularioBiz from '@/components/formularios/FormularioBiz';
import Mensaje from '@/components/Mensaje';
import createBiz from '@/components/admin/utils/handleCreateBiz'; 
import Notification from '@/components/Notification';
import { useRouter } from 'next/navigation';

function CreateBiz() {
    const [notification, setNotification] = useState(null);
    const [mensaje, setMensaje] = useState(null)
    const router= useRouter()

    const handleSendData = async (data) => {
        setMensaje(null); 

        try {
            const result = await createBiz(data); 

            if (result.data ) {
                setNotification({ type: "success", message: result.message });
                setTimeout(() => {
                    router.push("/admin/dashboard");
                }, 2000);
            } else if (result.errors && Array.isArray(result.errors)) {
                const errorMessages = result.errors.map((error) => error.msg).join(", ");
                setMensaje({ text: errorMessages, type: "error" });
            } else {
                setMensaje({ text: "Ocurrió un error desconocido", type: "error" });
            }
        } catch (error) {
            setMensaje({ text: error.message || "Error en la conexión", type: "error" });
        }
    };

    return (
        <>
            <FormularioBiz sendData={handleSendData} />
            {notification && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification(null)}
                />)}
            {mensaje && <Mensaje mensaje={mensaje} />}
        </>
    );
}

export default CreateBiz;
