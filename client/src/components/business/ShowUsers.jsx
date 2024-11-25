'use client';

import { useState, useEffect } from 'react';
import UserDetails from './UserDetails';
import Filter from './Filter';
import showUsers from './utils/handleShowUsers';

function WebList() {
    const [users, setUsers] = useState([]);
    const [idSelected, setIdSelected] = useState("");
    const [filters, setFilters] = useState({ upwards: "true" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            setError(null);

            try {
                const UsersData = await showUsers(filters); 
                setUsers(UsersData);
            } catch (error) {
                setError("Error al cargar las users.");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [filters]);

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    return (
        <div className="users-list">
            <h2 className="users-list-title">Lista de users</h2>
            <Filter onFilterChange={handleFilterChange} />

            {loading && <p>Cargando users...</p>}
            {error && <p className="error">{error}</p>}

            <div className="users-container">
                {!loading && !error && users.map((user) => (
                    <div key={user._id} className="user-card">
                        <h3
                            className="user-heading"
                            onClick={() => setIdSelected(user._id)}
                        >
                            {user.heading}
                        </h3>
                        <p className="user-city">Ciudad: {user.city}</p>
                        <p className="user-activity">Actividad: {user.activity}</p>
                    </div>
                ))}
            </div>

            {idSelected && <UserDetails id={idSelected} />}
        </div>
    );
}

export default WebList;
