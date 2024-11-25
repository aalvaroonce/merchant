'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import handleCookies from './handleCookies';

function Navbar({ role }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [logoutMessage, setLogoutMessage] = useState(null);
    const router = useRouter();

    const handleNavigation = (path) => {
        setMenuOpen(false);
        router.push(path);
    };

    const handleLogOut = async () => {
        try {
            const response = await handleCookies()

            if (response.ok) {
                setLogoutMessage(response.message); 

                setTimeout(() => {
                    setMenuOpen(!menuOpen)
                    setLogoutMessage(null); 
                    router.push('/login'); 
                }, 2000); 
            } else {
                console.error('Error al cerrar sesión');
            }
        } catch (error) {
            console.error('Error de conexión:', error);
        }
    };

    const renderMenuItems = () => {
        switch (role) {
            case 'user':
                return (
                    <>
                        <div
                            className="px-4 py-2 hover:bg-gray-600 cursor-pointer"
                            onClick={() => handleNavigation('/user/profile')}
                        >
                            Perfil
                        </div>
                        <div
                            className="px-4 py-2 hover:bg-gray-600 cursor-pointer"
                            onClick={handleLogOut}
                        >
                            Cerrar Sesión
                        </div>
                    </>
                );
            case 'biz':
                return (
                    <>
                        <div
                            className="px-4 py-2 hover:bg-gray-600 cursor-pointer"
                            onClick={() => handleNavigation('/biz/perfil')}
                        >
                            Perfil de Comercio
                        </div>
                        <div
                            className="px-4 py-2 hover:bg-gray-600 cursor-pointer"
                            onClick={handleLogOut}
                        >
                            Cerrar Sesión
                        </div>
                    </>
                );
            case 'admin':
                return (
                    <>
                        <div
                            className="px-4 py-2 hover:bg-gray-600 cursor-pointer"
                            onClick={() => handleNavigation('/admin')}
                        >
                            Panel de Admin
                        </div>
                        <div
                            className="px-4 py-2 hover:bg-gray-600 cursor-pointer"
                            onClick={handleLogOut}
                        >
                            Cerrar Sesión
                        </div>
                    </>
                );
            default:
                return (
                    <>
                        <div
                            className="px-4 py-2 hover:bg-gray-600 cursor-pointer"
                            onClick={() => handleNavigation('/login')}
                        >
                            Iniciar Sesión
                        </div>
                        <div
                            className="px-4 py-2 hover:bg-gray-600 cursor-pointer"
                            onClick={() => handleNavigation('/register')}
                        >
                            Registrarse
                        </div>
                    </>
                );
        }
    };

    return (
        <>
            {logoutMessage && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <p className="text-lg font-bold text-gray-800">{logoutMessage}</p>
                    </div>
                </div>
            )}
            <nav className="flex justify-between items-center bg-gray-800 p-4 text-white">
                <div
                    className="font-bold text-xl cursor-pointer"
                    onClick={() => router.push('/')}
                >
                    MiProyecto
                </div>
                <div
                    className="text-2xl cursor-pointer"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    ☰
                </div>
                <div
                    className={`absolute top-16 right-4 bg-gray-700 text-white rounded-md shadow-lg ${
                        menuOpen ? 'block' : 'hidden'
                    }`}
                >
                    {renderMenuItems()}
                </div>
            </nav>
        </>
    );
}

export default Navbar;