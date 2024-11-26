'use client';

import { useState, useEffect } from 'react';
import showUsers from '@/components/business/utils/handleShowUsers';
import EmailModal from '@/components/business/EmailModal';

function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            setError(null);

            try {
                const UsersData = await showUsers(); 
                setUsers(UsersData);
            } catch (error) {
                setError("Error al cargar los usuarios.");
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
        <div className="users-list">
            <h2 className="users-list-title">Lista de usuarios</h2>

            {loading && <p>Cargando usuarios...</p>}
            {error && <p className="error">{error}</p>}

            <div className="users-container">
                {!loading && !error && users.map((user) => (
                    <div key={user._id} className="user-card relative">
                        <h3 className="user-heading">{user.name}</h3>
                        <p className="user-city">email: {user.email}</p>

                        <div className="absolute top-0 right-0">
                            <button
                                onClick={() => openModal(user)}
                                className="text-gray-600 hover:text-gray-800 focus:outline-none"
                            >
                                ⋮
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && selectedUser && (
                <EmailModal
                    user={selectedUser}
                    onClose={closeModal}
                />
            )}
        </div>
    );
}

export default UserList;
