const { verifyToken } = require("../utils/handleJwt")
const { usersModel, businessModel } = require("../models")

const authMiddleware = async (req, res, next) => {

    try{

        if (!req.headers.authorization) {
            res.status(401).send({ message: "Es necesario introducir el token" })
            return
        }

        // Nos llega la palabra reservada Bearer (es un estándar) y el Token, así que me quedo con la última parte
        const token = req.headers.authorization.split(' ').pop()

        //Del token, miramos en Payload (revisar verifyToken de utils/handleJwt)
        const dataToken = await verifyToken(token)

        if(!dataToken._id) {
            return res.status(401).send({ message: "El token no posee id" })
        }

        const user = await usersModel.findById(dataToken._id)
        req.user = user // Inyecto al user en la petición

        next()

    }
    catch(err){

        res.status(401).send({ message: "No ha iniciado sesión" })

    }

}

const bizMiddleware = async (req, res, next) => {

    try{

        if (!req.headers.authorization) {
            res.status(401).send({ message: "Es necesario introducir el token" })
            return
        }

        // Nos llega la palabra reservada Bearer (es un estándar) y el Token, así que me quedo con la última parte
        const token = req.headers.authorization.split(' ').pop()

        // Del token, miramos en Payload (revisar verifyToken de utils/handleJwt)
        const dataToken = await verifyToken(token)

        // Si el token tiene CIF
        if(!dataToken.CIF) {
            return res.status(401).send({ message: "El token no posee CIF" })
        }

        const biz = await businessModel.findOne({ CIF:dataToken.CIF })
        req.biz = biz // Inyecto al comercio en la petición

        next()

    }
    catch(err){

        res.status(401).send({ message: "No ha iniciado sesión" })

    }

}

// Una mezcla de ambos middlewares para esas ocasiones donde tanto un admin y una empresa pueden realizar la misma acción
const universalAuthMiddleware = async (req, res, next) => {
    try {

        if (!req.headers.authorization) {
            return res.status(401).send({ message: "Es necesario introducir el token" });
        }

        const token = req.headers.authorization.split(' ').pop();
        const dataToken = await verifyToken(token);

        if (dataToken._id) { // Caso de token de usuario
            const user = await usersModel.findById(dataToken._id);
            if (!user) return res.status(401).send({ message: "Usuario no encontrado" });
            req.user = user;
        } 
        else if (dataToken.CIF) { // Caso de token de empresa
            const biz = await businessModel.findOne({ CIF: dataToken.CIF });
            if (!biz) return res.status(401).send({ message: "Empresa no encontrada" });
            req.biz = biz;
        } 
        else {
            return res.status(401).send({ message: "Token inválido" });
        }

        next();
    } catch (err) {
        res.status(401).send({ message: "No ha iniciado sesión" });
    }
};

module.exports = {authMiddleware, bizMiddleware, universalAuthMiddleware}