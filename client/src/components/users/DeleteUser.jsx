'use client';

import { useState } from 'react';
import Mensaje from '../Mensaje';
import { deleteUser } from './utils/handleDeleteUser';

export default function DeleteUser() {
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

    const handleConfirmAction = async () => {
        try {
            const result = await deleteUser(action); 
            setMensaje({ text: result.message , type: "exito" });
            setIsModalOpen(false); 
        } catch (error) {
            setMensaje({ text: error.message , type: "error" });
            setIsModalOpen(false); 
        }
    };

    return (
        <>
            <div className="flex gap-4">
                <button
                    onClick={() => openModal(true)}
                    className="px-6 py-2 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition-all"
                >
                    Inhabilitar Cuenta
                </button>
                <button
                    onClick={() => openModal(false)}
                    className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all"
                >
                    Borrar Cuenta
                </button>
            </div>

            {mensaje && <Mensaje mensaje={mensaje} />}

            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
                    <div className="bg-white text-gray-800 p-8 rounded-lg shadow-2xl w-96">
                        <h2 className="text-xl font-bold mb-4">
                            {action
                                ? "¿Estás seguro de que deseas inhabilitar tu cuenta?"
                                : "¿Estás seguro de que deseas borrar tu cuenta?"}
                        </h2>
                        <p className="text-gray-600 mb-6">
                            {action
                                ? "Si más adelante quieres recuperarla, deberás ponerte en contacto con el administrador."
                                : "Esta acción es permanente y no se puede deshacer."}
                        </p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md font-medium hover:bg-gray-400 transition-all"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleConfirmAction}
                                className={`px-4 py-2 font-medium rounded-md text-white ${
                                    action ? "bg-yellow-500 hover:bg-yellow-600" : "bg-red-500 hover:bg-red-600"
                                } transition-all`}
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
