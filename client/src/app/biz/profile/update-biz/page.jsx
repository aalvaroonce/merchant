'use client';
import { useState } from "react";
import FormularioUpdateBiz from "@/components/formularios/FormularioUpdateBiz";
import updateBiz from "@/components/business/utils/handleUpdateBiz.js";
import changePassword from "@/components/business/utils/handlePassword.js";
import Notification from "@/components/Notification";

export default function UpdateBiz() {
    const [mensaje, setMensaje] = useState(null); // { text: "", type: "" }
    const [loading, setLoading] = useState(false);
    const [isVisible, setVisible] = useState(false);

    const handleSendData = async (data) => {
        try {
            setLoading(true);
            const result = await updateBiz(data); 
            setMensaje({ text: result.message || "Comercio actualizado con éxito.", type: "success" });
        } catch (error) {
            setMensaje({ text: error.message || "Error al actualizar el comercio.", type: "error" });
        } finally {
            setLoading(false);
            setVisible(true);
        }
    };

    const handleChangePassword = async (data) => {
        try {
            setLoading(true);
            const result = await changePassword(data);
            setMensaje({ text: result.message || "Contraseña actualizada con éxito.", type: "success" });
        } catch (error) {
            setMensaje({ text: error.message || "Error al cambiar la contraseña.", type: "error" });
        } finally {
            setLoading(false);
            setVisible(true); 
        }
    };

    const closeNotification = () => setVisible(false);

    return (
        <>
            <FormularioUpdateBiz
                sendData={handleSendData}
                handleChangePassword={handleChangePassword}
            />
            {loading && <p>Cargando...</p>}
            {isVisible && mensaje && (
                <Notification
                    message={mensaje.text}
                    type={mensaje.type}
                    onClose={closeNotification}
                />
            )}
        </>
    );
}
