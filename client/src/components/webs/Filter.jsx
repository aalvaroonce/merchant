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
        const capitalizedCity = capitalize(data.city);
        onFilterChange({ ...data, activity: capitalizedActivity, city: capitalizedCity });
    };

    return (
        <div className="bg-gray-900 p-4 shadow-lg w-full">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-wrap items-center gap-4 justify-between max-w-7xl mx-auto"
            >
                <Controller
                    name="city"
                    control={control}
                    render={({ field }) => (
                        <input
                            {...field}
                            className="flex-1 bg-gray-800 text-white placeholder-gray-500 border border-gray-700 rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            placeholder="Ciudad"
                        />
                    )}
                />

                <Controller
                    name="activity"
                    control={control}
                    render={({ field }) => (
                        <input
                            {...field}
                            className="flex-1 bg-gray-800 text-white placeholder-gray-500 border border-gray-700 rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-purple-400 focus:outline-none"
                            placeholder="Actividad"
                        />
                    )}
                />

                <button
                    type="button"
                    className={`px-4 py-2 rounded-md text-sm font-medium ${sortByScoring
                        ? "bg-orange-500 hover:bg-orange-600"
                        : "bg-gray-800 hover:bg-gray-700"
                        }`}
                    onClick={() => setValue("sortByScoring", !sortByScoring)}
                >
                    {sortByScoring ? "Orden Activado" : "Orden Desactivado"}
                </button>

                {sortByScoring && (
                    <div className="flex items-center gap-4">
                        <label className="flex items-center text-sm">
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
                                        className="mr-1"
                                    />
                                )}
                            />
                            Asc
                        </label>
                        <label className="flex items-center text-sm">
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
                                        className="mr-1"
                                    />
                                )}
                            />
                            Desc
                        </label>
                    </div>
                )}

                <button
                    type="submit"
                    className="flex-1 lg:flex-none bg-gradient-to-r from-blue-500 to-purple-500 rounded-md text-sm font-medium px-4 py-2 lg:px-4 lg:py-2.5 lg:text-xs text-center text-white hover:opacity-80 transition"
                >
                    Aplicar Filtros
                </button>
            </form>
        </div>
    );
}

export default Filter;
