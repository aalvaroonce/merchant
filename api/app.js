// Importamos express
const express= require("express");
const swaggerUi = require("swagger-ui-express")
const morganBody = require("morgan-body")
const loggerStream = require("./utils/handleLogger.js")
const swaggerSpecs = require("./docs/swagger.js")
const cors = require("cors")
const path = require("path")

// Importamos dotenv
require("dotenv").config();

// Importamos la conexión con la base de datos
const dbConnect= require("./config/mongo.js")
const app= express()

// Configurar la ruta estática para los archivos almacenados
app.use('/storage', express.static(path.join(__dirname, 'storage')));

// Middleware para JSON
app.use(express.json())

app.use(cors())
// Definimos el swagger en la /api-docs
app.use("/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpecs)
)


// Definimos el morgan body
morganBody(app, {

    logResBody:true,
    noColors: true, //limpiamos el String de datos lo máximo posible antes de mandarlo a Slack
    skip: function(req, res) { //Solo enviamos errores (4XX de cliente y 5XX de servidor)

        return res.statusCode < 400
    },
    stream: loggerStream
})

// Montar las rutas
app.use("/api", require("./routes"))  

// Seleccionamos el puerto
const port= process.env.PORT || 3000

// Hacemos que el servidor escuche las solicitudes
app.listen(port, ()=>{
    console.log(`Servidor escuchando en el puerto ${port}`)
    dbConnect()
})

module.exports = app
