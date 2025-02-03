'use client';

import { useState, useEffect } from "react";
import WebReview from "./WebReview";
import getWebDetails from './utils/handleWebDetails';
import handleAuth from "./utils/checkUserExists";

function WebDetails({ cif, onClose, sendData }) {
    const [web, setWeb] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [showReviews, setShowReviews] = useState(false); // Nuevo estado para mostrar reseñas

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const authStatus = await handleAuth();
                setIsAuthenticated(authStatus);
            } catch (err) {
                console.error("Error verificando autenticación:", err);
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
        <>
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 z-40 ${
                    showReviewForm ? "block" : "hidden"
                }`}
                onClick={() => setShowReviewForm(false)}
            ></div>
            <div className="bg-gray-900 p-6 text-white rounded-lg shadow-md max-w-4xl mx-auto relative z-50">
                <button
                    className="absolute top-2 right-2 text-gray-400 hover:text-white transition"
                    onClick={onClose}
                >
                    ×
                </button>
                <h1 className="text-3xl font-bold text-blue-400 mb-4">{web.heading}</h1>
                <p className="text-gray-400 text-lg mb-2">Ciudad: {web.city}</p>
                <p className="text-gray-400 text-lg mb-2">Actividad: {web.activity}</p>
                <p className="text-gray-300 text-md mb-4">{web.summary}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {web.textArray.map((text, idx) => (
                        <div
                            key={idx}
                            className="bg-gray-800 p-4 rounded-lg shadow-md hover:bg-gray-700 transition"
                        >
                            <p className="text-gray-200">{text}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {web.imageArray.map((imgUrl, idx) => (
                        <img
                            key={idx}
                            className="rounded-lg shadow-md"
                            src={imgUrl}
                            alt={`Imagen ${idx + 1}`}
                        />
                    ))}
                </div>

                <div className="mt-6">
                    <button
                        onClick={() => setShowReviews(!showReviews)}
                        className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg shadow-md transition mr-4"
                    >
                        {showReviews ? "Ocultar Reseñas" : "Ver Reseñas"}
                    </button>
                    {isAuthenticated && (
                        <button
                            onClick={() => setShowReviewForm(!showReviewForm)}
                            className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg shadow-md transition"
                        >
                            {showReviewForm ? "Cerrar Review" : "Escribir una Review"}
                        </button>
                    )}
                </div>

                {!isAuthenticated && (
                    <p className="mt-4 text-gray-500 italic">Inicia sesión para escribir una review.</p>
                )}

                {showReviews && (
                    <div className="mt-6 bg-gray-800 p-4 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold text-yellow-400 mb-4">Reseñas de Usuarios</h2>
                        {web.reviews?.reviewTexts?.length > 0 ? (
                            web.reviews.reviewTexts.map((review, idx) => (
                                <div key={idx} className="mb-4 border-b border-gray-700 pb-4">
                                    <p className="text-lg text-white font-semibold">
                                        {review.username} -{" "}
                                        <span className="text-yellow-400">
                                            {"★".repeat(review.scoring).padEnd(5, "☆")}
                                        </span>
                                    </p>
                                    <p className="text-gray-300">{review.reviewText}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 italic">Aún no hay reseñas.</p>
                        )}
                    </div>
                )}

                {showReviewForm && <WebReview web={web} />}
            </div>
        </>
    );
}

export default WebDetails;
