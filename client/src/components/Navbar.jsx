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
            const response = await handleCookies();

            if (response.ok) {
                setLogoutMessage(response.message);

                setTimeout(() => {
                    setMenuOpen(false);
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
                            className="px-4 py-3 hover:bg-gradient-to-r from-blue-500 to-purple-500 cursor-pointer rounded-lg"
                            onClick={() => handleNavigation('/user/profile')}
                        >
                            Perfil
                        </div>
                        <div
                            className="px-4 py-3 hover:bg-gradient-to-r from-blue-500 to-purple-500 cursor-pointer rounded-lg"
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
                            className="px-4 py-3 hover:bg-gradient-to-r from-orange-400 to-red-500 cursor-pointer rounded-lg"
                            onClick={() => handleNavigation('/biz/profile')}
                        >
                            Panel de Comercio
                        </div>
                        <div
                            className="px-4 py-3 hover:bg-gradient-to-r from-orange-400 to-red-500 cursor-pointer rounded-lg"
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
                            className="px-4 py-3 hover:bg-gradient-to-r from-gray-600 to-gray-800 cursor-pointer rounded-lg"
                            onClick={() => handleNavigation('/admin/dashboard')}
                        >
                            Panel de Admin
                        </div>
                        <div
                            className="px-4 py-3 hover:bg-gradient-to-r from-gray-600 to-gray-800 cursor-pointer rounded-lg"
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
                            className="px-4 py-3 hover:bg-gradient-to-r from-blue-400 to-purple-600 cursor-pointer rounded-lg"
                            onClick={() => handleNavigation('/login')}
                        >
                            Iniciar Sesión
                        </div>
                        <div
                            className="px-4 py-3 hover:bg-gradient-to-r from-blue-400 to-purple-600 cursor-pointer rounded-lg"
                            onClick={() => handleNavigation('/register')}
                        >
                            Registrarse
                        </div>
                    </>
                );
        }
    };

    const handleProjectClick = () => {
        switch (role) {
            case 'biz':
                handleNavigation('/biz');
                break;
            case 'user':
                handleNavigation('/user');
                break;
            case 'admin':
                handleNavigation('/admin');
                break;
            default:
                handleNavigation('/');
                break;
        }
    };

    return (
        <>
            {logoutMessage && (
                <div className="bg-gray-900 p-6 rounded-lg shadow-lg text-white max-w-xl mx-auto">
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                        <p className="text-lg font-semibold text-gray-800">{logoutMessage}</p>
                    </div>
                </div>
            )}
            <nav className="flex justify-between items-center bg-gradient-to-r from-gray-900 to-black p-4 text-white shadow-lg">
                <div
                    className="font-bold text-2xl cursor-pointer hover:text-purple-400 transition"
                    onClick={handleProjectClick}
                >
                    MiProyecto
                </div>
                <div
                    className="text-3xl cursor-pointer hover:text-gray-300 transition"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    ☰
                </div>
            </nav>
            <div
                className={`fixed top-0 right-0 h-full bg-gray-800 text-white transform transition-transform duration-300 shadow-xl ${
                    menuOpen ? 'translate-x-0' : 'translate-x-full'
                } w-1/3 sm:w-1/4 lg:w-1/5`}
            >
                <div className="flex flex-col items-center py-8">
                    <div
                        className="text-2xl font-bold mb-6 cursor-pointer hover:text-orange-400 transition"
                        onClick={() => setMenuOpen(false)}
                    >
                        ✕
                    </div>
                    {renderMenuItems()}
                </div>
            </div>
        </>
    );
}

export default Navbar;
