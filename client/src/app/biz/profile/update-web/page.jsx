'use client';

import { Suspense, useState } from 'react';
import FormularioUpdateWeb from '@/components/formularios/FormularioUpdateWeb';
import Notification from '@/components/Notification';
import handleUpdateWeb from '@/components/business/utils/handleUpdateWeb';
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
            console.error("Error en la actualización:", error);
            setNotification({ type: "error", message: "Error en la actualización. Intenta nuevamente." });
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
            console.error("Error en la eliminación:", error);
            setNotification({ type: "error", message: "Error al eliminar. Intenta nuevamente." });
            setIsModalOpen(false);
        }
    };

    return (
        <Suspense fallback={<p className="text-center text-gray-500">Cargando componente...</p>}>
            {notification && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification(null)}
                />
            )}
            <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-xl shadow-lg">
                <FormularioUpdateWeb sendData={handleSendData} />
                    <div className="mt-8">
                    <DeleteWeb onConfirmAction={handleConfirmAction} />
                    </div>
                </div>
        </Suspense>
    );
}
