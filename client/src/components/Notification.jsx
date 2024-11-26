import { useEffect } from 'react';

function Notification({ message, type, onClose }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 2000); 

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div
            className={`fixed top-5 right-5 z-50 p-4 rounded-lg shadow-lg text-white 
                ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}
        >
            {message}
        </div>
    );
}

export default Notification;
