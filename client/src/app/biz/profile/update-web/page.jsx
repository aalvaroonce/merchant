'use client';

import { Suspense, useState } from 'react';
import FormularioUpdateWeb from '@/components/formularios/FormularioUpdateWeb.jsx';
import Notification from '@/components/Notification';
import handleUpdateWeb from '@/components/business/utils/handleUpdateWeb.js';
import DeleteWeb from '@/components/business/DeleteWeb';
import { useRouter } from 'next/navigation';
import deleteWeb from '@/components/business/utils/handleDeleteWeb';

export default function UpdateWeb() {
    const [notification, setNotification] = useState(null);
    const router = useRouter();

    const handleSendData = async (data) => {
        try {
            await handleUpdateWeb(data);
            setNotification({ type: "success", message: "Actualización exitosa." });
            setTimeout(() => {
                router.push("/biz/profile");
            }, 2000);
        } catch (error) {
            console.log(error)
            setNotification({ message: "Ha ocurrido un error en la actualización." });
            setTimeout(() => {
                router.push("/biz/profile");
            }, 2000);
        }
    };

    const handleConfirmAction = async (action, setMensaje, setIsModalOpen) => {
        try {
            const result = await deleteWeb(action);
            setNotification({ type: "success", message: result.message });
            setIsModalOpen(false);
            setTimeout(() => {
                router.push("/biz/profile");
            }, 2000);
        } catch (error) {
            setMensaje({ text: error.message, type: "error" });
            setIsModalOpen(false);
            setTimeout(() => {
                router.push("/biz/profile");
            }, 2000);
        }
    };


    return (
        <Suspense fallback={<p>Cargando componente...</p>}>
            {notification && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification(null)}
                />)}
            <FormularioUpdateWeb sendData={handleSendData} />
            <DeleteWeb onConfirmAction={handleConfirmAction}/>
        </Suspense>
    );
}
