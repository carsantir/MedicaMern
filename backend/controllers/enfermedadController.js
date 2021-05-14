const Enfermedad = require('../models/enfermedad.model')

addEnfermedad = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Enfermedad',
        })
    }

    const enfermedad = new Enfermedad(body)

    if (!enfermedad) {
        return res.status(400).json({ success: false, error: err })
    }

    enfermedad
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: enfermedad._id,
                message: 'Enfermedad created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Enfermedad not created!',
            })
        })
}

getEnfermedades = async (req, res) => {
    await Enfermedad.find({}, (err, enfermedad) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!enfermedad.length) {
            return res
                .status(404)
                .json({ success: false, error: `Enfermedads not found` })
        }
        Paciente.populate(enfermedad,{path: "paciente"},function(err,enfermedad){
            return res.status(200).json({ success: true, data: enfermedad })
        });
    }).catch(err => console.log(err))
}

updateEnfermedad = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Enfermedad.findOne({ _id: req.params.id }, (err, enfermedad) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Enfermedad not found!',
            })
        }
        enfermedad.tipoEnfermedad = body.tipoEnfermedad,
        enfermedad.nombre = body.nombre,
        enfermedad.descripcion = body.descripcion,

        enfermedad
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: enfermedad._id,
                    message: 'Enfermedad updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Enfermedad not updated!',
                })
            })
    })
}

getEnfermedadById = async (req, res) => {
    await Enfermedad.findOne({ _id: req.params.id }, (err, enfermedad) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!enfermedad) {
            return res
                .status(404)
                .json({ success: false, error: `Enfermedad not found` })
        }
        return res.status(200).json({ success: true, data: enfermedad })
    }).catch(err => console.log(err))
}

getEnfermedadByPacienteId = async (req, res) => {
    await Enfermedad.find({ paciente: req.params.id }, (err, enfermedad) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!enfermedad) {
            return res
                .status(404)
                .json({ success: false, error: `Enfermedad not found` })
        }
        Medico.populate(enfermedad,{path: "medico"},function(err,enfermedad){
            return res.status(200).json({ success: true, data: enfermedad })
        });
    }).catch(err => console.log(err))
}

getEnfermedadByMedicoId = async (req, res) => {
    await Enfermedad.find({ 'medico': req.params.id }, (err, enfermedad) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!enfermedad) {
            return res
                .status(404)
                .json({ success: false, error: `Enfermedad not found` })
        }
        Paciente.populate(enfermedad,{path: "paciente"},function(err,enfermedad){
            return res.status(200).json({ success: true, data: enfermedad })
        });
    }).catch(err => console.log(err))
}

deleteEnfermedad = async (req, res) => {
    await Enfermedad.findOneAndDelete({ _id: req.params.id }, (err, enfermedad) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!enfermedad) {
            return res
                .status(404)
                .json({ success: false, error: `Enfermedad not found` })
        }

        return res.status(200).json({ success: true, data: enfermedad })
    }).catch(err => console.log(err))
}

getTipoEnfermedad = async (req, res) => {
    Enfermedad1=Enfermedad.schema.path('tipoEnfermedad').enumValues
    return res.status(200).json({ success: true, data: Enfermedad1})
}




module.exports = {
    addEnfermedad,
    getEnfermedades,
    getEnfermedadById,
    getEnfermedadByMedicoId,
    getEnfermedadByPacienteId,
    updateEnfermedad,
    deleteEnfermedad,
    getTipoEnfermedad,
}