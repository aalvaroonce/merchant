'use client';

import { useState } from 'react';
import FormularioPut from '@/components/formularios/FormularioUserUpdate.jsx';
import Mensaje from '@/components/Mensaje.jsx';
import handleUpdateBiz from '@/components/business/utils/handleUpdateBiz.js';

export default function UpdateBiz() {
    const [mensaje, setMensaje] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSendData = async (data) => {

        try {
            setLoading(true);
            const result = await handleUpdateBiz(data); 
            setLoading(false);
            setMensaje({ text: result.message || "Comercio actualizado con éxito.", type: "exito" });
        } catch (error) {
            setLoading(false);
            setMensaje({ text: error.message || "Error al actualizar el comercio.", type: "error" });
        }
    };

    return (
        <>
            <FormularioPut sendData={handleSendData} />
            {loading ? <p>Cargando...</p> : <Mensaje mensaje={mensaje} />}
        </>
    );
}
