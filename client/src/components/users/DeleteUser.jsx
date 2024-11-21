'use client';

import { useState } from 'react';
import Mensaje from '../Mensaje';
import deleteUser from './utils/handleDeleteUser';
import { cookies } from 'next/headers';

export default function DeleteUser() {
    const [mensaje, setMensaje] = useState(null);

    const handleClick = async () => {
        // const token = localStorage.getItem('token');
        const cookiesStore= cookies();
        const token = cookiesStore.get(token)
        const user = JSON.parse(localStorage.getItem('user'));
        const userId = user?._id;

        if (!userId || !token) {
            setMensaje({ text: "Faltan credenciales para eliminar el usuario.", type: "error" });
            return;
        }

        try {
            const result = await deleteUser(userId, token); 
            setMensaje({ text: result.message || "Usuario eliminado con éxito.", type: "exito" });
        } catch (error) {
            setMensaje({ text: error.message || "Error al borrar el usuario.", type: "error" });
        }
    };

    return (
        <>
            <button onClick={handleClick}>Pulsa para borrar</button>
            {mensaje && <Mensaje mensaje={mensaje} />}
        </>
    );
}
