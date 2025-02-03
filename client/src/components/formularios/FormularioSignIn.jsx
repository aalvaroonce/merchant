import { useForm, useFieldArray } from "react-hook-form";
import { useState } from "react";

export default function FormularioSignIn({ sendData }) {
    const { register, handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            age: 0,
            city: '',
            hobbies: [],
            openToOffers: false,
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "hobbies",
    });

    const onSubmit = (data) => {
        if (data.password !== data.confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }
        sendData(data);
    };

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
            <div className="w-full max-w-lg bg-gray-800 p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold text-center text-gray-100 mb-6">Registro de Usuario</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-200 relative">
                            Nombre
                            <span className="text-orange-500 absolute top-0">*</span>
                        </label>
                        <input
                            {...register('name', {
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
                        {errors.name && <p className="text-sm text-orange-400 mt-2">{errors.name.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-200 relative">
                            Email
                            <span className="text-orange-500 absolute top-0">*</span>
                        </label>
                        <input
                            {...register('email', {
                                required: "El correo electrónico es requerido",
                                pattern: {
                                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                    message: "Debe ingresar un correo electrónico válido",
                                },
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

                    <div>
                        <label className="block text-sm font-medium text-gray-200 relative">
                            Confirmar Contraseña
                            <span className="text-orange-500 absolute top-0">*</span>
                        </label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                {...register('confirmPassword', { required: "Debe confirmar la contraseña" })}
                                className="mt-1 w-full px-4 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-400"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute inset-y-0 right-3 flex items-center"
                            >
                                <img
                                    src={showConfirmPassword ? "/icons/invisible.png" : "/icons/ojo.png"}
                                    alt={showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                                    className="w-5 h-5 text-gray-400 hover:text-gray-200"
                                />
                            </button>
                        </div>
                        {errors.confirmPassword && <p className="text-sm text-orange-400 mt-2">{errors.confirmPassword.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-200 relative">
                            Edad
                            <span className="text-orange-500 absolute top-0">*</span>
                        </label>
                        <input
                            type="number"
                            {...register('age', {
                                required: "La edad es requerida",
                                min: {
                                    value: 0,
                                    message: "Introduzca una edad mayor de 0 años",
                                },
                                max: {
                                    value: 120,
                                    message: "Introduzca una edad real"
                                }
                            })}
                            className="mt-1 w-full px-4 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-400"
                        />
                        {errors.age && <p className="text-sm text-orange-400 mt-2">{errors.age.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-200 relative">
                            Ciudad
                            <span className="text-orange-500 absolute top-0">*</span>
                        </label>
                        <input
                            {...register('city', {
                                required: "La ciudad es requerida",
                                minLength: {
                                    value: 2,
                                    message: "La ciudad debe tener al menos 2 caracteres",
                                },
                            })}
                            className="mt-1 w-full px-4 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-400"
                        />
                        {errors.city && <p className="text-sm text-orange-400 mt-2">{errors.city.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-200 relative">
                            Hobbies
                        </label>
                        {fields.map((item, index) => (
                            <div key={item.id} className="flex space-x-2 mt-2">
                                <input
                                    {...register(`hobbies.${index}`, {
                                        required: "El hobby no puede estar vacío",
                                    })}
                                    placeholder="Ingrese un hobby"
                                    className="flex-grow px-4 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-400"
                                />
                                <button type="button" onClick={() => remove(index)} className="text-orange-500">Eliminar</button>
                            </div>
                        ))}
                        <button type="button" onClick={() => append("")} className="mt-2 text-orange-400 hover:text-orange-500">
                            Añadir hobby
                        </button>
                        {errors.hobbies && <p className="text-sm text-orange-400 mt-2">{errors.hobbies.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-200">
                            ¿Desea recibir notificaciones de posibles comercios?
                        </label>
                        <input
                            type="checkbox"
                            {...register('openToOffers')}
                            className="mt-2 h-5 w-5 text-orange-400"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 bg-orange-500 text-gray-100 font-semibold rounded-lg hover:bg-orange-600 focus:ring-4 focus:ring-orange-400"
                    >
                        Enviar
                    </button>
                </form>
            </div>
        </div>
    );
}
