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
        <div className="bizs-list">
            <h2 className="bizs-list-title">Lista de usuarios</h2>
            <Filter onFilterChange={handleFilterChange} /> 

            {loading && <p>Cargando usuarios...</p>}
            <Mensaje mensaje={mensaje} />

            <div className="bizs-container">
                {!loading && users.map((user) => (
                    <div key={user._id} className="user-card">
                        <h3 className="user-heading">{user.name}</h3>
                        <p className="user-city">Ciudad: {user.city}</p>
                        <p className="user-activity">Email: {user.email}</p>
                        <div className="user-options">
                            <button onClick={() => { setSelectedUser(user); setShowModal(true); }}>
                                ...
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && selectedUser && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Opciones para {selectedUser.name}</h3>
                        <button
                            onClick={() => {
                                setShowModal(false); 
                                handleUpdateBiz(selectedUser); 
                            }}
                        >
                            Actualizar usuario
                        </button>
                        <button onClick={() => handleRecoverBiz(selectedUser._id)}>Recuperar usuario</button>
                        <button onClick={() => setShowModal(false)}>Cerrar</button>
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
