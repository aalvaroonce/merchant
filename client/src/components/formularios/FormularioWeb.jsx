import { useForm } from "react-hook-form";

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
        sendData(data);
    };

    return (
        <div className="formulario-container">
            <h3>Registro de Negocio</h3>
            <form onSubmit={handleSubmit(onSubmit)}>

                <div>
                    <label>Ciudad</label>
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
                    />
                    {errors.city && <p>{errors.city.message}</p>}
                </div>

                <div>
                    <label>Actividad</label>
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
                    />
                    {errors.activity && <p>{errors.activity.message}</p>}
                </div>

                <div>
                    <label>Encabezado</label>
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
                    />
                    {errors.heading && <p>{errors.heading.message}</p>}
                </div>

                <div>
                    <label>Resumen</label>
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
                    ></textarea>
                    {errors.summary && <p>{errors.summary.message}</p>}
                </div>

                <input type="submit" value="Registrar Negocio" />
            </form>
        </div>
    );
}

export default FormularioWeb
