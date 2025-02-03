import { useState } from "react";
import { useForm } from "react-hook-form";

export default function ChangePasswordModal({ onClose, onSubmit }) {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [showPassword, setShowPassword] = useState(false);
    const [showLastPassword, setShowLastPassword] = useState(false);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-gray-100 rounded-lg p-6 w-full max-w-md shadow-lg">
                <h3 className="text-lg font-semibold mb-4">Cambiar Contraseña</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                        <label className="block text-sm font-medium text-gray-200 relative">
                            Contraseña
                            <span className="text-orange-500 absolute top-0">*</span>
                        </label>
                        <div className="relative">
                            <input
                                type={showLastPassword ? "text" : "password"}
                                {...register('currentPassword', {
                                    required: "La contraseña es requerida",
                                    minLength: {
                                        value: 6,
                                        message: "La contraseña debe tener al menos 6 caracteres",
                                    },
                                    pattern: {
                                        value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).*$/,
                                        message: "La contraseña debe tener mínimo una mayúscula, una minúscula, un número y un carácter especial"
                                    }
                                })}
                                className="mt-1 w-full px-4 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-400"
                            />
                            <button
                                type="button"
                                onClick={() => setShowLastPassword(!showLastPassword)}
                                className="absolute inset-y-0 right-3 flex items-center"
                            >
                                <img
                                    src={showLastPassword ? "/icons/invisible.png" : "/icons/ojo.png"}
                                    alt={showLastPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                                    className="w-5 h-5 text-gray-400 hover:text-gray-200"
                                />
                            </button>
                        </div>
                        {errors.currentPassword && <p className="text-sm text-orange-400 mt-2">{errors.currentPassword.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-200 relative">
                            Nueva Contraseña
                            <span className="text-orange-500 absolute top-0">*</span>
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                {...register('newPassword', {
                                    required: "La contraseña es requerida",
                                    minLength: {
                                        value: 6,
                                        message: "La contraseña debe tener al menos 6 caracteres",
                                    },
                                    pattern: {
                                        value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).*$/,
                                        message: "La contraseña debe tener mínimo una mayúscula, una minúscula, un número y un carácter especial"
                                    }
                                })}
                                className="mt-1 w-full px-4 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-400"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-3 flex items-center"
                            >
                                <img
                                    src={showPassword ? "/icons/invisible.png" : "/icons/ojo.png"}
                                    alt={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                                    className="w-5 h-5 text-gray-400 hover:text-gray-200"
                                />
                            </button>
                        </div>
                        {errors.newPassword && <p className="text-sm text-orange-400 mt-2">{errors.newPassword.message}</p>}
                    </div>



                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                            onClick={onClose}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                            onClick={onClose}
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
