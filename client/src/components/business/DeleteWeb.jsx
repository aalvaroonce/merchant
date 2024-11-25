'use client';

import { useState } from 'react';
import Mensaje from '../Mensaje';
import deleteBiz from './utils/handleDeleteBiz';
import { cookies } from 'next/headers';

export default function DeleteBiz() {
    const [mensaje, setMensaje] = useState(null);

    const handleClick = async () => {

        const cookiesStore= cookies();
        const token = cookiesStore.get(token)
        const biz = cookiesStore.get(biz)
        const bizCIF= biz.CIF

        if (!bizCIF || !token) {
            setMensaje({ text: "Faltan credenciales para eliminar el comercio.", type: "error" });
            return;
        }

        try {
            const result = await deleteWeb(bizCIF, token); 
            setMensaje({ text: result.message || "Comercio eliminado con éxito.", type: "exito" });
        } catch (error) {
            setMensaje({ text: error.message || "Error al borrar el comercio.", type: "error" });
        }
    };

    return (
        <>
            <button onClick={handleClick}>Pulsa para borrar</button>
            {mensaje && <Mensaje mensaje={mensaje} />}
        </>
    );
}
