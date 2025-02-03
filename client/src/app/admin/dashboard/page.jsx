'use client'

import Link from "next/link";

export default function Dashboard() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white p-8">
            <h1 className="text-4xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">
                Panel de Control - Admin
            </h1>
            <ul className="space-y-6 max-w-3xl mx-auto">
                <li className="bg-gradient-to-r from-purple-600 to-blue-500 p-4 rounded-xl shadow-lg text-center transition-transform transform hover:scale-105">
                    <Link href="/admin/dashboard/users" className="text-xl font-medium">
                        Gestionar Usuarios
                    </Link>
                </li>
                <li className="bg-gradient-to-r from-gray-600 to-gray-800 p-4 rounded-xl shadow-lg text-center transition-transform transform hover:scale-105">
                    <Link href="/admin/dashboard/webs" className="text-xl font-medium">
                        Gestionar Webs
                    </Link>
                </li>
                <li className="bg-gradient-to-r from-orange-500 to-red-500 p-4 rounded-xl shadow-lg text-center transition-transform transform hover:scale-105">
                    <Link href="/admin/dashboard/bizs" className="text-xl font-medium">
                        Gestionar Comercios
                    </Link>
                </li>
                <li className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-xl shadow-lg text-center transition-transform transform hover:scale-105">
                    <Link href="/admin/dashboard/bizs/create-biz" className="text-xl font-medium">
                        Crear Comercio
                    </Link>
                </li>
            </ul>
        </div>
    );
}
