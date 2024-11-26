import { useState } from 'react';
import sendEmail from './utils/handleSendEmail';
import Notification from '../Notification';
import FormularioEmail from '../formularios/FormularioEmail';

function EmailModal({ user, onClose }) {
    const [notification, setNotification] = useState(null);

    const handleSendEmail = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const emailData = {
            subject: formData.get('subject'),
            text: formData.get('text'),
            to: user.email,
        };

        try {
            await sendEmail(emailData);
            setNotification({ message: 'Correo enviado con éxito.', type: 'success' });
            setTimeout(onClose, 2000); // Cerrar el modal después de 2 segundos
        } catch (error) {
            setNotification({ message: 'Error al enviar el correo.', type: 'error' });
            console.error(error);
        }
    };

    return (
        <div className="modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="modal-content bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-lg font-bold mb-4">Enviar Email</h2>
                <FormularioEmail onSubmit={{ submit: handleSendEmail, cancel: onClose }} />
            </div>

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

export default EmailModal;
