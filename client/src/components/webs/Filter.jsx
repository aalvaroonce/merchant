'use client';

import { useForm, Controller } from "react-hook-form";
import capitalize from "../formularios/utils/capitalize";

function Filter({ onFilterChange }) {
    const { control, handleSubmit, watch, setValue } = useForm({
        defaultValues: {
            city: "",
            activity: "",
            sortByScoring: false,
            upwards: "true",
        },
    });

    const sortByScoring = watch("sortByScoring");

    const onSubmit = (data) => {
        const capitalizedActivity = capitalize(data.activity);
        const capitalizedCity = capitalize(data.city)
        onFilterChange({ ...data, activity: capitalizedActivity, city: capitalizedCity });
    };

    return (
        <div className="filter-container">
            <form onSubmit={handleSubmit(onSubmit)}>
                <label className="filter-label">Ciudad</label>
                <Controller
                    name="city"
                    control={control}
                    render={({ field }) => (
                        <input
                            {...field}
                            className="filter-input"
                            placeholder="Ingrese la ciudad"
                        />
                    )}
                />

                <label className="filter-label">Actividad</label>
                <Controller
                    name="activity"
                    control={control}
                    render={({ field }) => (
                        <input
                            {...field}
                            className="filter-input"
                            placeholder="Ingrese la actividad"
                        />
                    )}
                />

                <label className="filter-label">Ordenar por Scoring</label>
                <Controller
                    name="sortByScoring"
                    control={control}
                    render={({ field }) => (
                        <button
                            type="button"
                            className="filter-button"
                            onClick={() => setValue("sortByScoring", !field.value)}
                        >
                            {field.value ? "Desactivar" : "Activar"} Ordenación
                        </button>
                    )}
                />

                {sortByScoring && (
                    <div className="direction-options">
                        <label className="direction-option">
                            <Controller
                                name="upwards"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="radio"
                                        value="true"
                                        checked={field.value === "true"}
                                        onChange={(e) => field.onChange(e.target.value)}
                                    />
                                )}
                            />
                            Ascendente
                        </label>
                        <label className="direction-option">
                            <Controller
                                name="upwards"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="radio"
                                        value="false"
                                        checked={field.value === "false"}
                                        onChange={(e) => field.onChange(e.target.value)}
                                    />
                                )}
                            />
                            Descendente
                        </label>
                    </div>
                )}

                <button type="submit" className="filter-button">
                    Aplicar Filtros
                </button>
            </form>
        </div>
    );
}

export default Filter;
