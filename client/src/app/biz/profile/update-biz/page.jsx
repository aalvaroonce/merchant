'use client';
import { Suspense, useState } from "react";
import FormularioUpdateBiz from "@/components/formularios/FormularioUpdateBiz";
import updateBiz from "@/components/business/utils/handleUpdateBiz.js";
import changePassword from "@/components/business/utils/handlePassword.js";
import Notification from "@/components/Notification";
import { useRouter } from 'next/navigation'; 

export default function UpdateBiz() {
    const [notification, setNotification] = useState(null); // { text: "", type: "" }
    const router= useRouter()

    const handleSendData = async (data) => {
        try {
            const result = await updateBiz(data);
            setNotification({ message: result.message || "Comercio actualizado con éxito.", type: "success" });
            setTimeout(() => {
                router.push("/biz/profile");
            }, 2000);
        } catch (error) {
            setNotification({ message: error.message || "Error al actualizar el comercio.", type: "error" });
            setTimeout(() => {
                router.push("/biz/profile");
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
                router.push("/biz/profile");
            }, 2000);
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
                <FormularioUpdateBiz 
                    sendData={handleSendData}
                    handleChangePassword={handleChangePassword} 
                />
            </Suspense>
        
        </>
    );
}
