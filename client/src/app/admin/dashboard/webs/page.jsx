'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Filter from '@/components/admin/Filter';
import getWebs from '@/components/admin/utils/handleGetWebs';
import Notification from '@/components/Notification';
import Mensaje from '@/components/Mensaje';
import WebCookies from '@/components/admin/utils/handleWebCookies';
import restoreWeb from '@/components/admin/utils/handleRestoreWeb';

function WebList() {
    const [webs, setWebs] = useState([]);
    const [filters, setFilters] = useState({ upwards: "true", deleted: "false" }); 
    const [loading, setLoading] = useState(false);
    const [mensaje, setMensaje] = useState(null);
    const [selectedWeb, setSelectedWeb] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [notification, setNotification] = useState(null);

    const router = useRouter();

    useEffect(() => {  
        const fetchWebs = async () => {
            setLoading(true);
            setMensaje(null);

            try {
                const websData = await getWebs(filters);
                setWebs(websData);
            } catch (error) {
                setMensaje({ type: "error", text: "Error al cargar las webs." });
            } finally {
                setLoading(false);
            }
        };

        fetchWebs();
    }, [filters]);

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters); 
    };

    const handleRecoverBiz = async (businessCIF) => {
        try {
            const restoredBiz = restoreWeb(businessCIF)
            if (restoredBiz){
                setNotification({ type: "success", message: "Comercio recuperado con éxito." });
            }
            setTimeout(() => router.push('/admin'), 2000);
        } catch (error) {
            console.log(error)
            setNotification({ type: "error", message: "Error al recuperar el comercio." });
        }
    };

    const handleUpdateBiz = (web) => {
        setShowModal(false); 
        WebCookies(web); 
        router.push("/biz/profile/update-web"); 
    };

    return (
        <div className="bizs-list">
            <h2 className="bizs-list-title">Lista de webs</h2>
            <Filter onFilterChange={handleFilterChange} /> 

            {loading && <p>Cargando webs...</p>}
            <Mensaje mensaje={mensaje} />

            <div className="bizs-container">
                {!loading && webs.map((web) => (
                    <div key={web.businessCIF} className="web-card">
                        <h3 className="web-heading">{web.heading}</h3>
                        <p className="web-city">Ciudad: {web.city}</p>
                        <p className="web-activity">Actividad: {web.activity}</p>
                        <div className="web-options">
                            <button onClick={() => { setSelectedWeb(web); setShowModal(true); }}>
                                ...
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && selectedWeb && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Opciones para {selectedWeb.name}</h3>
                        <button
                            onClick={() => {
                                setShowModal(false); 
                                handleUpdateBiz(selectedWeb); 
                            }}
                        >
                            Actualizar comercio
                        </button>
                        <button onClick={() => handleRecoverBiz(selectedWeb.businessCIF)}>Recuperar comercio</button>
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

export default WebList;
