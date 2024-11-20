// Importamos el modulo de mongoose para interactuar con la base de datos
const mongoose = require("mongoose")

// Importamos mongoose-delete para poder realizar un borrado lógico
const mongooseDelete = require("mongoose-delete")

//Definimos el esquema 
const webScheme = new mongoose.Schema(
    {
        businessCIF: {
            type: String,
            unique: true 
        },
        city: {
            type: String
        },
        activity: {
            type: String,
        },
        heading: {
            type: String,
        },
        summary:{
            type: String,
        },
        textArray: {
            type: [String], // Array de textos
            default: []
        },
        imageArray: {
            type: [String], // Array de URLs o rutas de imágenes
            default: [],
        },
        reviews: {
            scoring: {
                type: Number,
                default: 0
            },
            totalRatings: {
                type: Number,
                default: 0
            },
            reviewTexts: [
                {
                    userId: {
                        type: mongoose.Schema.Types.ObjectId, // Id de referencia al usuario
                        required: true
                    },
                    scoring: {
                        type: Number,
                        required: true
                    },
                    reviewText: {
                        type: String,
                        default: ""
                    }
                }
            ]
        }
    },
    {
        timestamps: true, 
        versionKey: false
    }
);


// Aplicamos el plugin de borrado lógico, sobreescribiendo los métodos habituales de mongoose para que trabajen con el borrado lógico
webScheme.plugin(mongooseDelete, {overrideMethods: "all"})
module.exports = mongoose.model("web", webScheme) // web es el nombre de la colección en mongoDB