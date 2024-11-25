import { useForm, useFieldArray } from "react-hook-form";

export default function FormularioSignIn({ sendData }) {
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

    return (
        <div className="formulario-container">
            <h3>Registro de Usuario</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Nombre</label>
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
                    />
                    {errors.name && <p>{errors.name.message}</p>}
                </div>

                <div>
                    <label>Email</label>
                    <input
                        {...register('email', {
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
                    <label>Contraseña</label>
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
                                message: "La contraseña debe tener mínimo una mayúscula, una minúscula, un numero y un carácter especial"
                            }
                        })}
                    />
                    {errors.password && <p>{errors.password.message}</p>}
                </div>

                <div>
                    <label>Confirmar Contraseña</label>
                    <input
                        type="password"
                        {...register('confirmPassword', {
                            required: "Debe confirmar la contraseña",
                        })}
                    />
                    {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
                </div>

                <div>
                    <label>Edad</label>
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
                    />
                    {errors.age && <p>{errors.age.message}</p>}
                </div>

                <div>
                    <label>Ciudad</label>
                    <input
                        {...register('city', {
                            required: "La ciudad es requerida",
                            minLength: {
                                value: 2,
                                message: "La ciudad debe tener al menos 2 caracteres",
                            },
                        })}
                    />
                    {errors.city && <p>{errors.city.message}</p>}
                </div>

                <div>
                    <label>Hobbies</label>
                    {fields.map((item, index) => (
                        <div key={item.id} className="hobby-item">
                            <input
                                {...register(`hobbies.${index}`, {
                                    required: "El hobby no puede estar vacío",
                                })}
                                placeholder="Ingrese un hobby"
                            />
                            <button type="button" onClick={() => remove(index)}>
                                Eliminar
                            </button>
                        </div>
                    ))}
                    <button type="button" onClick={() => append("")}>
                        Añadir hobby
                    </button>
                </div>
                {errors.hobbies && <p>{errors.hobbies.message}</p>}

                <div>
                    <label>¿Desea recibir notificaciones de posibles comercios?</label>
                    <input
                        type="checkbox"
                        {...register('openToOffers')}
                    />
                </div>

                <input type="submit" value="Enviar" />
            </form>
        </div>
    );
}
