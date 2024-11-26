import { useForm, useFieldArray } from "react-hook-form";
import { useEffect, useState } from "react";
import getUser from "./utils/handleGetUser";

export default function FormularioUpdateUser({ sendData }) {
    const [loading, setLoading] = useState(true);

    const { register, handleSubmit, control, reset, formState: { errors } } = useForm({
        defaultValues: {
            name: "",
            email: "",
            age: "",
            city: "",
            hobbies: [],
            openToOffers: false,
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "hobbies",
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await getUser();
                reset({
                    ...JSON.parse(userData),
                    hobbies: filteredData.hobbies || [],
                });
            } catch (error) {
                console.warn("Error al obtener los datos del usuario:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [reset]);

    const onSubmit = (data) => {
        sendData(data);
    };

    if (loading) {
        return <p>Cargando datos del usuario...</p>;
    }

    return (
        <div className="formulario-container">
            <h3>Editar Usuario</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Nombre</label>
                    <input
                        {...register("name", {
                            required: "El nombre es requerido",
                            minLength: {
                                value: 3,
                                message: "El nombre debe tener al menos 3 caracteres",
                            },
                            maxLength: {
                                value: 20,
                                message: "El nombre debe tener menos de 20 caracteres",
                            },
                        })}
                    />
                    {errors.name && <p>{errors.name.message}</p>}
                </div>

                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        {...register("email", {
                            required: "El correo electrónico es requerido",
                            pattern: {
                                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                message: "Debe ingresar un correo electrónico válido",
                            },
                        })}
                    />
                    {errors.email && <p>{errors.email.message}</p>}
                </div>

                <div>
                    <label>Edad</label>
                    <input
                        type="number"
                        {...register("age", {
                            required: "La edad es requerida",
                            min: {
                                value: 0,
                                message: "Introduzca una edad mayor de 0 años",
                            },
                            max: {
                                value: 120,
                                message: "Introduzca una edad real",
                            },
                        })}
                    />
                    {errors.age && <p>{errors.age.message}</p>}
                </div>

                <div>
                    <label>Ciudad</label>
                    <input
                        {...register("city", {
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
                    <label>Hobbies</label>
                    {fields.map((field, index) => (
                        <div key={field.id} className="hobby-item">
                            <input
                                {...register(`hobbies.${index}`, {
                                    required: "El hobby no puede estar vacío",
                                })}
                                placeholder="Ingrese un hobby"
                            />
                            <button type="button" onClick={() => remove(index)}>Eliminar</button>
                        </div>
                    ))}
                    <button type="button" onClick={() => append("")}>
                        Añadir hobby
                    </button>
                </div>

                <div>
                    <label>¿Desea recibir notificaciones de posibles comercios?</label>
                    <input
                        type="checkbox"
                        {...register("openToOffers")}
                    />
                </div>

                <input type="submit" value="Guardar Cambios" />
            </form>
        </div>
    );
}
