import { useForm, useFieldArray } from "react-hook-form";
import { useEffect, useState } from "react";
import Image from "next/image";
import getWeb from "./utils/handleGetWeb";
import getCookies from "./utils/getCookies";
import capitalize from "./utils/capitalize";
import deleteImage from "./utils/handleDeleteImage";
import Mensaje from "../Mensaje";

export default function FormularioUpdateWeb({ sendData }) {
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [mensaje, setMensaje] = useState(null); // For image actions
    
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
                const parsedData = JSON.parse(webData);
                reset({
                    ...parsedData,
                    imageArray: []
                });
                parsedData.imageArray.map((field)=>{
                    appendImage({imageUrl: field})
                })
            } catch (error) {
                console.log("Error al obtener los datos de la web:", error);
                setMensaje({ type: "error", text: "Error al obtener los datos de la web:" });
            } finally {
                setLoading(false);
            }
        };

        fetchBusinessData();
    }, [reset]);

    const handleImageUpload = async (file) => {
        setUploading(true);
        try {
            const { biz, token } = await getCookies();
            const bizCIF = JSON.parse(biz).CIF;

            const formData = new FormData();
            formData.append("image", file);

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/web/memory/addimage/${bizCIF}`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Error al subir la imagen. Verifique el archivo.");
            }

            const data = await response.json();
            appendImage({ imageUrl: data.data });
            setMensaje({ type: "exito", text: "Imagen añadida correctamente." });
        } catch (error) {
            console.error("Error durante la carga de imagen:", error);
            setMensaje({ type: "error", text: "Error al subir la imagen. Intenta nuevamente." });
        } finally {
            setUploading(false);
        }
    };

    const handleImageDelete = async (index) => {
        try {
            const imageUrl = imageFields[index].imageUrl;
            const deletedData = await deleteImage(imageUrl);

            if (deletedData.data) {

                removeImage(index);
                
                setMensaje({ type: "exito", text: "Imagen eliminada correctamente." });
            } else {
                throw new Error("Error en la eliminación");
            }
        } catch (error) {
            console.error("Error durante la eliminación de la imagen:", error);
            setMensaje({ type: "error", text: "Error al eliminar la imagen. Intenta nuevamente." });
        }
    };

    const onSubmit = (data) => {
        const capitalizedActivity = capitalize(data.activity);
        const capitalizedCity = capitalize(data.city);
        const { imageArray, ...filteredData } = data;
        const newData = { ...filteredData, activity: capitalizedActivity, city: capitalizedCity };

        sendData(newData);

    };

    if (loading) {
        return <p>Cargando datos de la web...</p>;
    }

    return (
        <div className="formulario-container">
            <h3>Editar web</h3>
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
                            maxLength: {
                                value: 20,
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
                            maxLength: {
                                value: 200,
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
                        className="mt-2 mb-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                    />
                    {uploading && <p>Subiendo imagen...</p>}
                    <div className="flex flex-wrap gap-4">
                        {imageFields.map((field, index) => (
                            <div
                                key={index}
                                className="relative w-24 h-24 bg-gray-100 border border-gray-200 rounded shadow-sm overflow-hidden flex items-center justify-center"
                            >
                                {field.imageUrl ? (
                                    <Image
                                        src={field.imageUrl}
                                        alt={`Imagen ${index + 1}`}
                                        priority={true}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="rounded"
                                    />
                                ) : (
                                    <p>Imagen no disponible</p>
                                )}
                                <button
                                    type="button"
                                    onClick={() => handleImageDelete(index)}
                                    className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full px-1 hover:bg-red-600"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                {mensaje && <Mensaje mensaje={mensaje} />}

                <div>
                    <label>Textos Adicionales</label>
                    {textFields.map((field, index) => (
                        <div key={index} className="text-item">
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
