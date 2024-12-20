'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import FormularioSignIn from '@/components/formularios/FormularioSignIn';
import Mensaje from '@/components/Mensaje';
import handleSignIn from '@/components/users/utils/handleSignIn'; 

function SignIn() {
    const [mensaje, setMensaje] = useState(null);

    const handleSendData = async (data) => {
        setMensaje(null); 

        try {
            const result = await handleSignIn(data); 

            if (result.data?.token && result.data?.user?._id) {
                const router = useRouter();
                router.push('/user');
                setMensaje({ text: result.message, type: "exito" });
            } else if (result.errors && Array.isArray(result.errors)) {
                const errorMessages = result.errors.map((error) => error.msg).join(", ");
                setMensaje({ text: errorMessages, type: "error" });
            } else {
                setMensaje({ text: "Ocurrió un error desconocido", type: "error" });
            }
        } catch (error) {
            setMensaje({ text: error.message || "Error en la conexión", type: "error" });
        }
    };

    return (
        <>
            <FormularioSignIn sendData={handleSendData} />
            {mensaje && <Mensaje mensaje={mensaje} />}
        </>
    );
}

export default SignIn;
