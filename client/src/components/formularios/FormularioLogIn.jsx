import { useState } from "react";
import { useForm } from "react-hook-form";

function FormularioLogIn({ sendData }) {
    const { register, formState: { errors }, handleSubmit } = useForm();

    const onSubmit = (data) => {
        sendData(data);
    }; 

    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
            <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold text-center text-gray-100 mb-6">Inicio de Sesión</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-200 relative">
                            Email 
                            <span className="text-orange-500 absolute top-0 ">*</span>
                        </label>
                        <input 
                            {...register('email', { 
                                required: "El correo electrónico es requerido",
                                pattern: { 
                                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                    message: "Debe ingresar un correo electrónico válido"
                                }
                            })} 
                            className="mt-1 w-full px-4 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-400"
                        />
                        {errors.email && <p className="text-sm text-orange-400 mt-2">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-200 relative">
                            Contraseña
                            <span className="text-orange-500 absolute top-0">*</span>
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                {...register('password', {
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
                        {errors.password && <p className="text-sm text-orange-400 mt-2">{errors.password.message}</p>}
                    </div>

                    <button 
                        type="submit" 
                        className="w-full py-2 bg-orange-500 text-gray-100 font-semibold rounded-lg hover:bg-orange-600 focus:ring-4 focus:ring-orange-400"
                    >
                        Iniciar Sesión
                    </button>
                </form>
            </div>
        </div>
    );
}

export default FormularioLogIn;
