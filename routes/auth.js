
const express = require("express");
const route = express.Router();
const { check } = require("express-validator");

const auth = require("../middleware/auth");

// Controllers
const authControllers = require("../controllers/authController");

route.post('/',
    [
        check("email", "Agrega un email valido").isEmail(),
        check("password", "El password debe ser minimo 5 caracteres").isLength({ min: 5 }),
    ],
    authControllers.auth
);

route.get('/',
    auth,
    authControllers.getAuth
)

module.exports = route;
