
const ModelTask = require("../models/Task");
const ModelProject = require("../models/Project");

const { validationResult } = require("express-validator");

exports.task = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })
    }

    const { headline } = req.body

    try {
        const idProject = await ModelProject.findById(headline);

        if (!idProject) return res.status(404).json({ msn: "Este proyecto no existe" });

        if (idProject.headline.toString() !== req.users.id) {
            return res.status(401).json({ msn: "Error de autentificación" })
        }

        const task = new ModelTask(req.body);

        await task.save();

        res.json({ task })

    } catch (error) {
        console.log(error);
        res.status(400).json({ msn: "No se ha podido crear el tarea" })
    }

}

exports.getTask = async (req, res) => {

    try {
        // this because it happens as {params: {value}}
        const { headline } = req.query;

        const idProject = await ModelProject.findById(headline);

        if (!idProject) return res.status(404).json({ msn: "Este proyecto no existe" });

        if (idProject.headline.toString() !== req.users.id) {
            return res.status(401).json({ msn: "Error de autentificación" })
        }

        // To sort the values
        const task = await ModelTask.find({ headline }).sort({ headline: -1 })
        res.json({ task })
    } catch (error) {
        console.log(error)
        res.status(400).json({ msn: "Error al obtener las taresas" })
    }
}

exports.updateTask = async (req, res) => {
    try {
        const { headline, name, state } = req.body

        let idTask = await ModelTask.findById(req.params.id);
        if (!idTask) return res.status(404).json({ msn: "Este tarea no existe" });

        const idProject = await ModelProject.findById(headline);

        if (!idProject) return res.status(404).json({ msn: "Este proyecto no existe" });

        if (idProject.headline.toString() !== req.users.id) {
            return res.status(401).json({ msn: "Error de autentificación" })
        }

        const newTask = {};

        newTask.name = name;
        newTask.state = state;

        idTask = await ModelTask.findByIdAndUpdate({ _id: req.params.id }, {
            $set: newTask
        }, {
            new: true
        })

        res.json(idTask);

    } catch (error) {
        console.log(error)
        res.status(400).json({ msn: "No se ha podido modificar la tarea" })
    }
}

exports.daleteTask = async (req, res) => {
    try {

        const { headline } = req.query

        let idTask = await ModelTask.findById(req.params.id);
        if (!idTask) return res.status(404).json({ msn: "Este tarea no existe" });

        const idProject = await ModelProject.findById(headline);

        if (!idProject) return res.status(404).json({ msn: "Este proyecto no existe" });

        if (idProject.headline.toString() !== req.users.id) {
            return res.status(401).json({ msn: "Error de autentificación" })
        }

        idTask = await ModelTask.findOneAndRemove({ _id: req.params.id })

        res.json(idTask);

    } catch (error) {
        console.log(error)
        res.status(400).json({ msn: "No se ha podido modificar la tarea" })
    }
}