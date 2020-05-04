const Model = require("../models/Users");

// encryp fields
const bcryptjs = require("bcryptjs");

// validate fields 
const { validationResult } = require("express-validator");

// JWT
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {

    // check if it meets the characteristics
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body;

    try {
        let users = await Model.findOne({ email });

        if (users) {
            return res.status(400).json({ msg: "Usuario ya resgistrado" });
        }

        users = new Model(req.body);

        // Encrypt
        const salt = await bcryptjs.genSalt(10);
        users.password = await bcryptjs.hash(password, salt);

        // Save
        await users.save();

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
        res.status(400).json({ msg: "Ha ocurrido un error al insertar" });
    }
}
