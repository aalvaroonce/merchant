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
        <div className="formulario-container">
            <h3>Actualizar Negocio</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Nombre</label>
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
                    />
                    {errors.name && <p>{errors.name.message}</p>}
                </div>
                <div>
                    <label>Dirección</label>
                    <input {...register("direction", { required: "La dirección es requerida" })} />
                    {errors.direction && <p>{errors.direction.message}</p>}
                </div>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        {...register("email", {
                            required: "El correo electrónico es requerido",
                            pattern: {
                                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                message: "Correo no válido"
                            }
                        })}
                    />
                    {errors.email && <p>{errors.email.message}</p>}
                </div>
                <div>
                    <label>Teléfono</label>
                    <input
                        {...register("phone", {
                            required: "El teléfono es requerido",
                            pattern: {
                                value: /^[0-9]{9}$/,
                                message: "Debe tener 9 dígitos"
                            }
                        })}
                    />
                    {errors.phone && <p>{errors.phone.message}</p>}
                </div>
                <div>
                    <button type="button" onClick={ ()=> setPasswordModalOpen(true)}>
                        Cambiar Contraseña
                    </button>
                </div>
                <input type="submit" value="Guardar Cambios" />
            </form>
            
           {isPasswordModalOpen && <ChangePasswordModal
                onClose={() => setPasswordModalOpen(false)}
                onSubmit={handleChangePassword}
            />}
        </div>
    );
}
