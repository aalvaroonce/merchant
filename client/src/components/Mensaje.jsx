const Mensaje = ({ mensaje }) => {
    if (!mensaje) return null;

    const isSuccess = mensaje.type === "exito"? true: false;
    const baseStyles = "p-4 rounded-lg text-center text-sm font-medium shadow-md";
    const successStyles = "bg-green-100 text-green-700 border border-green-300";
    const errorStyles = "bg-red-100 text-red-700 border border-red-300";

    return (
        <div
            className={`${baseStyles} ${isSuccess ? successStyles : errorStyles} mt-4`}
        >
            {mensaje.text.split(",").map((data, index) => (
                <p key={index}>
                    {isSuccess ? "" : "Error: "} {data.trim()}
                </p>
            ))}
        </div>
    );
};

export default Mensaje;
