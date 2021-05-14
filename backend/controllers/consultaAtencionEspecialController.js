const ConsultaAtencionEspecial = require('../models/consultaAtencionEspecial.model')

addConsultaAtencionEspecial = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a addConsultaAtencionEspecial',
        })
    }
    const consultaAtencionEspecial = new ConsultaAtencionEspecial(body)

    if (!consultaAtencionEspecial) {
        return res.status(400).json({ success: false, error: err })
    }

    consultaAtencionEspecial
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: consultaAtencionEspecial._id,
                message: 'consultaAtencionEspecial created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'consultaAtencionEspecial not created!',
            })
        })
}

getConsultasAtencionEspecial = async (req, res) => {
    await ConsultaAtencionEspecial.find({"finalizada":false}, (err, consultaAtencionEspecial) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!consultaAtencionEspecial.length) {
            return res
                .status(404)
                .json({ success: false, error: `consultaAtencionEspecial not found` })
        }
        Paciente.populate(consultaAtencionEspecial,{path: "paciente"},function(err,consultaAtencionEspecial){
            return res.status(200).json({ success: true, data: consultaAtencionEspecial })
        });
    }).catch(err => console.log(err))
}

updateConsultaAtencionEspecial = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    ConsultaAtencionEspecial.findOne({ _id: req.params.id }, (err, consultaAtencionEspecial) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'consultaAtencionEspecial not found!',
            })
        }
        consultaAtencionEspecial.finalizada = true,

        consultaAtencionEspecial
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: consultaAtencionEspecial._id,
                    message: 'consultaAtencionEspecial updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'consultaAtencionEspecial not updated!',
                })
            })
    })
}

getConsultaAtencionEspecialById = async (req, res) => {
    await ConsultaAtencionEspecial.findOne({ _id: req.params.id }, (err, consultaAtencionEspecial) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!consultaAtencionEspecial) {
            return res
                .status(404)
                .json({ success: false, error: `consultaAtencionEspecial not found` })
        }
        return res.status(200).json({ success: true, data: consultaAtencionEspecial })
    }).catch(err => console.log(err))
}

getConsultaAtencionEspecialByPacienteId = async (req, res) => {
    await ConsultaAtencionEspecial.find({ 'paciente': req.params.id,"finalizada":false }, (err, consultaAtencionEspecial) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!consultaAtencionEspecial) {
            return res
                .status(404)
                .json({ success: false, error: `consultaAtencionEspecial not found` })
        }
        Medico.populate(consultaAtencionEspecial,{path: "medico"},function(err,consultaAtencionEspecial){
            return res.status(200).json({ success: true, data: consultaAtencionEspecial })
        });
    }).catch(err => console.log(err))
}

getConsultaAtencionEspecialByMedicoId = async (req, res) => {
    await ConsultaAtencionEspecial.find({ 'medico': req.params.id,"finalizada":false }, (err, consultaAtencionEspecial) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!consultaAtencionEspecial) {
            return res
                .status(404)
                .json({ success: false, error: `consultaAtencionEspecial not found` })
        }
        Paciente.populate(consultaAtencionEspecial,{path: "paciente"},function(err,consultaAtencionEspecial){
            return res.status(200).json({ success: true, data: consultaAtencionEspecial })
        });
    }).catch(err => console.log(err))
}





module.exports = {
    addConsultaAtencionEspecial,
    getConsultasAtencionEspecial,
    updateConsultaAtencionEspecial,
    getConsultaAtencionEspecialById,
    getConsultaAtencionEspecialByPacienteId,
    getConsultaAtencionEspecialByMedicoId,
}