'use client';

import { useState, useEffect } from "react";
import WebReview from "./WebReview";
import getWebDetails from './utils/handleWebDetails'; 

export default function WebDetails({ cif }) {
    const [web, setWeb] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            setLoading(true);
            setError(null);

            try {
                const webData = await getWebDetails(cif); 
                setWeb(webData);
            } catch (err) {
                setError("Error al cargar los detalles de la web.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (cif) fetchDetails();
    }, [cif]);

    if (loading) {
        return <h2 className="loading-message">Cargando detalles de la web...</h2>;
    }

    if (error) {
        return <h2 className="error-message">{error}</h2>;
    }

    if (!web) {
        return <h2 className="no-web-message">Ninguna web seleccionada</h2>;
    }

    return (
        <div className="web-details">
            <h1 className="web-heading">{web.heading}</h1>
            <h3 className="web-city">{web.city}</h3>
            <h3 className="web-activity">{web.activity}</h3>
            <h3 className="web-summary">{web.summary}</h3>
            <div className="lista-container">
                {web.textArray.map((text, index) => (
                    <div key={index} className="lista-item">
                        <p>{text}</p>
                    </div>
                ))}
            </div>
            {web.imageArray.map((imageUrl, index) => (
                <img key={index} className="web-image" src={imageUrl} alt={`Imagen ${index + 1}`} />
            ))}
            <WebReview web={web} />
        </div>
    );
}
