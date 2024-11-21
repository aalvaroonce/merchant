'use client';

import { useState } from 'react';
import FormularioCreateBiz from '../formularios/FormularioCreateBiz';
import Mensaje from '../Mensaje';
import createBiz from './utils/handleCreateBiz'; 

function CreateBiz() {
    const [mensaje, setMensaje] = useState(null);

    const handleSendData = async (data) => {
        setMensaje(null); 

        try {
            const result = await createBiz(data); 

            if (result.data?.token && result.data?.biz?.cif) {
                localStorage.setItem('token', result.data.token);
                localStorage.setItem('bizCIF', result.data.biz.CIF);
                setMensaje({ text: result.message, type: "exito" });
            } else if (result.errors && Array.isArray(result.errors)) {
                const errorMessages = result.errors.map((error) => error.msg).join(", ");
                setMensaje({ text: errorMessages, type: "error" });
            } else {
                setMensaje({ text: "Ocurrió un error desconocido", type: "error" });
            }
        } catch (error) {
            setMensaje({ text: error.message || "Error en la conexión", type: "error" });
        }
    };

    return (
        <>
            <FormularioCreateBiz sendData={handleSendData} />
            {mensaje && <Mensaje mensaje={mensaje} />}
        </>
    );
}

export default CreateBiz;
