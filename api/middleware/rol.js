// Middleware para verificar roles específicos
const checkRol = (roles) => (req, res, next) => { 
    try {
        const { user } = req; // Extraemos el usuario de la solicitud
        const userRol = user.role; // Obtenemos el rol del usuario
        const checkValueRol = roles.includes(userRol); // Verificamos si el rol del usuario está permitido

        if (checkValueRol) { // Si el rol es permitido, continúa con la siguiente función
            return next();
        } 

        return res.status(403).send({ message: "No tiene derecho a hacer esta acción" }); // Rol no permitido

    } catch (err) {
        res.status(500).send({ message: "Error al comprobar el rol" }); // Error en la verificación de roles
    }
};

// Middleware para verificar cambios de rol del usuario
const checkUserRol = (roles) => (req, res, next) => {
    try {
        const { user } = req; // Extraemos el usuario de la solicitud
        const { body } = req; // Extraemos el cuerpo de la solicitud
        const rol = body.role; // Extraemos el rol actual

        // Permitir si el rol no es insertado en el body o si el rol del usuario es admin
        if (rol === undefined || roles.includes(user.role)) {
            return next();
        }
        return res.status(403).send({ message: "No puede cambiar su propio rol" }); // Bloquea el cambio de rol propio

    } catch (err) {
        res.status(500).send({ message: "Error al comprobar el usuario" });
    }
};

// Middleware para verificar ID de usuario o rol
const checkUserId = (roles) => (req, res, next) => {
    try {
        const { user } = req; // Extraemos el usuario de la solicitud
        const { id } = req.params; // ID de la ruta

        // Permitir si el ID coincide o si el rol es permitido
        if (user._id == id || roles.includes(user.role)) { 
            return next();
        } 
        return res.status(403).send({ message: "No tiene derecho a realizar esta acción" }); // No autorizado

    } catch (err) {
        res.status(500).send({ message: "Error al comprobar el id del usuario" });
    }
};

// Middleware para verificar el CIF del negocio
const checkBiz = (req, res, next) => {
    try {
        const { biz } = req; // Extraemos el comercio de la solicitud
        const { cif } = req.params; // CIF de la ruta

        // Permitir si el CIF coincide
        if (biz.CIF === cif) { 
            return next();
        }

        return res.status(403).send({ message: "No tiene derecho a realizar esta acción" }); // Bloquea acceso si no coincide

    } catch (err) {
        res.status(500).send({ message: "Error al comprobar el id del usuario" });
    }
};

// Middleware para verificar si es un admin o una empresa a si misma
const checkBizOrAdmin = (roles) => (req, res, next) => {
    const {user} = req;
    const {biz} = req;
    const { cif } = req.params;

    if (roles.includes(user.role) || biz.CIF === cif) {
        return next();
    }

    return res.status(403).send({ message: "No tiene permisos para realizar esta acción" });
};

// Exportamos las funciones middleware
module.exports = { checkRol, checkUserRol, checkUserId, checkBiz, checkBizOrAdmin };
