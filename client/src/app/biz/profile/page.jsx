'use client'

import { useEffect, useState } from "react";
import Link from "next/link";
import checkWebExists from "@/components/business/utils/checkWebExists"; 

export default function Dashboard() {
    const [webExists, setWebExists] = useState(false);
    const [loading, setLoading] = useState(true);
    const [authError, setAuthError] = useState(null);

    useEffect(() => {
        const verifyWeb = async () => {
            try {
                const exists = await checkWebExists(); 
                setWebExists(exists);
            } catch (error) {
                console.error("Error verificando la existencia de la web:", error);
                setAuthError("No se pudo verificar tu sesión. Intenta recargar la página.");
            } finally {
                setLoading(false);
            }
        };

        verifyWeb();
    }, []);

    if (loading) {
        return <p>Cargando opciones del dashboard...</p>;
    }

    return (
        <div className="dashboard-container">
            <h1>Panel de Control</h1>
            <ul className="dashboard-options">
                {authError && (
                    <p className="text-red-600 font-bold mt-4">
                        {authError}
                    </p>
                )}
                {webExists ? (
                    <li>
                        <Link href="/biz/profile/update-web">Actualizar Web</Link>
                    </li>
                ) : (
                    <li>
                        <Link href="/biz/profile/create-web">Crear Web</Link>
                    </li>
                )}

                <li>
                    <Link href="/biz/profile/update-biz">Actualizar Negocio</Link>
                </li>
            </ul>
        </div>
    );
}
