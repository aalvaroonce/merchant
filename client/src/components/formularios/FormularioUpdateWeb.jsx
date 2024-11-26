import { useForm, useFieldArray } from "react-hook-form";
import { useEffect, useState } from "react";
import getWeb from "./utils/handleGetWeb";
import uploadImage from "./utils/handleUploadImage";

export default function FormularioUpdateWeb({ sendData }) {
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const { register, handleSubmit, control, reset, formState: { errors } } = useForm({
        defaultValues: {
            city: "",
            activity: "",
            heading: "",
            summary: "",
            imageArray: [], 
            textArray: [] 
        },
    });

    const { fields: imageFields, append: appendImage, remove: removeImage } = useFieldArray({
        control,
        name: "imageArray"
    });

    const { fields: textFields, append: appendText, remove: removeText } = useFieldArray({
        control,
        name: "textArray"
    });

    useEffect(() => {
        const fetchBusinessData = async () => {
            try {
                const webData = await getWeb();
                const parsedData= JSON.parse(webData)
                reset({
                    ...parsedData,
                    imageArray: parsedData.imageArray || [],
                    textArray: parsedData.textArray || []
                });
            } catch (error) {
                console.warn("Error al obtener los datos del negocio:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBusinessData();
    }, [reset]);

    const handleImageUpload = async (file) => {
        setUploading(true);
        try {
            const result = await uploadImage(file);
            appendImage(result.imageUrl);
        } catch (error) {
            alert("Error al subir la imagen. Por favor, inténtelo de nuevo.");
        } finally {
            setUploading(false);
        }
    };

    const onSubmit = (data) => {
        sendData(data);
    };

    if (loading) {
        return <p>Cargando datos del negocio...</p>;
    }

    return (
        <div className="formulario-container">
            <h3>Editar Negocio</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Ciudad</label>
                    <input
                        {...register("city", {
                            required: "La ciudad es requerida",
                            minLength: { 
                                value: 2, 
                                message: "Debe tener al menos 2 caracteres" 
                            },
                            maxLength: { value: 20,
                                 message: "Debe tener menos de 20 caracteres" 
                                }
                        })}
                    />
                    {errors.city && <p>{errors.city.message}</p>}
                </div>

                <div>
                    <label>Actividad</label>
                    <input
                        {...register("activity", {
                            required: "La actividad es requerida",
                            minLength: { 
                                value: 2, 
                                message: "Debe tener al menos 2 caracteres" 
                            },
                            maxLength: { 
                                value: 20,
                                message: "Debe tener menos de 20 caracteres" 
                            }
                        })}
                    />
                    {errors.activity && <p>{errors.activity.message}</p>}
                </div>

                <div>
                    <label>Encabezado</label>
                    <input
                        {...register("heading", {
                            required: "El encabezado es requerido",
                            minLength: { 
                                value: 5, 
                                message: "Debe tener al menos 5 caracteres" 
                            },
                            maxLength: { 
                                value: 50, 
                                message: "Debe tener menos de 50 caracteres" 
                            }
                        })}
                    />
                    {errors.heading && <p>{errors.heading.message}</p>}
                </div>

                <div>
                    <label>Resumen</label>
                    <textarea
                        {...register("summary", {
                            required: "El resumen es requerido",
                            minLength: {
                                value: 10, 
                                message: "Debe tener al menos 10 caracteres" 
                                },
                            maxLength: { value: 200, 
                                message: "Debe tener menos de 200 caracteres" 
                            },
                        })}
                    ></textarea>
                    {errors.summary && <p>{errors.summary.message}</p>}
                </div>

                <div>
                    <label>Subir Imágenes</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e.target.files[0])}
                        disabled={uploading}
                    />
                    {uploading && <p>Subiendo imagen...</p>}
                    {imageFields.map((field, index) => (
                        <div key={field.id} className="image-item">
                            <p>{field}</p>
                            <button type="button" onClick={() => removeImage(index)}>Eliminar</button>
                        </div>
                    ))}
                </div>

                <div>
                    <label>Textos Adicionales</label>
                    {textFields.map((field, index) => (
                        <div key={field.id} className="text-item">
                            <input
                                {...register(`textArray.${index}`, {
                                    required: "El texto adicional es requerido",
                                    minLength: { 
                                        value: 2, 
                                        message: "Debe tener al menos 2 caracteres" 
                                    },
                                    maxLength: { 
                                        value: 50, 
                                        message: "Debe tener menos de 50 caracteres" 
                                    }
                                })}
                            />
                            <button type="button" onClick={() => removeText(index)}>Eliminar</button>
                        </div>
                    ))}
                    <button type="button" onClick={() => appendText("")}>
                        Añadir Texto
                    </button>
                </div>

                <input type="submit" value="Guardar Cambios" />
            </form>
        </div>
    );
}
