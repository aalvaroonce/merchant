'use client';

import { useState } from 'react';
import Mensaje from '../Mensaje';

export default function DeleteWeb({ onConfirmAction }) {
    const [mensaje, setMensaje] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [action, setAction] = useState(null);

    const openModal = (logic) => {
        setAction(logic);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <button onClick={() => openModal(true)} className="btn btn-warning">
                Inhabilitar Web
            </button>
            <button onClick={() => openModal(false)} className="btn btn-danger">
                Borrar Web
            </button>

            {mensaje && <Mensaje mensaje={mensaje} />}

            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-lg font-semibold mb-4">
                            {action
                                ? "¿Estás seguro de que deseas inhabilitar tu cuenta?"
                                : "¿Estás seguro de que deseas borrar tu cuenta?"}
                        </h2>
                        <p className="mb-4">
                            {action
                                ? "Si más adelante quieres recuperarla, deberás ponerte en contacto con el administrador."
                                : "Esta acción es permanente y no se puede deshacer."}
                        </p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 bg-gray-300 text-white rounded-md"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={() => onConfirmAction(action, setMensaje, setIsModalOpen)}
                                className="px-4 py-2 bg-red-500 text-white rounded-md"
                            >
                                {action ? "Inhabilitar" : "Borrar"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
