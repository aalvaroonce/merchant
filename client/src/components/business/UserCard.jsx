import Link from "next/link"
export default function(){
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
    )
}