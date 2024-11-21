'use client';

import { useState } from 'react';
import FormularioPut from '../formularios/FormularioUserUpdate.jsx';
import Mensaje from '../Mensaje.jsx';
import updateUser from './utils/handleUpdateUser.js';

export default function UpdateUser() {
    const [mensaje, setMensaje] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSendData = async (data) => {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user'));
        const userId = user?._id;

        if (!userId || !token) {
            setMensaje({ text: "Faltan credenciales para actualizar el usuario.", type: "error" });
            return;
        }

        try {
            setLoading(true);
            const result = await updateUser(userId, token, data); // Llama a la acción del servidor
            setLoading(false);
            setMensaje({ text: result.message || "Usuario actualizado con éxito.", type: "exito" });
        } catch (error) {
            setLoading(false);
            setMensaje({ text: error.message || "Error al actualizar el usuario.", type: "error" });
        }
    };

    return (
        <>
            <FormularioPut sendData={handleSendData} />
            {loading ? <p>Cargando...</p> : <Mensaje mensaje={mensaje} />}
        </>
    );
}
