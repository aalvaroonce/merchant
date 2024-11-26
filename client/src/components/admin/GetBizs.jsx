'use client';

import { useState, useEffect } from 'react';
import BizDetails from './BizDetails';
import Filter from './Filter';
import getBizs from './utils/handleGetBizs';
import BizDetails from './BizDetails';

function UserList() {
    const [bizs, setBizs] = useState([]);
    const [cif, setCif] = useState("");
    const [filters, setFilters] = useState({ upwards: "true" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchbizs = async () => {
            setLoading(true);
            setError(null);

            try {
                const bizsData = await getBizs(filters); 
                setBizs(bizsData);
            } catch (error) {
                setError("Error al cargar las bizs.");
            } finally {
                setLoading(false);
            }
        };

        fetchbizs();
    }, [filters]);

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    return (
        <div className="bizs-list">
            <h2 className="bizs-list-title">Lista de comercios</h2>
            <Filter onFilterChange={handleFilterChange} />

            {loading && <p>Cargando comercios...</p>}
            {error && <p className="error">{error}</p>}

            <div className="bizs-container">
                {!loading && !error && bizs.map((biz) => (
                    <div key={biz.CIF} className="biz-card">
                        <h3
                            className="biz-heading"
                            onClick={() => setCif(biz.CIF)}
                        >
                            {biz.name}
                        </h3>
                        <p className="biz-city">Teléfono: {biz.phone}</p>
                        <p className="biz-activity">Email: {biz.email}</p>
                    </div>
                ))}
            </div>

            {cif && <BizDetails id={cif} />}
        </div>
    );
}

export default UserList;
