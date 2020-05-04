const express = require("express");
const route = express.Router();

//Middleware
const auth = require("../middleware/auth");

// Controllers
const projectControllers = require("../controllers/projectController");

const { check } = require("express-validator");

route.post('/',
    auth,
    [check("name", "Name es obligatorio").not().isEmpty(),],
    projectControllers.project
);

route.get('/',
    auth,
    projectControllers.getProject
);

route.put('/:id',
    auth,
    [check("name", "Name es obligatorio").not().isEmpty(),],
    projectControllers.updateProject
);

route.delete('/:id',
    auth,
    projectControllers.deleteProject
);

module.exports = route;