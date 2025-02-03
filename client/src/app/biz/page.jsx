'use client';

import { useState, useEffect } from 'react';
import showUsers from '@/components/business/utils/handleShowUsers';
import EmailModal from '@/components/business/EmailModal';
import checkWebExists from '@/components/business/utils/checkWebExists';
import Mensaje from '@/components/Mensaje';

function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [mensaje, setMensaje] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            setMensaje(null);

            try {
                if (await checkWebExists()) {
                    const usersData = await showUsers();
                    setUsers(usersData);
                } else {
                    setMensaje({text:"Necesita crear su web primero"});
                }
            } catch (error) {
                setMensaje({text:"Error al cargar los usuarios."});
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const openModal = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedUser(null);
        setIsModalOpen(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 p-6 text-white">
            <h2 className="text-3xl font-bold text-center text-purple-400 mb-8">Lista de Usuarios</h2>

            {loading && (
                <p className="text-center text-lg text-blue-500 animate-pulse">Cargando usuarios...</p>
            )}
            {mensaje && <Mensaje mensaje={mensaje}/>}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {!loading &&
                    !mensaje &&
                    users.map((user) => (
                        <div
                            key={user._id}
                            className="bg-gradient-to-r from-blue-800 to-purple-900 p-4 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 relative"
                        >
                            <h3 className="text-xl font-semibold text-white">{user.name}</h3>
                            <p className="text-gray-300">Email: {user.email}</p>
                            <button
                                onClick={() => openModal(user)}
                                className="absolute top-2 right-2 text-gray-400 hover:text-gray-100 transition duration-300"
                            >
                                ⋮
                            </button>
                        </div>
                    ))}
            </div>

            {isModalOpen && selectedUser && (
                <EmailModal user={selectedUser} onClose={closeModal} />
            )}
        </div>
    );
}

export default UserList;
