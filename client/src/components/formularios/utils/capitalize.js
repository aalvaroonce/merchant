function capitalize(string) {
    if (typeof string !== 'string' || string.length === 0) {
        return string;
    }
    const trimmedString = string.trim(); // Elimina espacios al inicio y al final
    return trimmedString.charAt(0).toUpperCase() + trimmedString.slice(1).toLowerCase();
}

export default capitalize