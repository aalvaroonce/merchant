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
        return (
            <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
                <p className="text-lg animate-pulse">Cargando opciones del dashboard...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white p-8">
            <h1 className="text-4xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                Panel de Control
            </h1>
            {authError && (
                <div className="mb-6 text-center text-red-500 font-semibold">
                    {authError}
                </div>
            )}
            <ul className="space-y-6 max-w-3xl mx-auto">
                {webExists ? (
                    <li className="bg-gradient-to-r from-purple-500 to-blue-600 p-4 rounded-xl shadow-lg text-center transition-transform transform hover:scale-105">
                        <Link href="/biz/profile/update-web" className="text-xl font-medium">
                            Actualizar Web
                        </Link>
                    </li>
                ) : (
                    <li className="bg-gradient-to-r from-orange-400 to-red-500 p-4 rounded-xl shadow-lg text-center transition-transform transform hover:scale-105">
                        <Link href="/biz/profile/create-web " className="text-xl font-medium">
                            Crear Web
                        </Link>
                    </li>
                )}
                <li className="bg-gradient-to-r from-gray-600 to-gray-800 p-4 rounded-xl shadow-lg text-center transition-transform transform hover:scale-105">
                    <Link href="/biz/profile/update-biz"  className="text-xl font-medium">
                            Actualizar Negocio
                    </Link>
                </li>
            </ul>
        </div>
    );
}
