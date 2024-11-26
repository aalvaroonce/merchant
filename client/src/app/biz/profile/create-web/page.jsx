'use client';

import { useState } from 'react';
import FormularioWeb from '@/components/formularios/FormularioWeb';
import Mensaje from '@/components/Mensaje';
import handleCreateWeb from '@/components/business/utils/handleCreateWeb'; 

function CreateWeb() {
    const [mensaje, setMensaje] = useState(null);

    const handleSendData = async (data) => {
        setMensaje(null); 

        try {
            const result = await handleCreateWeb(data); 

            if (result.data ) {
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
            <FormularioWeb sendData={handleSendData} />
            {mensaje && <Mensaje mensaje={mensaje} />}
        </>
    );
}

export default CreateWeb;
