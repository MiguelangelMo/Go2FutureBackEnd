const express = require("express");

const route = express.Router();

const { check } = require("express-validator");

const auth = require("../middleware/auth");

const taskController = require("../controllers/taskController");

route.post('/',
    auth,
    [check("name", "Tarea es obligatorio").not().isEmpty(),
    check("headline", "Proyecto es obligatorio").not().isEmpty(),],
    taskController.task
)
route.get('/',
    auth,
    taskController.getTask
)
//params
route.put('/:id',
    auth,
    //[check("name", "Tarea es obligatorio").not().isEmpty(),
    //check("headline", "Proyecto es obligatorio").not().isEmpty(),],
    taskController.updateTask
)
//params
route.delete('/:id',
    auth,
    //[check("name", "Tarea es obligatorio").not().isEmpty(),
    //check("headline", "Proyecto es obligatorio").not().isEmpty(),],
    taskController.daleteTask
)

module.exports = route;