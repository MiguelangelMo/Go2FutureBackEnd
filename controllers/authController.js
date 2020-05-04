const Model = require("../models/Users");

// encryp fields
const bcryptjs = require("bcryptjs");

// validate fields 
const { validationResult } = require("express-validator");

// JWT
const jwt = require("jsonwebtoken");

exports.auth = async (req, res) => {

    // check if it meets the characteristics
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body;

    try {
        let users = await Model.findOne({ email });
        if (!users) res.status(400).json({ msg: "Usuario no existente!" })

        const passExist = await bcryptjs.compare(password, users.password);

        if (!passExist) res.status(400).json({ msg: "Contraseña incorrecta!" })

        // JWT(payload)
        const payload = {
            users: {
                id: users.id
            }
        }

        // JWT(Token firm)
        jwt.sign(payload, process.env.token, {
            expiresIn: 3600 // 1hr
        }, (error, token) => {
            if (error) throw error;
            res.json({ token });
        });

    } catch (error) {
        console.log(error)
        res.status(400).json({ msg: "El usuario no es existente" });
    }
}

exports.getAuth = async (req, res) => {
    try {
        let users = await Model.findById(req.users.id).select("-password");
        res.json({ users })
    } catch (error) {
        console.log(error)
        res.status(404).json({ msg: "Usuario no existente" })
    }
}