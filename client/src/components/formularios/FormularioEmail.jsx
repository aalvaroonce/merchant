function FormularioEmail({ onSubmit }) {
    return (
        <form onSubmit={onSubmit}>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2" htmlFor="subject">
                    Asunto
                </label>
                <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2" htmlFor="text">
                    Mensaje
                </label>
                <textarea
                    id="text"
                    name="text"
                    rows="4"
                    required
                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                ></textarea>
            </div>
            <div className="flex justify-end">
                <button
                    type="button"
                    className="mr-4 bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
                    onClick={onSubmit.cancel}
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                    Enviar
                </button>
            </div>
        </form>
    );
}

export default FormularioEmail;
