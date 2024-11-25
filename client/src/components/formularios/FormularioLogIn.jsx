import { useForm } from "react-hook-form";

function FormularioLogIn({ sendData }) {
    const { register, formState: { errors }, handleSubmit } = useForm();

    const onSubmit = (data) => {
        sendData(data);
    };

    return (
        <div className="formulario-container">
            <h3>Inicio de Sesión</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Email</label>
                    <input 
                        {...register('email', { 
                            required: "El correo electrónico es requerido",
                            pattern: { 
                                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                message: "Debe ingresar un correo electrónico válido"
                            }
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
                                message: "La contraseña debe tener al menos 6 caracteres"
                            },
                            pattern: {
                                value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).*$/,
                                message: "La contraseña debe tener mínimo una mayúscula, una minúscula, un numero y un carácter especial"
                            }
                        })} 
                    />
                    {errors.password && <p>{errors.password.message}</p>}
                </div>

                <input type="submit" value="Enviar" />
            </form>
        </div>
    );
}


export default FormularioLogIn
