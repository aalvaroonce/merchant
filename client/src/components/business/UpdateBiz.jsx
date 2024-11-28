'use client';

import { useState } from 'react';
import FromularioUpdateBiz from '@/components/formularios/FormularioUpdateBiz';
import Notification from '@/components/Notification.jsx';
import handleUpdateBiz from '@/components/business/utils/handleUpdateBiz.js';

export default function UpdateBiz() {
    const [notification, setNotification] = useState(null);

    const handleSendData = async (data) => {

        try {
            const result = await handleUpdateBiz(data); 
            setNotification({ message: result.message || "Comercio actualizado con éxito.", type: "succes" });
        } catch (error) {
            setNotification({ message: error.message || "Error al actualizar el comercio."});
        }
    };

    return (
        <>
        <Suspense fallback={<p>Cargando componente...</p>}>
            {notification && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification(null)}
                />)}
            <FromularioUpdateBiz sendData={handleSendData} />
            <DeleteWeb />
        </Suspense>
        </>
    );
}
