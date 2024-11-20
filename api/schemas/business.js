module.exports= {
    type: "object",
    required: ["name", "CIF", "direction", "email", "phone", "pageID"],
    properties:{
        name: {
            type: "string",
            example: "Pedro Gonzalez"
        },
        CIF: {
            type: "string",
            example: "H03872347", // Ejemplo de CIF
        },
        direction: {
            type: "string",
            example: "Calle Mayor, 25, Madrid", // Ejemplo de dirección
        },
        email: {
            type: "string",
            example: "pedro.gonzalez@correo.com", // Ejemplo de correo electrónico
        },
        phone: {
            type: "string",
            example: "912345678", // Ejemplo de número de teléfono
        },
        pageID: {
            type: "number",
            example: 123, // Ejemplo de ID de página
          },
    },
}
