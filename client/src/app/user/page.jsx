'use client';

import { useState, useEffect } from 'react';
import WebDetails from '@/components/webs/WebDetails';
import Filter from '@/components/webs/Filter';
import getWebs from '@/components/webs/utils/handleWebs';

function WebList() {
    const [webs, setWebs] = useState([]);
    const [cifSelected, setCifSelected] = useState("");
    const [filters, setFilters] = useState({ city: "", activity: "", sortByScoring: false, upwards: "true" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWebs = async () => {
            setLoading(true);
            setError(null);

            try {
                const websData = await getWebs(filters); 
                setWebs(websData);
                
            } catch (error) {
                setError("Error al cargar las webs.");
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchWebs();
    }, [filters]);

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    return (
        <div className="web-list">
            <h2 className="web-list-title">Lista de Webs</h2>
            <Filter onFilterChange={handleFilterChange} />

            {loading && <p>Cargando webs...</p>}
            {error && <p className="error">{error}</p>}

            <div className="webs-container">
                {!loading && !error && webs.map((web) => (
                    <div key={web.businessCIF} className="web-card">
                        <h3
                            className="web-heading"
                            onClick={() => setCifSelected(web.businessCIF)}
                        >
                            {web.heading}
                        </h3>
                        <p className="web-city">Ciudad: {web.city}</p>
                        <p className="web-activity">Actividad: {web.activity}</p>
                    </div>
                ))}
            </div>

            {cifSelected && <WebDetails cif={cifSelected} />}
        </div>
    );
}

export default WebList;
