import { useForm } from "react-hook-form";

function FormularioEmail({ sendData, onClose }) {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            subject: "",
            text: ""
        },
    });

    const handleFormSubmit = (data) => {
        sendData(data); 
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2" htmlFor="subject">
                    Asunto
                </label>
                <input
                    id="subject"
                    type="text"
                    {...register("subject", {
                        required: "El asunto es requerido",
                        minLength: {
                            value: 3,
                            message: "El asunto debe tener al menos 3 caracteres",
                        },
                        maxLength: {
                            value: 100,
                            message: "El asunto no puede exceder 100 caracteres",
                        },
                    })}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2" htmlFor="text">
                    Mensaje
                </label>
                <textarea
                    id="text"
                    rows="4"
                    {...register("text", {
                        required: "El mensaje es requerido",
                        minLength: {
                            value: 10,
                            message: "El mensaje debe tener al menos 10 caracteres",
                        },
                    })}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                ></textarea>
                {errors.text && <p className="text-red-500 text-sm mt-1">{errors.text.message}</p>}
            </div>
            <div className="flex justify-end">
                <button
                    type="button"
                    className="mr-4 bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
                    onClick={onClose}
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                    Enviar
                </button>
            </div>
        </form>
    );
}

export default FormularioEmail;
