import { useForm } from "react-hook-form";
import capitalize from "./utils/capitalize";

function FormularioWeb({ sendData }) {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            city: "",
            activity: "",
            heading: "",
            summary: ""
        },
    });

    const onSubmit = (data) => {
        const capitalizedActivity = capitalize(data.activity);
        const capitalizedCity = capitalize(data.city)
        sendData({ ...data, activity: capitalizedActivity, city: capitalizedCity });
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-gray-100">
            <div className="w-full max-w-2xl bg-gray-800 p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-semibold text-center mb-6 text-orange-400">Registro de Web</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    
                    <div className="form-group">
                        <label className="block text-sm font-medium">Ciudad</label>
                        <input
                            {...register('city', {
                                required: "La ciudad es requerida",
                                minLength: {
                                    value: 2,
                                    message: "La ciudad debe tener al menos 2 caracteres",
                                },
                                maxLength: {
                                    value: 20,
                                    message: "La ciudad debe tener menos de 20 caracteres",
                                },
                            })}
                            className="mt-1 w-full px-4 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-400"
                        />
                        {errors.city && <span className="text-sm text-orange-400 mt-1">{errors.city.message}</span>}
                    </div>
    
                    <div className="form-group">
                        <label className="block text-sm font-medium">Actividad</label>
                        <input
                            {...register('activity', {
                                required: "La actividad es requerida",
                                minLength: {
                                    value: 2,
                                    message: "La actividad debe tener al menos 2 caracteres",
                                },
                                maxLength: {
                                    value: 20,
                                    message: "La actividad debe tener menos de 20 caracteres",
                                },
                            })}
                            className="mt-1 w-full px-4 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-400"
                        />
                        {errors.activity && <span className="text-sm text-orange-400 mt-1">{errors.activity.message}</span>}
                    </div>
    
                    <div className="form-group">
                        <label className="block text-sm font-medium">Encabezado</label>
                        <input
                            {...register('heading', {
                                required: "El encabezado es requerido",
                                minLength: {
                                    value: 5,
                                    message: "El encabezado debe tener al menos 5 caracteres",
                                },
                                maxLength: {
                                    value: 50,
                                    message: "El encabezado debe tener menos de 50 caracteres",
                                },
                            })}
                            className="mt-1 w-full px-4 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-400"
                        />
                        {errors.heading && <span className="text-sm text-orange-400 mt-1">{errors.heading.message}</span>}
                    </div>
    
                    <div className="form-group">
                        <label className="block text-sm font-medium">Resumen</label>
                        <textarea
                            {...register('summary', {
                                required: "El resumen es requerido",
                                minLength: {
                                    value: 10,
                                    message: "El resumen debe tener al menos 10 caracteres",
                                },
                                maxLength: {
                                    value: 200,
                                    message: "El resumen debe tener menos de 200 caracteres",
                                },
                            })}
                            className="mt-1 w-full px-4 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-400"
                        ></textarea>
                        {errors.summary && <span className="text-sm text-orange-400 mt-1">{errors.summary.message}</span>}
                    </div>
    
                    <div className="text-center">
                        <button 
                            type="submit" 
                            className="w-full py-2 bg-orange-500 text-gray-100 font-semibold rounded-lg hover:bg-orange-600 focus:ring-4 focus:ring-orange-400"
                        >
                            Registrar Web
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
    
}

export default FormularioWeb
