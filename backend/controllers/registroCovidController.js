const RegistroCovid = require('../models/registroCovid.model')
const Paciente = require('../models/user.model')
const Medico = require('../models/medic.model')

getRegistrosCovid = async (req, res) => {
    await RegistroCovid.find({}, (err, registroCovid) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!registroCovid.length) {
            return res
                .status(404)
                .json({ success: false, error: `registroCovid not found` })
        }
        Medico.populate(enquiries,{path: "medico"},Paciente.populate(enquiries,{path: "paciente"},function(err,registroCovid){
            return res.status(200).json({ success: true, data: registroCovid })
        }));
    }).catch(err => console.log(err))
}
addRegistroCovid = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a enquiry',
        })
    }

    const registroCovid = new RegistroCovid(body)

    if (!registroCovid) {
        return res.status(400).json({ success: false, error: err })
    }

    registroCovid
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: registroCovid._id,
                message: 'registroCovid created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'registroCovid not created!',
            })
        })
}

getRegistroCovidById = async (req, res) => {
    await RegistroCovid.findOne({ _id: req.params.id }, (err, registroCovid) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!registroCovid) {
            return res
                .status(404)
                .json({ success: false, error: `registroCovid not found` })
        }
        return res.status(200).json({ success: true, data: registroCovid })
    }).catch(err => console.log(err))
}

getRegistroCovidByPacienteId = async (req, res) => {
    await RegistroCovid.find({ 'paciente': req.params.id }, (err, registroCovid) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!registroCovid) {
            return res
                .status(404)
                .json({ success: false, error: `registroCovid not found` })
        }
        Medico.populate(registroCovid,{path: "medico"},function(err,registroCovid){
            return res.status(200).json({ success: true, data: registroCovid })
        });
    }).catch(err => console.log(err))
}

getRegistroCovidByMedicoId = async (req, res) => {
    await RegistroCovid.find({ 'medico': req.params.id }, (err, registroCovid) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!registroCovid) {
            return res
                .status(404)
                .json({ success: false, error: `registroCovid not found` })
        }
        Paciente.populate(registroCovid,{path: "paciente"},function(err,registroCovid){
            return res.status(200).json({ success: true, data: registroCovid })
        });
    }).catch(err => console.log(err))
}

deleteRegistroCovid = async (req, res) => {
    await RegistroCovid.findOneAndDelete({ _id: req.params.id }, (err, registroCovid) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!registroCovid) {
            return res
                .status(404)
                .json({ success: false, error: `registroCovid not found` })
        }

        return res.status(200).json({ success: true, data: registroCovid })
    }).catch(err => console.log(err))
}

module.exports = {
    getRegistrosCovid,
    addRegistroCovid,
    getRegistroCovidById,
    deleteRegistroCovid,
    getRegistroCovidByPacienteId,
    getRegistroCovidByMedicoId,
}