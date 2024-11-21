const Mensaje = ({ mensaje }) => {
    if (!mensaje) return null;

    const messageClass = mensaje.type === "exito" ? "mensaje-exito" : "mensaje-error";
    const messageText = mensaje.type === "exito" ? null : "Error: ";

    return (
        <div className={`mensaje-container ${messageClass}`}>
            {mensaje.text.split(",").map((data, index) => (
            <div key= {index}>
                <h3>{messageText} {data}</h3>

            </div>))}
        </div>
    );
};

export default Mensaje;
