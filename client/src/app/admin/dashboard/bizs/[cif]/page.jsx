'use client';
import { Suspense, useState } from "react";
import FormularioUpdateBiz from "@/components/formularios/FormularioUpdateBiz";
import updateBiz from "@/components/business/utils/handleUpdateBiz.js";
import changePassword from "@/components/business/utils/handlePassword.js";
import Notification from "@/components/Notification";
import { useParams, useRouter } from "next/navigation"; 
import DeleteBiz from "@/components/admin/DeleteBiz";
import { deleteBiz } from "@/components/admin/utils/handleDeleteBiz";

export default function UpdateBiz() {
    const [notification, setNotification] = useState(null);
    const { cif } = useParams(); 
    const router= useRouter()

    const handleSendData = async (data) => {
        try {
            const result = await updateBiz(data, cif);
            setNotification({ message: result.message || "Comercio actualizado con éxito.", type: "success" });
            setTimeout(() => {
                router.push("/admin/dashboard");
            }, 2000);
        } catch (error) {
            setNotification({ message: error.message || "Error al actualizar el comercio.", type: "error" });
            setTimeout(() => {
                router.push("/admin/dashboard");
            }, 2000);
        } 
    };

    const handleChangePassword = async (data) => {
        try {
            const result = await changePassword(data);
            setNotification({ message: result.message || "Contraseña actualizada con éxito.", type: "success" });
        } catch (error) {
            setNotification({ message: error.message || "Error al cambiar la contraseña.", type: "error" });
            setTimeout(() => {
                router.push("/admin/dashboard");
            }, 2000);
        } 
    };

    const handleConfirmAction = async (action, setMensaje, setIsModalOpen) => {
        try {
            const result = await deleteBiz(action);
            setNotification({ type: "success", message: result.message });
            setIsModalOpen(false);
            setTimeout(() => {
                router.push("/biz/profile");
            }, 2000);
        } catch (error) {
            console.error("Error en la eliminación:", error);
            setNotification({ type: "error", message: "Error al eliminar. Intenta nuevamente." });
            setIsModalOpen(false);
        }
    };

    return (
        <>
    
            <Suspense fallback={<p>Cargando componente...</p>}>
                {notification && (
                    <Notification
                        message={notification.message}
                        type={notification.type}
                        onClose={() => setNotification(null)}
                    />)}
    
                <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-xl shadow-lg">
                    <FormularioUpdateBiz 
                            sendData={handleSendData}
                            handleChangePassword={handleChangePassword} 
                        />
                    <div className="mt-8">
                    <DeleteBiz onConfirmAction={handleConfirmAction} />
                    </div>
                </div>
            </Suspense>
        
        </>
    );
}
