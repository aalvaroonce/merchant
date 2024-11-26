'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import FormularioLogIn from '../formularios/FormularioLogIn';
import Mensaje from '../Mensaje';
import handleLogin from './utils/handleLogIn';
import { cookies } from 'next/headers';

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
                cookies.set({
                    name: 'token',
                    value: result.data.token,
                    path: '/'
                });

                if (result.data?.user) {
                    if (result.data.user.role === 'admin') {
                        cookies.set({
                            name: 'admin',
                            value: result.data.user,
                            path: '/'
                        });
                        router.push('/menu-admin');
                    } else if (result.data.user.role === 'user') {
                        cookies.set({
                            name: 'user',
                            value: result.data.user,
                            path: '/'
                        });
                        router.push('/menu-user');
                    }
                } else if (result.data?.biz) {
                    cookies.set({
                        name: 'biz',
                        value: result.data.biz,
                        path: '/'
                    });

                    router.push('/menu-biz');
                }

                setMensaje({ text: result.message, type: 'exito' });
            } else if (result.errors && Array.isArray(result.errors)) {
                console.log(result.errors)
                setMensaje({ text: 'Ocurrió un error en el inicio de sesion', type: 'error' });
            } else {
                setMensaje({ text: 'Ocurrió un error desconocido', type: 'error' });
            }
        } catch (error) {
            console.log(error)
            setMensaje({ text: 'Error en la conexión', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {logoutMessage && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <p className="text-lg font-bold text-gray-800">{logoutMessage}</p>
                    </div>
                </div>
            )}
            <div className="app-container">
                <FormularioLogIn sendData={handleSendData} />
                {loading ? <p>Cargando...</p> : <Mensaje mensaje={mensaje} />}
            </div>
        </>
    );
}

export default LogIn;
