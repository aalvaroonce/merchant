module.exports= {
    type: "object",
    required: ["name", "CIF", "direction", "email", "phone"],
    properties:{
        name: {
            type: "string",
            example: "Pedro Gonzalez"
        },
        CIF: {
            type: "string",
            example: "H03872347",
        },
        direction: {
            type: "string",
            example: "Calle Mayor, 25, Madrid", 
        },
        email: {
            type: "string",
            example: "pedro.gonzalez@correo.com", 
        },
        phone: {
            type: "string",
            example: "912345678",
        },
        password:{
            type: "string",
            example: "Contraseña123.",
        },
        role:{
            type: String,
            example: "biz"
        }
    },
}
