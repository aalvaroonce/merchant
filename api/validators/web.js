const { check } = require("express-validator")

const validateResults = require("../utils/handleValidator")

// Validación para obtener una web por su ID
const validatorGetWeb = [

    check("cif")
        .exists().withMessage("Es necesario introducir un cif")
        .notEmpty().withMessage("El cif no puede esatr vacio")
        .isString().withMessage("El cif debe ser un string")
        .isLength({min:9, max:9}).withMessage("El cif debe tener 9 caracteres"),

    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

// Validación para crear una web
const validatorCreateWeb = [
    check("businessCIF")
        .exists().withMessage("Es necesario introducir un businessCIF al que este asociado la web")
        .notEmpty().withMessage("Es necesario introducir un businessCIF al que este asociado la web")
        .isString().withMessage("El businessCIF debe ser un string"),
    
    check("city")
        .exists().withMessage("La ciudad es obligatoria")
        .notEmpty().withMessage("La ciudad no puede estar vacía")
        .isString().withMessage("La ciudad debe ser un string"),
    
    check("activity")
        .exists().withMessage("La actividad es obligatoria")
        .notEmpty().withMessage("La actividad no puede estar vacía")
        .isString().withMessage("La actividad debe ser un string"),

    check("heading")
        .exists().withMessage("El título es obligatorio")
        .notEmpty().withMessage("El título no puede estar vacío")
        .isString().withMessage("El título debe ser un string"),
    
    check("summary")
        .exists().withMessage("El resumen es obligatorio")
        .notEmpty().withMessage("El resumen no puede estar vacío")
        .isString().withMessage("El resumen debe ser un string"),
    
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

// Validación para modificar una web
const validatorUpdateWeb = [

    check("cif")
        .exists().withMessage("Es necesario introducir un cif")
        .notEmpty().withMessage("El cif no puede esatr vacio")
        .isString().withMessage("El cif debe ser un string")
        .isLength({min:9, max:9}).withMessage("El cif debe tener 9 caracteres"),

    check("businessCIF")
        .exists().withMessage("Es necesario introducir un businessCIF al que este asociado la web")
        .notEmpty().withMessage("Es necesario introducir un businessCIF al que este asociado la web")
        .isString().withMessage("El businessCIF debe ser un string"),

    check("city")
        .exists().withMessage("La ciudad es obligatoria")
        .notEmpty().withMessage("La ciudad no puede estar vacía")
        .isString().withMessage("La ciudad debe ser un string"),
    
    check("activity")
        .exists().withMessage("La actividad es obligatoria")
        .notEmpty().withMessage("La actividad no puede estar vacía")
        .isString().withMessage("La actividad debe ser un string"),

    check("heading")
        .exists().withMessage("El título es obligatorio")
        .notEmpty().withMessage("El título no puede estar vacío")
        .isString().withMessage("El título debe ser un string"),
    
    check("summary")
        .exists().withMessage("El resumen es obligatorio")
        .notEmpty().withMessage("El resumen no puede estar vacío")
        .isString().withMessage("El resumen debe ser un string"),
        
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

// Validación para añadir una imagen
const validatorAddImage = [

    check("cif")
        .exists().withMessage("Es necesario introducir un cif")
        .notEmpty().withMessage("El cif no puede esatr vacio")
        .isString().withMessage("El cif debe ser un string")
        .isLength({min:9, max:9}).withMessage("El cif debe tener 9 caracteres"),

    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

// Validación para añadir un texto
const validatorAddText = [

    check("cif")
        .exists().withMessage("Es necesario introducir un cif")
        .notEmpty().withMessage("El cif no puede estar vacio")
        .isString().withMessage("El cif debe ser un string")
        .isLength({min:9, max:9}).withMessage("El cif debe tener 9 caracteres"),

    check("textArray")
        .exists().withMessage("Es necesario introducir un texto")
        .notEmpty().withMessage("El texto no puede estar vacio")
        .isString().withMessage("El texto debe ser un string"),

    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

// Validador para añadir una review
const validatorAddReview = [

    check("cif")
        .exists().withMessage("Es necesario introducir un cif")
        .notEmpty().withMessage("El cif no puede estar vacio")
        .isString().withMessage("El cif debe ser un string")
        .isLength({min:9, max:9}).withMessage("El cif debe tener 9 caracteres"),

        
    check("scoring")
        .exists().withMessage("El scoring es obligatorio")
        .isInt({ min: 0, max: 5 }).withMessage("El puntaje debe ser un número entero entre 1 y 5"),

    check("reviewText")
        .optional()
        .notEmpty().withMessage("La review no puede estar vacia")
        .isString().withMessage("La review debe ser un string")

];

// Validación para borrar una web
const validatorDeleteWeb = [

    check("cif")
        .exists().withMessage("Es necesario introducir un cif")
        .notEmpty().withMessage("El cif no puede esatr vacio")
        .isString().withMessage("El cif debe ser un string")
        .isLength({min:9, max:9}).withMessage("El cif debe tener 9 caracteres"),

    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

// Validación para recuperar una web
const validatorRestoreWeb = [

    check("cif")
        .exists().withMessage("Es necesario introducir un cif")
        .notEmpty().withMessage("El cif no puede esatr vacio")
        .isString().withMessage("El cif debe ser un string")
        .isLength({min:9, max:9}).withMessage("El cif debe tener 9 caracteres"),

    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

module.exports = { validatorCreateWeb, validatorGetWeb, validatorUpdateWeb, validatorRestoreWeb, validatorAddImage, validatorAddText, validatorAddReview, validatorDeleteWeb }