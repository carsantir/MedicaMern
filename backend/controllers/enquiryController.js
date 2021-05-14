const Consulta = require('../models/enquiry.model')
const Paciente = require('../models/user.model')
const Medico = require('../models/medic.model')

getEnquiries = async (req, res) => {
    await Consulta.find({}, (err, enquiries) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!enquiries.length) {
            return res
                .status(404)
                .json({ success: false, error: `Enquiry not found` })
        }
        Medico.populate(enquiries,{path: "medico"},Paciente.populate(enquiries,{path: "paciente"},function(err,enquiries){
            return res.status(200).json({ success: true, data: enquiries })
        }));
    }).catch(err => console.log(err))
}
addEnquiries = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a enquiry',
        })
    }

    const enquiry = new Consulta(body)

    if (!enquiry) {
        return res.status(400).json({ success: false, error: err })
    }

    enquiry
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: enquiry._id,
                message: 'Enquiry created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Enquiry not created!',
            })
        })
}

updateConsulta = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Consulta.findOne({ _id: req.params.id }, (err, consulta) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Consulta not found!',
            })
        }
        consulta.medico = body.medico

        consulta
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: consulta._id,
                    message: 'Consulta updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Consulta not updated!',
                })
            })
    })
}

getConsultaById = async (req, res) => {
    await Consulta.findOne({ _id: req.params.id }, (err, consulta) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!consulta) {
            return res
                .status(404)
                .json({ success: false, error: `Consulta not found` })
        }
        return res.status(200).json({ success: true, data: consulta })
    }).catch(err => console.log(err))
}

getConsultaByPacienteId = async (req, res) => {
    await Consulta.find({ 'paciente': req.params.id }, (err, consulta) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!consulta) {
            return res
                .status(404)
                .json({ success: false, error: `Consulta not found` })
        }
        Medico.populate(consulta,{path: "medico"},function(err,consulta){
            return res.status(200).json({ success: true, data: consulta })
        });
    }).catch(err => console.log(err))
}

getConsultaByMedicoId = async (req, res) => {
    await Consulta.find({ 'medico': req.params.id }, (err, consulta) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!consulta) {
            return res
                .status(404)
                .json({ success: false, error: `Consulta not found` })
        }
        Paciente.populate(consulta,{path: "paciente"},function(err,consulta){
            return res.status(200).json({ success: true, data: consulta })
        });
    }).catch(err => console.log(err))
}

deleteConsulta = async (req, res) => {
    await Consulta.findOneAndDelete({ _id: req.params.id }, (err, consulta) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!consulta) {
            return res
                .status(404)
                .json({ success: false, error: `consulta not found` })
        }

        return res.status(200).json({ success: true, data: consulta })
    }).catch(err => console.log(err))
}

module.exports = {
    getEnquiries,
    addEnquiries,
    updateConsulta,
    getConsultaById,
    deleteConsulta,
    getConsultaByPacienteId,
    getConsultaByMedicoId,
}