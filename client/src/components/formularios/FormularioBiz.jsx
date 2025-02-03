import { useForm } from "react-hook-form";

export default function FormularioBiz({ sendData }) {
    const { register, handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {
            name: '',
            CIF: '',
            direction: '',
            email: '',
            phone: 0,
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = (data) => {
        if (data.password !== data.confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }
        sendData(data);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-gray-100">
            <div className="w-full max-w-2xl bg-gray-800 p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-semibold text-center mb-6 text-orange-400">Registro de Comercio</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    
                    <div className="form-group">
                        <label className="block text-sm font-medium">Nombre</label>
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
                        {errors.name && <span className="text-sm text-orange-400 mt-1">{errors.name.message}</span>}
                    </div>
    
                    <div className="form-group">
                        <label className="block text-sm font-medium">CIF</label>
                        <input
                            {...register('CIF', {
                                required: "El CIF es requerido",
                                pattern: {
                                    value: /^[A-Z0-9]{9}$/,
                                    message: "Debe ingresar un CIF válido",
                                },
                            })}
                            className="mt-1 w-full px-4 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-400"
                        />
                        {errors.CIF && <span className="text-sm text-orange-400 mt-1">{errors.CIF.message}</span>}
                    </div>
    
                    <div className="form-group">
                        <label className="block text-sm font-medium">Dirección</label>
                        <input
                            {...register('direction', {
                                required: "La dirección es requerida",
                            })}
                            className="mt-1 w-full px-4 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-400"
                        />
                        {errors.direction && <span className="text-sm text-orange-400 mt-1">{errors.direction.message}</span>}
                    </div>
    
                    <div className="form-group">
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
                        {errors.email && <span className="text-sm text-orange-400 mt-1">{errors.email.message}</span>}
                    </div>
    
                    <div className="form-group">
                        <label className="block text-sm font-medium">Teléfono</label>
                        <input
                            {...register('phone', {
                                required: "El teléfono es requerido",
                                pattern: {
                                    value: /^[0-9]{9}$/,
                                    message: "Debe ingresar un teléfono válido",
                                },
                            })}
                            className="mt-1 w-full px-4 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-400"
                        />
                        {errors.phone && <span className="text-sm text-orange-400 mt-1">{errors.phone.message}</span>}
                    </div>
    
                    <div className="form-group">
                        <label className="block text-sm font-medium">Contraseña</label>
                        <input
                            type="password"
                            {...register('password', {
                                required: "La contraseña es requerida",
                                minLength: {
                                    value: 6,
                                    message: "La contraseña debe tener al menos 6 caracteres",
                                },
                                pattern: {
                                    value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).*$/,
                                    message: "La contraseña debe tener mínimo una mayúscula, una minúscula, un número y un carácter especial",
                                }
                            })}
                            className="mt-1 w-full px-4 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-400"
                        />
                        {errors.password && <span className="text-sm text-orange-400 mt-1">{errors.password.message}</span>}
                    </div>
    
                    <div className="form-group">
                        <label className="block text-sm font-medium">Confirmar Contraseña</label>
                        <input
                            type="password"
                            {...register('confirmPassword', {
                                required: "Debe confirmar la contraseña",
                            })}
                            className="mt-1 w-full px-4 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-400"
                        />
                        {errors.confirmPassword && <span className="text-sm text-orange-400 mt-1">{errors.confirmPassword.message}</span>}
                    </div>
    
                    <div className="text-center">
                        <button
                            type="submit"
                            className="w-full py-2 bg-orange-500 text-gray-100 font-semibold rounded-lg hover:bg-orange-600 focus:ring-4 focus:ring-orange-400"
                        >
                            Enviar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
    
}
