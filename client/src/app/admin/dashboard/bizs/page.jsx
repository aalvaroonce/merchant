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
        const fetchBizs = async () => {
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

        fetchBizs();
    }, [filters]);

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters); 
    };

    const handleRecoverBiz = async (cif) => {
        try {
            const restoredBiz = restoreBiz(cif);
            if (restoredBiz) {
                setNotification({ type: "success", message: "Comercio recuperado con éxito." });
            }
            setTimeout(() => router.push('/admin/dashboard'), 2000);
        } catch (error) {
            console.log(error);
            setNotification({ type: "error", message: "Error al recuperar el comercio." });
        }
    };

    const handleUpdateBiz = (biz) => {
        setShowModal(false); 
        BizCookies(biz); 
        router.push(`/admin/dashboard/bizs/${biz.CIF}`); 
    };

    return (
        <div className="p-6 bg-gray-900 min-h-screen text-white">
            <h2 className="text-3xl font-bold mb-6 text-blue-400">Lista de Comercios</h2>
            <Filter onFilterChange={handleFilterChange} /> 

            {loading && <p className="text-yellow-400">Cargando comercios...</p>}
            <Mensaje mensaje={mensaje} />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {!loading && bizs.map((biz) => (
                    <div key={biz.CIF} className="bg-gray-800 p-4 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-blue-300">{biz.name}</h3>
                        <p className="text-gray-400">Teléfono: {biz.phone}</p>
                        <p className="text-gray-400">Email: {biz.email}</p>
                        <div className="flex justify-end mt-4">
                            <button 
                                className="text-gray-400 hover:text-blue-300"
                                onClick={() => { setSelectedBiz(biz); setShowModal(true); }}
                            >
                                Opciones
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && selectedBiz && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white max-w-md w-full">
                        <h3 className="text-2xl font-bold text-white mb-4">Opciones para {selectedBiz.name}</h3>
                        <button
                            onClick={() => {
                                setShowModal(false); 
                                handleUpdateBiz(selectedBiz); 
                            }}
                            className="w-full py-2 bg-blue-900 hover:bg-blue-700 text-white rounded-lg shadow-md mb-4"
                        >
                            Actualizar comercio
                        </button>
                        <button 
                            onClick={() => handleRecoverBiz(selectedBiz.CIF)}
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

export default BizList;
