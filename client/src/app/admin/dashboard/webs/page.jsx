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
        <div className="p-6 bg-gray-900 min-h-screen text-white">
            <h2 className="text-3xl font-bold mb-6 text-blue-400">Lista de Webs</h2>
            <Filter onFilterChange={handleFilterChange} />
    
            {loading && <p className="text-yellow-400">Cargando webs...</p>}
            <Mensaje mensaje={mensaje} />
    
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {!loading && webs.map((web) => (
                    <div key={web.businessCIF} className="bg-gray-800 p-4 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-blue-300">{web.heading}</h3>
                        <p className="text-gray-400">Ciudad: {web.city}</p>
                        <p className="text-gray-400">Actividad: {web.activity}</p>
                        <div className="flex justify-end mt-4">
                            <button
                                className="text-gray-400 hover:text-blue-300"
                                onClick={() => { setSelectedWeb(web); setShowModal(true); }}
                            >
                                Opciones
                            </button>
                        </div>
                    </div>
                ))}
            </div>
    
            {showModal && selectedWeb && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white max-w-md w-full">
                        <h3 className="text-2xl font-bold text-white mb-4">Opciones para {selectedWeb.name}</h3>
                        <button
                            onClick={() => {
                                setShowModal(false);
                                handleUpdateBiz(selectedWeb);
                            }}
                            className="w-full py-2 bg-blue-900 hover:bg-blue-700 text-white rounded-lg shadow-md mb-4"
                        >
                            Actualizar comercio
                        </button>
                        <button
                            onClick={() => handleRecoverBiz(selectedWeb.businessCIF)}
                            className="w-full py-2 bg-blue-800 hover:bg-blue-600 text-white rounded-lg shadow-md mb-4"
                        >
                            Recuperar comercio
                        </button>
                        <button
                            onClick={() => setShowModal(false)}
                            className="w-full py-2 bg-red-900 hover:bg-red-700 text-white rounded-lg shadow-md"
                        >
                            Cerrar
                        </button>
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
