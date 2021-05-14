const Consulta = require('../models/enquiry.model')
const Paciente = require('../models/user.model')
const Medico = require('../models/medic.model')

getMedics = async (req, res) => {
    await Medico.find({}, (err, medics) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!medics.length) {
            return res
                .status(404)
                .json({ success: false, error: `medics not found` })
        }
            return res.status(200).json({ success: true, data: medics })
    }).catch(err => console.log(err))
}

getMedicById = async (req, res) => {
    await Medico.findOne({ _id: req.params.id }, (err, medico) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!medico) {
            return res
                .status(404)
                .json({ success: false, error: `medico not found` })
        }
        return res.status(200).json({ success: true, data: medico })
    }).catch(err => console.log(err))
}

getTipoMedico = async (req, res) => {
    Medico1=Medico.schema.path('sector').enumValues
    return res.status(200).json({ success: true, data: Medico1})
}

getMedicosFamilia = async (req, res) => {
    await Medico.find({'sector':'Familia'}, (err, medics) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!medics.length) {
            return res
                .status(404)
                .json({ success: false, error: `medics not found` })
        }
            return res.status(200).json({ success: true, data: medics })
    }).catch(err => console.log(err))
}

getPacientesByMedicoId = async (req, res) => {
    await Paciente.find({ medico: req.params.id }, (err, medico) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!medico) {
            return res
                .status(404)
                .json({ success: false, error: `medico not found` })
        }
        return res.status(200).json({ success: true, data: medico })
    }).catch(err => console.log(err))
}


module.exports = {
    getMedics,
    getMedicById,
    getTipoMedico,
    getMedicosFamilia,
    getPacientesByMedicoId,
}