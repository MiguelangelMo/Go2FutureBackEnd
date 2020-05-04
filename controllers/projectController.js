const Model = require("../models/Project");

const { validationResult } = require("express-validator");

exports.project = async (req, res) => {

    // check if it meets the characteristics
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })
    }

    try {

        const project = new Model(req.body);

        // save id creator (this comes out of the widdleware auth ln 11)
        project.headline = req.users.id

        project.save();
        res.json(project);

    } catch (error) {
        console.log(error)
        res.status(400).json({ msn: "No ha insertado el proyecto correctamente" })
    }
}

exports.getProject = async (req, res) => {
    try {
        const project = await Model.find({ headline: req.users.id })
        res.json({ project })
    } catch (error) {
        console.log(error)
        res.status(400).json({ msn: "No se han encontrado data" });
    }
}

exports.updateProject = async (req, res) => {

    // check if it meets the characteristics
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })
    }

    const { name } = req.body
    const newproject = {};

    if (name) newproject.name = name

    try {

        let idProject = await Model.findById(req.params.id)

        if (!idProject) return res.status(404).json({ msn: "Este proyecto no existe" })

        if (idProject.headline.toString() !== req.users.id) {
            return res.status(401).json({ msn: "Error de autentificación" })
        }

        idProject = await Model.findByIdAndUpdate({ _id: req.params.id }, {
            $set: newproject
        }, {
            new: true
        })

        res.json(idProject);

    } catch (error) {
        console.log(error)
        res.status(400).json({ msn: "Error al modificar los proyecto" });
    }
}

exports.deleteProject = async (req, res) => {

    try {

        let idProject = await Model.findById(req.params.id)

        if (!idProject) return res.status(404).json({ msn: "Este proyecto no existe" })

        if (idProject.headline.toString() !== req.users.id) {
            return res.status(401).json({ msn: "Error de autentificación" })
        }

        idProject = await Model.findOneAndRemove({ _id: req.params.id })

        res.json(idProject);

    } catch (error) {
        console.log(error)
        res.status(400).json({ msn: "Error al eliminar los proyecto" });
    }
}
