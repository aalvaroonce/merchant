'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Filter from '@/components/admin/Filter';
import getBizs from '@/components/admin/utils/handleGetBizs';
import Notification from '@/components/Notification';
import Mensaje from '@/components/Mensaje';
import BizCookies from '@/components/admin/utils/handleBizCookies';
import restoreBiz from '@/components/admin/utils/handleRestoreBiz';

function BizList() {
    const [bizs, setBizs] = useState([]);
    const [filters, setFilters] = useState({ upwards: "true", deleted: "false" }); 
    const [loading, setLoading] = useState(false);
    const [mensaje, setMensaje] = useState(null);
    const [selectedBiz, setSelectedBiz] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [notification, setNotification] = useState(null);

    const router = useRouter();

    useEffect(() => {
        const fetchbizs = async () => {
            setLoading(true);
            setMensaje(null);

            try {
                const bizsData = await getBizs(filters); 
                setBizs(bizsData);
            } catch (error) {
                setMensaje({ type: "error", text: "Error al cargar las empresas." });
            } finally {
                setLoading(false);
            }
        };

        fetchbizs();
    }, [filters]);

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters); 
    };

    const handleRecoverBiz = async (cif) => {
        try {
            const restoredBiz = restoreBiz(cif)
            if (restoredBiz){
                setNotification({ type: "success", message: "Comercio recuperado con éxito." });
            }
            setTimeout(() => router.push('/admin'), 2000);
        } catch (error) {
            console.log(error)
            setNotification({ type: "error", message: "Error al recuperar el comercio." });
        }
    };

    const handleUpdateBiz = (biz) => {
        setShowModal(false); 
        BizCookies(biz); 
        router.push("/biz/profile/update-biz"); 
    };

    return (
        <div className="bizs-list">
            <h2 className="bizs-list-title">Lista de comercios</h2>
            <Filter onFilterChange={handleFilterChange} /> 

            {loading && <p>Cargando comercios...</p>}
            <Mensaje mensaje={mensaje} />

            <div className="bizs-container">
                {!loading && bizs.map((biz) => (
                    <div key={biz.CIF} className="biz-card">
                        <h3 className="biz-heading">{biz.name}</h3>
                        <p className="biz-city">Teléfono: {biz.phone}</p>
                        <p className="biz-activity">Email: {biz.email}</p>
                        <div className="biz-options">
                            <button onClick={() => { setSelectedBiz(biz); setShowModal(true); }}>
                                ...
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && selectedBiz && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Opciones para {selectedBiz.name}</h3>
                        <button
                            onClick={() => {
                                setShowModal(false); 
                                handleUpdateBiz(selectedBiz); 
                            }}
                        >
                            Actualizar comercio
                        </button>
                        <button onClick={() => handleRecoverBiz(selectedBiz.CIF)}>Recuperar comercio</button>
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

export default BizList;
