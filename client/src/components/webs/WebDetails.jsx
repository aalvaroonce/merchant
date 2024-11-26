'use client';

import { useState, useEffect } from "react";
import WebReview from "./WebReview";
import getWebDetails from './utils/handleWebDetails'; 
import handleAuth from "./utils/checkUserExists";

function WebDetails({ cif }) {
    const [web, setWeb] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [authError, setAuthError] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const authStatus = await handleAuth();
                setIsAuthenticated(authStatus);
            } catch (err) {
                console.error("Error verificando autenticación:", err);
                setAuthError("No se pudo verificar tu sesión. Intenta recargar la página.");
            }
        };

        checkAuth();
    }, []);


    useEffect(() => {
        if (!cif) return; 

        const fetchDetails = async () => {
            setLoading(true);
            setError(null);

            try {
                const webData = await getWebDetails(cif); 
                setWeb(webData);
            } catch (err) {
                console.error("Error al cargar los detalles de la web:", err);
                setError("Error al cargar los detalles de la web.");
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [cif]);


    if (loading) {
        return <h2 className="text-xl font-semibold text-center mt-4">Cargando detalles de la web...</h2>;
    }

    if (error) {
        return <h2 className="text-red-500 font-bold text-center mt-4">{error}</h2>;
    }

    if (!web) {
        return <h2 className="text-gray-600 text-center mt-4">No se encontraron detalles para esta web.</h2>;
    }

    return (
        <div className="p-6 bg-white shadow-md rounded-md max-w-3xl mx-auto mt-6">
            <h1 className="text-2xl font-bold text-gray-800">{web.heading}</h1>
            <h3 className="text-lg text-gray-600">{web.city}</h3>
            <h3 className="text-lg text-gray-600">{web.activity}</h3>
            <p className="text-md text-gray-700">{web.summary}</p>
            <div className="mt-4 space-y-2">
                {web.textArray.map((text, index) => (
                    <div key={index} className="p-3 bg-gray-100 rounded-md">
                        <p className="text-gray-800">{text}</p>
                    </div>
                ))}
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4">
                {web.imageArray.map((imageUrl, index) => (
                    <img 
                        key={index} 
                        className="w-full h-auto rounded-md shadow-md" 
                        src={imageUrl} 
                        alt={`Imagen ${index + 1}`} 
                    />
                ))}
            </div>

            {authError && (
                <p className="text-red-600 font-bold mt-4">
                    {authError}
                </p>
            )}

            {isAuthenticated ? (
                <>
                    <button 
                        onClick={() => setShowReviewForm(!showReviewForm)} 
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition mt-6"
                    >
                        {showReviewForm ? "Cerrar Review" : "Escribir una Review"}
                    </button>
                    
                    {showReviewForm && (
                        <div className="mt-4 p-4 bg-gray-100 rounded-md shadow">
                            <WebReview web={web} />
                        </div>
                    )}
                </>
            ) : (
                !authError && (
                    <p className="text-gray-600 italic mt-4">
                        Inicia sesión para escribir una review.
                    </p>
                )
            )}
        </div>
    );
}

export default WebDetails;
