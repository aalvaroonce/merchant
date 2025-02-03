import { useEffect } from "react";

function Notification({ message, type, onClose }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 2000);

        return () => clearTimeout(timer);
    }, [onClose]);

    const isSuccess = type === "success";
    const baseStyles = "fixed inset-0 flex items-center justify-center z-50";
    const cardStyles =
        "p-6 rounded-lg text-center shadow-lg transform transition-all duration-300";
    const successStyles =
        "bg-green-100 text-green-700 border border-green-300";
    const errorStyles = "bg-red-100 text-red-700 border border-red-300";

    return (
        <div className={baseStyles}>
            <div
                className={`${cardStyles} ${
                    isSuccess ? successStyles : errorStyles
                }`}
            >
                <h2 className="text-lg font-bold">
                    {isSuccess ? "¡Éxito!" : "¡Error!"}
                </h2>
                <p className="mt-2">{message}</p>
            </div>
        </div>
    );
}

export default Notification;
