'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Filter from '@/components/admin/Filter';
import getUsers from '@/components/admin/utils/handleGetUsers';
import Notification from '@/components/Notification';
import Mensaje from '@/components/Mensaje';
import UserCookies from '@/components/admin/utils/handleUserCookies';
import restoreUser from '@/components/admin/utils/handleRestoreUser';

function UserList() {
    const [users, setUsers] = useState([]);
    const [filters, setFilters] = useState({ upwards: "true", deleted: "false" }); 
    const [loading, setLoading] = useState(false);
    const [mensaje, setMensaje] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [notification, setNotification] = useState(null);

    const router = useRouter();

    useEffect(() => {  
        const fetchUsers = async () => {
            setLoading(true);
            setMensaje(null);

            try {
                const usersData = await getUsers(filters);
                setUsers(usersData);
            } catch (error) {
                setMensaje({ type: "error", text: "Error al cargar los usuarios." });
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [filters]);

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters); 
    };

    const handleRecoverBiz = async (id) => {
        try {
            const restoredBiz = restoreUser(id)
            if (restoredBiz){
                setNotification({ type: "success", message: "Comercio recuperado con éxito." });
            }
            setTimeout(() => router.push('/admin'), 2000);
        } catch (error) {
            console.log(error)
            setNotification({ type: "error", message: "Error al recuperar el comercio." });
        }
    };

    const handleUpdateBiz = (user) => {
        setShowModal(false); 
        UserCookies(user); 
        router.push("/user/profile"); 
    };

    return (
        <div className="p-6 bg-gray-900 min-h-screen text-white">
            <h2 className="text-3xl font-bold mb-6 text-blue-400">Lista de Usuarios</h2>
            <Filter onFilterChange={handleFilterChange} />
    
            {loading && <p className="text-yellow-400">Cargando usuarios...</p>}
            <Mensaje mensaje={mensaje} />
    
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {!loading && users.map((user) => (
                    <div key={user._id} className="bg-gray-800 p-4 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-blue-300">{user.name}</h3>
                        <p className="text-gray-400">Ciudad: {user.city}</p>
                        <p className="text-gray-400">Email: {user.email}</p>
                        <div className="flex justify-end mt-4">
                            <button
                                className="text-gray-400 hover:text-blue-300"
                                onClick={() => { setSelectedUser(user); setShowModal(true); }}
                            >
                                Opciones
                            </button>
                        </div>
                    </div>
                ))}
            </div>
    
            {showModal && selectedUser && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white max-w-md w-full">
                        <h3 className="text-2xl font-bold text-white mb-4">Opciones para {selectedUser.name}</h3>
                        <button
                            onClick={() => {
                                setShowModal(false);
                                handleUpdateBiz(selectedUser);
                            }}
                            className="w-full py-2 bg-blue-900 hover:bg-blue-700 text-white rounded-lg shadow-md mb-4"
                        >
                            Actualizar usuario
                        </button>
                        <button
                            onClick={() => handleRecoverBiz(selectedUser._id)}
                            className="w-full py-2 bg-blue-800 hover:bg-blue-600 text-white rounded-lg shadow-md mb-4"
                        >
                            Recuperar usuario
                        </button>
                        <button
                            onClick={() => setShowModal(false)}
                            className="w-full py-2 bg-red-900 hover:bg-red-700 text-white rounded-lg shadow-md"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
    
            {notification && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification(null)}
                />
            )}
        </div>
    );
    
}

export default UserList;
