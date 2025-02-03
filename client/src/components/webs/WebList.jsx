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
        <div className={`bg-gradient-to-r from-gray-900 via-gray-800 to-black min-h-screen p-6 text-white ${
            cifSelected ? "overflow-hidden" : ""
        }`}>
            <h2 className="text-4xl font-bold mb-6 text-center text-blue-400">Lista de Webs</h2>
            <div className="max-w-7xl mx-auto">
                <Filter onFilterChange={handleFilterChange} />
                {loading ? (
                    <p className="text-center mt-6 text-lg font-semibold text-blue-500">Cargando webs...</p>
                ) : error ? (
                    <p className="text-center mt-6 text-lg font-bold text-red-500">{error}</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                        {webs.map((web) => (
                            <div
                                key={web.businessCIF}
                                className="bg-gray-800 hover:shadow-lg hover:shadow-blue-400 rounded-lg p-4 cursor-pointer transition-transform transform hover:scale-105"
                                onClick={() => setCifSelected(web.businessCIF)}
                            >
                                <h3 className="text-xl font-bold text-purple-400 mb-2">{web.heading}</h3>
                                <p className="text-gray-300">Ciudad: {web.city}</p>
                                <p className="text-gray-300">Actividad: {web.activity}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {cifSelected && <WebDetails cif={cifSelected} onClose={() => setCifSelected("")} />}
        </div>
    );
}

export default WebList;
