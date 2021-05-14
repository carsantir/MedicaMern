const Cita = require('../models/cita.model')

addCitas = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a cita',
        })
    }

    const cita = new Cita(body)

    if (!cita) {
        return res.status(400).json({ success: false, error: err })
    }

    cita
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: cita._id,
                message: 'cita created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'cita not created!',
            })
        })
}

getCitas = async (req, res) => {
    await Cita.find({}, (err, citas) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!citas.length) {
            return res
                .status(404)
                .json({ success: false, error: `citas not found` })
        }
        Paciente.populate(citas,{path: "paciente"},function(err,citas){
            return res.status(200).json({ success: true, data: citas })
        });
    }).catch(err => console.log(err))
}

updateCita = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Cita.findOne({ _id: req.params.id }, (err, cita) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'cita not found!',
            })
        }
        cita.fecha = body.fecha
        cita.ciudad = body.ciudad
        cita.centroMedico = body.centroMedico
        cita.motivo = body.motivo

        cita
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: cita._id,
                    message: 'cita updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'cita not updated!',
                })
            })
    })
}

getCitaById = async (req, res) => {
    await Cita.findOne({ _id: req.params.id }, (err, cita) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!cita) {
            return res
                .status(404)
                .json({ success: false, error: `cita not found` })
        }
        return res.status(200).json({ success: true, data: cita })
    }).catch(err => console.log(err))
}

getCitaByPacienteId = async (req, res) => {
    await Cita.find({ 'paciente': req.params.id }, (err, cita) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!cita) {
            return res
                .status(404)
                .json({ success: false, error: `cita not found` })
        }
        Medico.populate(cita,{path: "medico"},function(err,cita){
            return res.status(200).json({ success: true, data: cita })
        });
    }).catch(err => console.log(err))
}

getCitaByMedicoId = async (req, res) => {
    await Cita.find({ 'medico': req.params.id }, (err, cita) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!cita) {
            return res
                .status(404)
                .json({ success: false, error: `cita not found` })
        }
        Paciente.populate(cita,{path: "paciente"},function(err,cita){
            return res.status(200).json({ success: true, data: cita })
        });
    }).catch(err => console.log(err))
}

deleteCita = async (req, res) => {
    await Cita.findOneAndDelete({ _id: req.params.id }, (err, cita) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!cita) {
            return res
                .status(404)
                .json({ success: false, error: `cita not found` })
        }

        return res.status(200).json({ success: true, data: cita })
    }).catch(err => console.log(err))
}

getTipoCita = async (req, res) => {
    cita1=Cita.schema.path('tipoCita').enumValues
    return res.status(200).json({ success: true, data: cita1})
}

getTipoAnalisis = async (req, res) => {
    cita1=Cita.schema.path('tipoAnalisis').enumValues
    return res.status(200).json({ success: true, data: cita1})
  
}



module.exports = {
    addCitas,
    getCitas,
    getCitaById,
    getCitaByMedicoId,
    getCitaByPacienteId,
    updateCita,
    deleteCita,
    getTipoCita,
    getTipoAnalisis,
}