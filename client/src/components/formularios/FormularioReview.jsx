import { useForm } from "react-hook-form";

const getUserDataFromLocalStorage = () => {
    const userData = localStorage.getItem('user');
    try {
        const parsedData = JSON.parse(userData) || {};
        return parsedData;
    } catch (error) {
        console.warn("Error al parsear los datos del localStorage:", error);
        return {};
    }
};

function FormularioReview({ sendData, web }) {
    const user = getUserDataFromLocalStorage();

    const existingReview = web?.reviews?.reviewTexts?.find(
        (review) => review.userId === user._id
    );

    const defaultValues = {
        scoring: existingReview?.scoring || 0,
        reviewText: existingReview?.reviewText || "",
    };

    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
        defaultValues,
    });

    const scoring = watch("scoring");

    const onSubmit = (data) => {
        sendData(data);
    };

    return (
        <div className="formulario-container">
            <h3>Reseña</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Puntuación:</label>
                    <div className="star-rating">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                className={`star ${star <= scoring ? "filled" : ""}`}
                                onClick={() => setValue("scoring", star)}
                            >
                                ★
                            </span>
                        ))}
                    </div>
                    {errors.scoring && <p>{errors.scoring.message}</p>}
                </div>

                <div>
                    <label>Reseña:</label>
                    <textarea
                        {...register("reviewText", {
                            required: "El texto de la reseña es obligatorio",
                            minLength: {
                                value: 10,
                                message: "La reseña debe tener al menos 10 caracteres",
                            },
                            maxLength: {
                                value: 500,
                                message: "La reseña no puede superar los 500 caracteres",
                            },
                        })}
                        placeholder="Escribe tu reseña"
                    />
                    {errors.reviewText && <p>{errors.reviewText.message}</p>}
                </div>

                <button type="submit">Enviar Reseña</button>
            </form>
        </div>
    );
}

export default FormularioReview;
