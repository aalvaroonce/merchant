const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

// Validador para obtener una empresa por su CIF
const validatorGetBiz = [
    check("cif")
        .exists().withMessage("El CIF es obligatorio")
        .notEmpty().withMessage("El CIF no puede estar vacío")
        .isString().withMessage("El CIF debe ser un string")
        .isLength({ min: 9, max: 9 }).withMessage("El CIF debe tener exactamente 9 caracteres"),

    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

// Validador para crear un nuevo business
const validatorCreateBiz = [
    check("name")
        .exists().withMessage("El nombre es obligatorio")
        .notEmpty().withMessage("El nombre no puede estar vacío")
        .isString().withMessage("El nombre debe ser un string"),
    
    check("CIF")
        .exists().withMessage("El CIF es obligatorio")
        .notEmpty().withMessage("El CIF no puede estar vacío")
        .isString().withMessage("El CIF debe ser un string")
        .isLength({ min: 9, max: 9 }).withMessage("El CIF debe tener exactamente 9 caracteres"),
    
    check("direction")
        .exists().withMessage("La dirección es obligatoria")
        .notEmpty().withMessage("La dirección no puede estar vacía")
        .isString().withMessage("La dirección debe ser un string"),
    
    check("email")
        .exists().withMessage("El email es obligatorio")
        .notEmpty().withMessage("El email no puede estar vacío")
        .isEmail().withMessage("Debe ser un email válido"),

    check("phone")
        .exists().withMessage("El número de teléfono es obligatorio")
        .notEmpty().withMessage("El número de teléfono no puede estar vacío")
        .isMobilePhone().withMessage("Debe ser un número de móvil válido"),
    
    check("password")
        .exists().withMessage("La contraseña es requerida")
        .notEmpty().withMessage("El campo contraseña no puede estar vacío")
        .isLength({ min: 8, max: 64 }).withMessage("La contraseña debe tener entre 8 y 64 caracteres")
        .matches(/[A-Z]/).withMessage("La contraseña debe contener al menos una letra mayúscula")
        .matches(/[a-z]/).withMessage("La contraseña debe contener al menos una letra minúscula")
        .matches(/[0-9]/).withMessage("La contraseña debe contener al menos un número")
        .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage("La contraseña debe contener al menos un carácter especial"),

    
    (req, res, next) => validateResults(req, res, next)
];

const validatorMail = [
    check("subject").exists().notEmpty(),
    check("text").exists().notEmpty(),    
    check("to").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }    
]

// Validador para actualizar una empresa existente
const validatorUpdateBiz = [
    check("cif")
        .exists().withMessage("El CIF es obligatorio")
        .notEmpty().withMessage("El CIF no puede estar vacío")
        .isLength({ min: 9, max: 9 }).withMessage("El CIF debe tener exactamente 9 caracteres"),

    check("name")
        .exists().withMessage("El nombre es obligatorio")
        .notEmpty().withMessage("El nombre no puede estar vacío")
        .isString().withMessage("El nombre debe ser un string"),

    check("direction")
        .exists().withMessage("La dirección es obligatoria")
        .notEmpty().withMessage("La dirección no puede estar vacía")
        .isString().withMessage("La dirección debe ser un string"),
    
    check("email")
        .exists().withMessage("El email es obligatorio")
        .notEmpty().withMessage("El email no puede estar vacío")
        .isEmail().withMessage("Debe ser un email válido"),

    check("phone")
        .exists().withMessage("El número de teléfono es obligatorio")
        .notEmpty().withMessage("El número de teléfono no puede estar vacío")
        .isMobilePhone().withMessage("Debe ser un número de móvil válido"),

    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

// Validador para eliminar una empresa (borrado lógico)
const validatorDeleteBiz = [
    check("cif")
        .exists().withMessage("El CIF es obligatorio")
        .notEmpty().withMessage("El CIF no puede estar vacío")
        .isString().withMessage("El CIF debe ser un string")
        .isLength({ min: 9, max: 9 }).withMessage("El CIF debe tener exactamente 9 caracteres"),

    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

// Validador para restaurar una empresa (borrado lógico)
const validatorRestoreBiz = [
    check("cif")
        .exists().withMessage("El CIF es obligatorio")
        .notEmpty().withMessage("El CIF no puede estar vacío")
        .isString().withMessage("El CIF debe ser un string")
        .isLength({ min: 9, max: 9 }).withMessage("El CIF debe tener exactamente 9 caracteres"),

    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

module.exports = { 
    validatorCreateBiz, validatorMail,
    validatorGetBiz, 
    validatorUpdateBiz, validatorRestoreBiz, 
    validatorDeleteBiz 
};
