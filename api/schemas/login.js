module.exports= {
    type: "object",
    required: ["email", "password"],
    properties: {
    email: {
        type: "string",
        example: "miemail@google.com"
    },
    password: {
        type: "string",
        example: "micontraseña1234"
    },
    }
}