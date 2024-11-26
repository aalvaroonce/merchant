'use client';

import { useState, useEffect } from 'react';
import Filter from '@/components/business/Filter';
import showUsers from '@/components/business/utils/handleShowUsers';
import EmailModal from '@/components/business/EmailModal';
import checkWebExists from '@/components/business/utils/checkWebExists';

function UserList() {
    const [users, setUsers] = useState([]);
    const [filters, setFilters] = useState({ upwards: "true" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            setError(null);

            try {
                if ( await checkWebExists() ) {
                    const UsersData = await showUsers(filters);
                    setUsers(UsersData);
                }
                else {
                    setError("Necesita crear su web primero");
                }
            } catch (error) {
                setError("Error al cargar los users.");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [filters]);

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

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
            <h2 className="users-list-title">Lista de users</h2>
            {!loading && !error && users.length > 0 &&<Filter onFilterChange={handleFilterChange} />}

            {loading && <p>Cargando users...</p>}
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
