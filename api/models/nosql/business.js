// Importamos el modulo de mongoose para interactuar con la base de datos
const mongoose = require("mongoose")

// Importamos mongoose-delete para poder realizar un borrado lógico
const mongooseDelete = require("mongoose-delete")

//Definimos el esquema 
const businessScheme = new mongoose.Schema(
    {
        name: {
            type: String
        },
        CIF: {
            type: String,
            unique: true,
        },
        direction: {
            type: String,
        },
        email:{
            type: String,
            unique: true
        },
        phone:{
            type: String,
            unique: true,
        },
        password:{
            type: String
        },
        role:{
            type: String,
            default: "biz"
        }
    },
        {
        timestamps: true, 
        versionKey: false
    }

)

// Aplicamos el plugin de borrado lógico, sobreescribiendo los métodos habituales de mongoose para que trabajen con el borrado lógico
businessScheme.plugin(mongooseDelete, {overrideMethods: "all"})
module.exports = mongoose.model("business", businessScheme) // “business” es el nombre de la colección en mongoDB