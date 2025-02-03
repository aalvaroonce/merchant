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
    const [mensaje, setMensaje] = useState(null);

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

    const { fields: imageFields, append: appendImage, remove: removeImage } = useFieldArray({ control, name: "imageArray" });
    const { fields: textFields, append: appendText, remove: removeText } = useFieldArray({ control, name: "textArray" });

    useEffect(() => {
        const fetchBusinessData = async () => {
            try {
                const webData = await getWeb();
                const parsedData = JSON.parse(webData);
                reset({
                    ...parsedData,
                    imageArray: parsedData.imageArray.map(imageUrl => ({ imageUrl })),
                });
            } catch (error) {
                console.error("Error al obtener los datos de la web:", error);
                setMensaje({ type: "error", text: "Error al cargar datos." });
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
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Error al subir la imagen.");
            }

            const data = await response.json();
            appendImage({ imageUrl: data.data });
            setMensaje({ type: "exito", text: "Imagen añadida correctamente." });
        } catch (error) {
            console.error("Error durante la carga:", error);
            setMensaje({ type: "error", text: "Error al subir la imagen." });
        } finally {
            setUploading(false);
        }
    };

    const handleImageDelete = async (index) => {
        try {
            const imageUrl = imageFields[index].imageUrl;
            await deleteImage(imageUrl);
            removeImage(index);
            setMensaje({ type: "exito", text: "Imagen eliminada correctamente." });
        } catch (error) {
            console.error("Error al eliminar imagen:", error);
            setMensaje({ type: "error", text: "Error al eliminar imagen." });
        }
    };

    const onSubmit = (data) => {
        const formattedData = {
            ...data,
            city: capitalize(data.city),
            activity: capitalize(data.activity),
        };
        sendData(formattedData);
    };

    if (loading) {
        return <p>Cargando datos...</p>;
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-gray-100">
            <div className="w-full max-w-2xl bg-gray-800 p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold text-center mb-6 text-orange-400">Editar Web</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
 
                <div className="form-group">
                    <label className="block text-sm font-medium">Ciudad</label>
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
                            },
                        })}
                        className="mt-1 w-full px-4 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-400"
                    />
                    {errors.city && <span className="text-sm text-orange-400 mt-1">{errors.city.message}</span>}
                </div>
    
                <div className="form-group">
                    <label className="block text-sm font-medium">Actividad</label>
                    <input
                        {...register("activity", {
                            required: "La actividad es requerida",
                            minLength: { value: 2, message: "Debe tener al menos 2 caracteres" },
                            maxLength: { value: 20, message: "Debe tener menos de 20 caracteres" },
                        })}
                        className="mt-1 w-full px-4 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-400"
                    />
                    {errors.activity && <span className="text-sm text-orange-400 mt-1">{errors.activity.message}</span>}
                </div>
    
                <div className="form-group">
                    <label className="block text-sm font-medium">Encabezado</label>
                    <input
                        {...register("heading", {
                            required: "El encabezado es requerido",
                            minLength: { value: 5, message: "Debe tener al menos 5 caracteres" },
                            maxLength: { value: 50, message: "Debe tener menos de 50 caracteres" },
                        })}
                        className="mt-1 w-full px-4 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-400"
                    />
                    {errors.heading && <span className="text-sm text-orange-400 mt-1">{errors.heading.message}</span>}
                </div>
    
                <div className="form-group">
                    <label className="block text-sm font-medium">Resumen</label>
                    <textarea
                        {...register("summary", {
                            required: "El resumen es requerido",
                            minLength: { value: 10, message: "Debe tener al menos 10 caracteres" },
                            maxLength: { value: 200, message: "Debe tener menos de 200 caracteres" },
                        })}
                        className="mt-1 w-full px-4 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-400"
                    ></textarea>
                    {errors.summary && <span className="text-sm text-orange-400 mt-1">{errors.summary.message}</span>}
                </div>
    
                <div className="form-group">
                    <label className="block text-sm font-medium">Subir Imágenes</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e.target.files[0])}
                        disabled={uploading}
                        className="mt-2 mb-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                    />
                    {uploading && <p className="text-gray-500">Subiendo imagen...</p>}
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
    
                <div className="form-group">
                    <label className="block text-sm font-medium">Textos Adicionales</label>
                    {textFields.map((field, index) => (
                        <div key={index} className="flex gap-2 items-center mb-2">
                            <input
                                {...register(`textArray.${index}`, {
                                    required: "El texto adicional es requerido",
                                    minLength: { value: 2, message: "Debe tener al menos 2 caracteres" },
                                    maxLength: { value: 50, message: "Debe tener menos de 50 caracteres" },
                                })}
                                placeholder="Inserte un texto"
                                className="w-full px-4 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-400"
                            />
                            <button
                                type="button"
                                onClick={() => removeText(index)}
                                className="text-orange-400 hover:text-orange-500"
                            >
                                Eliminar
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => appendText("")}
                        className="text-orange-400 hover:text-orange-500"
                    >
                        Añadir Texto
                    </button>
                </div>
    
                {mensaje && <Mensaje mensaje={mensaje} />}
    
                <div className="text-center">
                    <button 
                        type="submit" 
                        className="w-full py-2 bg-orange-500 text-gray-100 font-semibold rounded-lg hover:bg-orange-600 focus:ring-4 focus:ring-orange-400"
                    >
                        Guardar Cambios
                    </button>
                </div>
            </form>
            </div>
        </div>
    );
    
}
