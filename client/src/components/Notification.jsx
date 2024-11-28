import { useEffect } from 'react';

function Notification({ message, type, onClose }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 2000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className={`bg-white p-4 rounded-lg shadow-lg max-w-md w-full text-center ${type === "success" ? "border-green-500 border" : "border-red-500 border"}`}>
                <p className={`text-lg font-semibold ${type === "success" ? "text-green-500" : "text-red-500"}`}>
                    {type === "success" ? "¡Éxito!" : "¡Error!"}
                </p>
                <p className="text-gray-600 mt-2">{message}</p>
            </div>
        </div>
    );
}

export default Notification;

