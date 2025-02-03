import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import getUser from "./utils/handleGetUser";

function FormularioReview({ sendData, web }) {
    const [user, setUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);

    const { register, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getUser();
                const parsedData = JSON.parse(userData) || {};
                setUser(parsedData);
            } catch (error) {
                console.warn("Error al obtener el usuario de las cookies:", error);
                setUser(null);
            } finally {
                setLoadingUser(false);
            }
        };

        fetchUser();
    }, []);

    useEffect(() => {
        if (user) {
            const existingReview = web?.reviews?.reviewTexts?.find(
                (review) => review.userId === user._id
            );

            reset({
                scoring: existingReview?.scoring || 0,
                reviewText: existingReview?.reviewText || "",
            });
        }
    }, [user, web, reset]);

    const scoring = watch("scoring");

    const onSubmit = (data) => {
        sendData(data);
    };

    if (loadingUser) {
        return (
            <div className="bg-gray-900 p-6 rounded-lg shadow-lg text-white max-w-xl mx-auto">
                <h3 className="text-2xl font-bold text-blue-400 mb-4">Cargando...</h3>
            </div>
        );
    }

    return (
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg text-white max-w-xl mx-auto">
            <h3 className="text-2xl font-bold text-blue-400 mb-4">Escribir una Reseña</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                    <label className="block text-lg font-semibold mb-2 text-gray-300">
                        Puntuación:
                    </label>
                    <div className="flex space-x-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                className={`text-3xl cursor-pointer ${
                                    star <= scoring ? "text-yellow-400" : "text-gray-600"
                                }`}
                                onClick={() => setValue("scoring", star)}
                            >
                                ★
                            </span>
                        ))}
                    </div>
                    {errors.scoring && (
                        <p className="text-red-500 text-sm mt-1">{errors.scoring.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-lg font-semibold mb-2 text-gray-300">
                        Reseña:
                    </label>
                    <textarea
                        {...register("reviewText", {
                            required: "El texto de la reseña es obligatorio",
                            minLength: {
                                value: 5,
                                message: "La reseña debe tener al menos 5 caracteres",
                            },
                            maxLength: {
                                value: 500,
                                message: "La reseña no puede superar los 500 caracteres",
                            },
                        })}
                        className="w-full p-3 bg-gray-800 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Escribe tu reseña"
                    />
                    {errors.reviewText && (
                        <p className="text-red-500 text-sm mt-1">{errors.reviewText.message}</p>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full py-2 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-lg shadow-md transition"
                >
                    Enviar Reseña
                </button>
            </form>
        </div>
    );
}

export default FormularioReview;
