// Definimos los modelos con las rutas
const models = {
    businessModel: require('./nosql/business'),
    webModel: require('./nosql/web'),
    usersModel: require('./nosql/users')
    }
    
// Exportamnos los modelos
module.exports = models