import ChangePasswordModal from "../ChangePassword";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import getBiz from "./utils/handleGetBiz";

export default function FormularioUpdateBiz({ sendData, handleChangePassword }) {
    const [loading, setLoading] = useState(true);
    const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            name: "",
            direction: "",
            email: "",
            phone: 0
        },
    });

    useEffect(() => {
        const fetchBizData = async () => {
            try {
                const bizData = await getBiz();
                const parsedData = JSON.parse(bizData);
                reset(parsedData);
            } catch (error) {
                console.warn("Error al obtener los datos del negocio:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBizData();
    }, [reset]);

    const onSubmit = (data) => {
        sendData(data);
    };


    if (loading) {
        return <p>Cargando datos del negocio...</p>;
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-gray-100">
            <div className="w-full max-w-2xl bg-gray-800 p-8 rounded-lg shadow-lg">
                <h3 className="text-3xl font-semibold text-center mb-6 text-orange-400">Editar Perfil</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-200 relative">
                            Nombre
                            <span className="text-orange-500 absolute top-0">*</span>    
                        </label>
                        <input
                            {...register("name", {
                                required: "El nombre es requerido",
                                minLength: {
                                    value: 3,
                                    message: "Mínimo 3 caracteres"
                                },
                                maxLength: {
                                    value: 20,
                                    message: "Máximo 20 caracteres"
                                }
                            })}
                            className="mt-1 w-full px-4 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-400"
                        />
                        {errors.name && <p className="text-sm text-orange-400 mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-200 relative">
                            Direccion
                            <span className="text-orange-500 absolute top-0">*</span>
                        </label>
                        <input
                            {...register("direction", {
                                required: "La ciudad es requerida",
                                minLength: {
                                    value: 2,
                                    message: "La ciudad debe tener al menos 2 caracteres",
                                },
                                maxLength: {
                                    value: 30,
                                    message: "La ciudad debe tener menos de 30 caracteres",
                                },
                            })}
                            className="mt-1 w-full px-4 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-400"
                        />
                        {errors.direction && <p className="text-sm text-orange-400 mt-1">{errors.direction.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-200 relative">
                            Email
                            <span className="text-orange-500 absolute top-0">*</span>
                        </label>
                        <input
                            type="email"
                            {...register("email", {
                                required: "El correo electrónico es requerido",
                                pattern: {
                                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                    message: "Correo no válido"
                                }
                            })}
                             className="mt-1 w-full px-4 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-400"
                        />
                        {errors.email && <p className="text-sm text-orange-400 mt-1">{errors.email.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-200 relative">
                            Teléfono
                            <span className="text-orange-500 absolute top-0">*</span>
                        </label>
                        <input
                            {...register("phone", {
                                required: "El teléfono es requerido",
                                pattern: {
                                    value: /^[0-9]{9}$/,
                                    message: "Debe tener 9 dígitos"
                                }
                            })}
                             className="mt-1 w-full px-4 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-400"
                        />
                        {errors.phone && <p className="text-sm text-orange-400 mt-1">{errors.phone.message}</p>}
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

                {isPasswordModalOpen && <ChangePasswordModal
                    onClose={() => setPasswordModalOpen(false)}
                    onSubmit={handleChangePassword}
                />}
            </div>
        </div>
    );
}
