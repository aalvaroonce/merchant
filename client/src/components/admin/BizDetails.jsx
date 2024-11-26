'use client';

import { useState, useEffect } from "react";

import getBizDetails from './utils/handleBizDetails';

export default function BizDetails({ cif }) {
    const [biz, setBiz] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            setLoading(true);
            setError(null);

            try {
                const bizData = await getBizDetails(cif);
                setBiz(bizData);
            } catch (err) {
                setError("Error al cargar los detalles del comercio.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (cif) fetchDetails();
    }, [cif]);

    if (loading) {
        return <h2 className="loading-message">Cargando detalles del comercio...</h2>;
    }

    if (error) {
        return <h2 className="error-message">{error}</h2>;
    }

    if (!biz) {
        return <h2 className="no-biz-message">Ningun comercio seleccionado</h2>;
    }

    return (
        <div className="biz-details">
            <h1 className="biz-heading">{biz.name}</h1>
            <h3 className="biz-city">{biz.CIF}</h3>
            <h3 className="biz-activity">{biz.direction}</h3>
            <h3 className="biz-summary">{biz.email}</h3>
            <h3 className="biz-summary">{biz.phone}</h3>
        </div>
    );
}
