'use client';

import { useState } from 'react';
import FormularioLogIn from '../formularios/FormularioLogIn';
import Mensaje from '../Mensaje';
import handleLogin from './utils/handleLogIn'; 
import { cookies } from 'next/headers';

function LogIn() {
    const [mensaje, setMensaje] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSendData = async (data) => {
        setLoading(true);
        setMensaje(null);

        try {
            const result = await handleLogin(data);

            if (result.data?.token) {
                localStorage.setItem('token', result.data.token);
                localStorage.setItem('user', JSON.stringify(result.data.user));
                cookies.set({
                    name: 'token',
                    value: result.data.token,
                    path: '/'
                })
                cookies.set({
                    name: 'user',
                    value: result.data.user,
                    path: '/'
                })
                setMensaje({ text: result.message, type: "exito" });
            } else if (result.errors && Array.isArray(result.errors)) {
                const errorMessages = result.errors.map((error) => error.msg).join(", ");
                setMensaje({ text: errorMessages, type: "error" });
            } else {
                setMensaje({ text: "Ocurrió un error desconocido", type: "error" });
            }
        } catch (error) {
            setMensaje({ text: error.message || "Error en la conexión", type: "error" });
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
