'use client'
import { useState } from 'react';

function Filter ({ onFilterChange }) {
    const [activity, setActivity] = useState("");
    const [city, setCity] = useState("");
    const [sortByScoring, setSortByScoring] = useState(false);
    const [upwards, setUpwards] = useState("true");

    function capitalize(str) {
        if (typeof str !== 'string' || str.length === 0) {
            return '';
        }
        return str.trim().charAt(0).toUpperCase() + str.trim().slice(1).toLowerCase();
    }

    const handleCityChange= (event)=> {
        setCity(
            (event.target.value));
    }

    const handleActivityChange= (event)=> {
        setActivity(capitalize(event.target.value));
    }

    const toggleSortByScoring = () => {
        setSortByScoring(!sortByScoring);
    }

    const handleOrderChange= (event)=> {
        setUpwards(event.target.value);
    }

    const handleClick = () => {
        const filterData = {
            city,
            activity,
            sortByScoring,
            upwards
        };
        onFilterChange(filterData);
    };

    return (
        <div className="filter-container">
            <label className="filter-label">Ciudad</label>
            <input
                className="filter-input"
                type="text"
                value={city}
                onChange={handleCityChange}
                placeholder="Ingrese la ciudad"
            />

            <label className="filter-label">Actividad</label>
            <input
                className="filter-input"
                type="text"
                value={activity}
                onChange={handleActivityChange}
                placeholder="Ingrese la actividad"
            />

            <label className="filter-label">Ordenar por Scoring</label>
            <button className="filter-button" onClick={toggleSortByScoring}>
                {sortByScoring ? "Desactivar" : "Activar"} Ordenación
            </button>

            {sortByScoring && (
                <>
                    <div className="direction-options">
                        <label className="direction-option">
                            <input
                                type="checkbox"
                                value="true"
                                checked={upwards === "true"}
                                onChange={handleOrderChange}
                            />
                            Ascendente
                        </label>
                        <label className="direction-option">
                            <input
                                type="checkbox"
                                value="false"
                                checked={upwards === "false"}
                                onChange={handleOrderChange}
                            />
                            Descendente
                        </label>
                    </div>
                </>
            )}

            <button className="filter-button" onClick={handleClick}>Aplicar Filtros</button>
        </div>
    );
};

export default Filter;
