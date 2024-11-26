'use client';

import { useState } from 'react';
import FormularioUpdateWeb from '@/components/formularios/FormularioUpdateWeb.jsx';
import Mensaje from '@/components/Mensaje.jsx';
import  handleUpdateWeb  from '@/components/business/utils/handleUpdateWeb.js';
import DeleteWeb from '@/components/business/DeleteWeb';

export default function updateWeb() {
    const [mensaje, setMensaje] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSendData = async (data) => {

        try {
            setLoading(true);
            const result = await handleUpdateWeb(data); 
            setLoading(false);
            setMensaje({ text: result.message || "Comercio actualizado con éxito.", type: "exito" });
        } catch (error) {
            setLoading(false); 
            setMensaje({ text: error.message || "Error al actualizar el comercio.", type: "error" });
        }
    };

    return (
        <>
            <FormularioUpdateWeb sendData={handleSendData} />
            {loading ? <p>Cargando...</p> : <Mensaje mensaje={mensaje} />}
            <DeleteWeb/>
        </>
    );
}
