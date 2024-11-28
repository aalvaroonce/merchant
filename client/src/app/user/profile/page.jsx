'use client';

import { Suspense, useState } from "react";
import FormularioUpdateUser from "@/components/formularios/FormularioUpdateUser.jsx";
import changePassword from "@/components/business/utils/handlePassword.js";
import updateUser from "@/components/users/utils/handleUpdateUser.js";
import DeleteUser from "@/components/users/DeleteUser";
import Notification from "@/components/Notification";
import { useRouter } from 'next/navigation';

export default function UpdateUser() {
    const [notification, setNotification] = useState(null);
    const router = useRouter()

    const handleSendData = async (data) => {

        try {
            const result = await updateUser(data);
            setNotification({ message: result.message || "Usuario actualizado con éxito.", type: "success" });
            setTimeout(() => {
                router.push("/user/profile");
            }, 2000);

        } catch (error) {
            setNotification({ message: error.message || "Error al actualizar el usuario.", type: "error" });
            setTimeout(() => {
                router.push("/user/profile");
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
                router.push("/user/profile");
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
                <FormularioUpdateUser
                    sendData={handleSendData}
                    handleChangePassword={handleChangePassword}
                />
                <DeleteUser />
            </Suspense>

        </>
    );
}
