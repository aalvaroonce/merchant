'use client';

import { useForm, Controller } from "react-hook-form";

function Filter({ onFilterChange }) {
    const { control, setValue, watch } = useForm({
        defaultValues: {
            upwards: "true",
        },
    });

    const upwardsValue = watch("upwards"); 

    const handleUpwardsChange = (value) => {
        setValue("upwards", value); 
        onFilterChange({ upwards: value }); 
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
        </div>
    );
}

export default Filter;
