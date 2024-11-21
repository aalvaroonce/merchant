'use client';

import { useState } from 'react';
import FormularioPut from '../formularios/FormularioUserUpdate.jsx';
import Mensaje from '../Mensaje.jsx';
import  updateBiz  from './utils/handleUpdateBiz.js';

export default function UpdateBiz() {
    const [mensaje, setMensaje] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSendData = async (data) => {
        const token = localStorage.getItem('token');
        const biz = JSON.parse(localStorage.getItem('biz'));
        const bizCIF = biz?._id;

        if (!bizCIF || !token) {
            setMensaje({ text: "Faltan credenciales para actualizar el comercio.", type: "error" });
            return;
        }

        try {
            setLoading(true);
            const result = await updateBiz(bizCIF, token, data); 
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
