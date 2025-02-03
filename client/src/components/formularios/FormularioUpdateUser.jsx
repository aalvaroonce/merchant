import ChangePasswordModal from "../ChangePassword";
import { useForm, useFieldArray } from "react-hook-form";
import { useEffect, useState } from "react";
import getUser from "./utils/handleGetUser";

export default function FormularioUpdateUser({ sendData }) {
    const [loading, setLoading] = useState(true);
    const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);

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
                const parsedData = JSON.parse(userData);
                reset({
                    ...parsedData,
                    hobbies: parsedData.hobbies || [],
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
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-lg text-gray-100">Cargando datos del usuario...</p>
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-gray-100">
            <div className="w-full max-w-2xl bg-gray-800 p-8 rounded-lg shadow-lg">
                <h3 className="text-3xl font-semibold text-center mb-6 text-orange-400">Editar Perfil</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                    <div>
                        <label className="block text-sm font-medium">Nombre</label>
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
                            className="mt-1 w-full px-4 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-400"
                        />
                        {errors.name && <p className="text-sm text-orange-400 mt-1">{errors.name.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Email</label>
                        <input
                            type="email"
                            {...register("email", {
                                required: "El correo electrónico es requerido",
                                pattern: {
                                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                    message: "Debe ingresar un correo electrónico válido",
                                },
                            })}
                            className="mt-1 w-full px-4 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-400"
                        />
                        {errors.email && <p className="text-sm text-orange-400 mt-1">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Edad</label>
                        <input
                            type="number"
                            {...register("age", {
                                required: "La edad es requerida",
                                min: { value: 0, message: "Introduzca una edad mayor de 0 años" },
                                max: { value: 120, message: "Introduzca una edad real" },
                            })}
                            className="mt-1 w-full px-4 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-400"
                        />
                        {errors.age && <p className="text-sm text-orange-400 mt-1">{errors.age.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Ciudad</label>
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
                            className="mt-1 w-full px-4 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-400"
                        />
                        {errors.city && <p className="text-sm text-orange-400 mt-1">{errors.city.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Hobbies</label>
                        {fields.map((field, index) => (
                            <div key={field.id} className="flex items-center gap-4 mt-2">
                                <input
                                    {...register(`hobbies.${index}`, {
                                        required: "El hobby no puede estar vacío",
                                    })}
                                    placeholder="Ingrese un hobby"
                                    className="w-full px-4 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-400"
                                />
                                <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="text-orange-400 hover:text-orange-500"
                                >
                                    Eliminar
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => append("")}
                            className="mt-3 text-orange-400 hover:text-orange-500"
                        >
                            Añadir hobby
                        </button>
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            {...register("openToOffers")}
                            className="w-5 h-5 text-orange-400 bg-gray-700 border-gray-600 focus:ring-2 focus:ring-orange-400 rounded"
                        />
                        <label className="text-sm font-medium">¿Desea recibir notificaciones de comercios?</label>
                    </div>

                    <div className="space-y-3">
                    <button
                            type="button"
                            onClick={() => setPasswordModalOpen(true)}
                            className="w-full py-2 bg-gray-700 text-gray-100 font-semibold rounded-lg hover:bg-gray-600 focus:ring-4 focus:ring-gray-400"
                        >
                            Cambiar Contraseña
                        </button>
                        <button
                            type="submit"
                            className="w-full py-2 bg-orange-500 text-gray-100 font-semibold rounded-lg hover:bg-orange-600 focus:ring-4 focus:ring-orange-400"
                        >
                            Guardar Cambios
                        </button>
                    </div>
                </form>

                {isPasswordModalOpen && (
                    <ChangePasswordModal
                        onClose={() => setPasswordModalOpen(false)}
                    />
                )}
            </div>
        </div>
    );
}
