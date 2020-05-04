const express = require("express");
const route = express.Router();
const { check } = require("express-validator");

// Controllers
const userControllers = require("../controllers/userControllers");

route.post('/',
    [
        check("name", "Nombre es obligatorio").not().isEmpty(),
        check("lastName", "Apellido es obligatorio").not().isEmpty(),
        check("email", "Agrega un email valido").isEmail(),
        check("password", "El password debe ser minimo 8 caracteres").isLength({ min: 5 }),
    ],
    userControllers.createUser
);

module.exports = route;