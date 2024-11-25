'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import FormularioLogIn from '@/components/formularios/FormularioLogIn';
import Mensaje from '@/components/Mensaje';
import handleLogin from '@/components/users/utils/handleLogIn';

function LogIn() {
    const [mensaje, setMensaje] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSendData = async (data) => {
        setLoading(true);
        setMensaje(null);

        try {
            const result = await handleLogin(data);

            if (result.data?.token) {
                setMensaje({ text: result.message, type: 'exito' });    
                
                if (result.data.user?.role === 'admin') {
                    router.push('/admin');
                } else if (result.data.user?.role === 'user') {
                    router.push('/user');
                } else if (result.data.biz?.role === 'biz'){
                    router.push('/biz');
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
            {loading ? <p>Cargando...</p> : <Mensaje mensaje={mensaje} />}
        </div>
    );
}

export default LogIn;
