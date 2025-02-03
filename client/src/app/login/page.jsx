'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import FormularioLogIn from '@/components/formularios/FormularioLogIn';
import Notification from '@/components/Notification';
import Mensaje from '@/components/Mensaje';
import handleLogin from '@/components/users/utils/handleLogIn';

function LogIn() {
    const [notification, setNotification] = useState(null);
    const [mensaje, setMensaje] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSendData = async (data) => {
        setLoading(true);
        setMensaje(null);

        try {
            const result = await handleLogin(data);

            if (result.data?.token) {
                setNotification({ type: "success", message: result.message });
                const userRole = result.data.user?.role || result.data.biz?.role;

                const redirectMap = {
                    admin: "/admin",
                    user: "/user",
                    biz: "/biz"
                };

                if (redirectMap[userRole]) {
                    setTimeout(() => {
                        router.push(redirectMap[userRole]);
                    }, 2000);
                }
            } else if (result.errors && Array.isArray(result.errors)) {
                const errorMessages = result.errors.map((error) => error.msg).join(', ');
                setMensaje({ text: errorMessages, type: 'error' });
            } else {
                setMensaje({ text: 'Ocurrió un error desconocido', type: 'error' });
            }
        } catch (error) {
            setMensaje({ text: error.message || 'Error en la conexión', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="app-container">
            <FormularioLogIn sendData={handleSendData} />
            {notification && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification(null)}
                />
            )}
            {loading ? <p className="text-center mt-4">Cargando...</p> : mensaje && <Mensaje mensaje={mensaje} />}
        </div>
    );
}

export default LogIn;
