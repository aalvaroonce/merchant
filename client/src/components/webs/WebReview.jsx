'use client';

import { useState } from 'react';
import FormularioReview from '../formularios/FormularioReview.jsx';
import Mensaje from '../Mensaje.jsx';
import addReview from './utils/handleReview.js';

function WebReview({ web }) {

    
    const [mensaje, setMensaje] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSendData = async (data) => {
        setMensaje(null);
        setLoading(true);

        try {
            await addReview(web.businessCIF, data); 
            setMensaje({ text: "Reseña enviada con éxito", type: "exito" });
        } catch (error) {
            setMensaje({ text: error.message, type: "error" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <FormularioReview sendData={handleSendData} web={web} />
            {loading && <p>Enviando reseña...</p>}
            {mensaje && <Mensaje mensaje={mensaje} />}
        </>
    );
}

export default WebReview;
