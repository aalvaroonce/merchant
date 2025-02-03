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
    const router = useRouter();

    const handleSendData = async (data) => {
        try {
            const result = await updateUser(data);
            setNotification({ message: result.message || "Usuario actualizado con éxito.", type: "success" });
            setTimeout(() => {
                router.push("/user");
            }, 2000);
        } catch (error) {
            setNotification({ message: error.message || "Error al actualizar el usuario.", type: "error" });
            setTimeout(() => {
                router.push("/user");
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
                router.push("/user");
            }, 2000);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white p-8">
            <Suspense fallback={<p className="text-center text-white">Cargando componente...</p>}>
                {notification && <Notification
                        message={notification.message}
                        type={notification.type}
                        onClose={() => setNotification(null)}
                    />}
                <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-xl shadow-lg">
                    <FormularioUpdateUser
                        sendData={handleSendData}
                        handleChangePassword={handleChangePassword}
                    />
                    <div className="mt-8">
                        <DeleteUser />
                    </div>
                </div>
            </Suspense>
        </div>
    );
}
