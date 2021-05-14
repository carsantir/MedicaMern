const RegistroTension = require('../models/registroTension.model')

addRegistroTension = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a registro tension',
        })
    }

    const registroTension = new RegistroTension(body)

    if (!registroTension) {
        return res.status(400).json({ success: false, error: err })
    }

    registroTension
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: registroTension._id,
                message: 'registroTension created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'registroTension not created!',
            })
        })
}

getRegistrosTension = async (req, res) => {
    await RegistroTension.find({}, (err, registroTension) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!registroTension.length) {
            return res
                .status(404)
                .json({ success: false, error: `registroTension not found` })
        }
        Paciente.populate(registroTension,{path: "paciente"},function(err,registroTension){
            return res.status(200).json({ success: true, data: registroTension })
        });
    }).catch(err => console.log(err))
}

updateRegistroTension = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    RegistroTension.findOne({ _id: req.params.id }, (err, registroTension) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'registroTension not found!',
            })
        }
        registroTension.fechaHora = body.fechaHora
        registroTension.presionSistole = body.presionSistole
        registroTension.presionDiastole = body.presionDiastole
        registroTension.pulsaciones = body.pulsaciones

        registroTension
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: registroTension._id,
                    message: 'registroTension updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'registroTension not updated!',
                })
            })
    })
}

getRegistroTensionById = async (req, res) => {
    await RegistroTension.findOne({ _id: req.params.id }, (err, registroTension) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!registroTension) {
            return res
                .status(404)
                .json({ success: false, error: `registroTension not found` })
        }
        return res.status(200).json({ success: true, data: registroTension })
    }).catch(err => console.log(err))
}

getRegistroTensionByPacienteId = async (req, res) => {
    await RegistroTension.find({ 'paciente': req.params.id }, (err, registroTension) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!registroTension) {
            return res
                .status(404)
                .json({ success: false, error: `registroTension not found` })
        }
        return res.status(200).json({ success: true, data: registroTension })
    }).catch(err => console.log(err))
}

deleteRegistroTension = async (req, res) => {
    await RegistroTension.findOneAndDelete({ _id: req.params.id }, (err, registroTension) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!registroTension) {
            return res
                .status(404)
                .json({ success: false, error: `registroTension not found` })
        }

        return res.status(200).json({ success: true, data: registroTension })
    }).catch(err => console.log(err))
}



module.exports = {
    getRegistrosTension,
    addRegistroTension,
    updateRegistroTension,
    getRegistroTensionById,
    deleteRegistroTension,
    getRegistroTensionByPacienteId,
}