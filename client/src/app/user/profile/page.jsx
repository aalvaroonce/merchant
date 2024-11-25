'use client';

import { useState } from 'react';
import FormularioUpdateUser from '@/components/formularios/FormularioUserUpdate.jsx';
import Mensaje from '@/components/Mensaje.jsx';
import updateUser from '@/components/users/utils/handleUpdateUser.js';
import DeleteUser from '@/components/users/DeleteUser';

export default function UpdateUser() {
    const [mensaje, setMensaje] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSendData = async (data) => {

        try {
            setLoading(true);
            const result = await updateUser(data); 
            setLoading(false);
            setMensaje({ text: result.message || "Usuario actualizado con éxito.", type: "exito" });
        } catch (error) {
            setLoading(false);
            setMensaje({ text: error.message || "Error al actualizar el usuario.", type: "error" });
        }
    };

    return (
        <>
            <FormularioUpdateUser sendData={handleSendData} />
            <DeleteUser/>
            {loading ? <p>Cargando...</p> : <Mensaje mensaje={mensaje} />}
        </>
    );
}
