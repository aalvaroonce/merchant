'use client';

import { useForm, Controller } from "react-hook-form";

function Filter({ onFilterChange }) {
    const { control, setValue, watch } = useForm({
        defaultValues: {
            upwards: "true",
            deleted: "false"
        },
    });

    const upwardsValue = watch("upwards");
    const deletedValue = watch("deleted");

    const handleUpwardsChange = (value) => {
        setValue("upwards", value);
        onFilterChange({ upwards: value, deleted: deletedValue }); 
    };

    const handleDeletedChange = (value) => {
        setValue("deleted", value);
        onFilterChange({ upwards: upwardsValue, deleted: value }); 
    };

    return (
        <div className="filter-container">
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
                                checked={upwardsValue === "true"}
                                onChange={() => handleUpwardsChange("true")}
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
                                checked={upwardsValue === "false"}
                                onChange={() => handleUpwardsChange("false")}
                            />
                        )}
                    />
                    Descendente
                </label>
            </div>

            <div className="deleted-options">
                <label className="deleted-option">
                    <Controller
                        name="deleted"
                        control={control}
                        render={({ field }) => (
                            <input
                                {...field}
                                type="radio"
                                value="false"
                                checked={deletedValue === "false"}
                                onChange={() => handleDeletedChange("false")}
                            />
                        )}
                    />
                    Activas
                </label>
                <label className="deleted-option">
                    <Controller
                        name="deleted"
                        control={control}
                        render={({ field }) => (
                            <input
                                {...field}
                                type="radio"
                                value="true"
                                checked={deletedValue === "true"}
                                onChange={() => handleDeletedChange("true")}
                            />
                        )}
                    />
                    Inhabilitadas
                </label>
            </div>
        </div>
    );
}

export default Filter;
