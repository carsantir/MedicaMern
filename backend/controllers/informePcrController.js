const InformePcr = require('../models/informePcr.model')

addInforme = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a informe',
        })
    }

    const informe = new InformePcr(body)

    if (!informe) {
        return res.status(400).json({ success: false, error: err })
    }

    informe
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: informe._id,
                message: 'informe created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'informe not created!',
            })
        })
}

getInformes = async (req, res) => {
    await InformePcr.find({}, (err, informes) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!informes.length) {
            return res
                .status(404)
                .json({ success: false, error: `informes not found` })
        }
        Paciente.populate(informes,{path: "paciente"},function(err,informes){
            return res.status(200).json({ success: true, data: informes })
        });
    }).catch(err => console.log(err))
}

updateInforme = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    InformePcr.findOne({ _id: req.params.id }, (err, informe) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'informe not found!',
            })
        }
        informe.fecha = body.fecha
        informe.motivo = body.motivo
        informe.descripcion = body.descripcion
        informe.esPositivo = body.esPositivo


        informe
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: informe._id,
                    message: 'informe updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'informe not updated!',
                })
            })
    })
}

getInformeById = async (req, res) => {
    await InformePcr.findOne({ _id: req.params.id }, (err, informe) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!informe) {
            return res
                .status(404)
                .json({ success: false, error: `informe not found` })
        }
        return res.status(200).json({ success: true, data: informe })
    }).catch(err => console.log(err))
}

getInformeByPacienteId = async (req, res) => {
    await InformePcr.find({ 'paciente': req.params.id }, (err, informe) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!informe) {
            return res
                .status(404)
                .json({ success: false, error: `informe not found` })
        }
        Medico.populate(informe,{path: "medico"},function(err,informe){
            return res.status(200).json({ success: true, data: informe })
        });
    }).catch(err => console.log(err))
}

getInformeByMedicoId = async (req, res) => {
    await InformePcr.find({ 'medico': req.params.id }, (err, informe) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!informe) {
            return res
                .status(404)
                .json({ success: false, error: `informe not found` })
        }
        Paciente.populate(informe,{path: "paciente"},function(err,informe){
            return res.status(200).json({ success: true, data: informe })
        });
    }).catch(err => console.log(err))
}

deleteInforme = async (req, res) => {
    await InformePcr.findOneAndDelete({ _id: req.params.id }, (err, informe) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!informe) {
            return res
                .status(404)
                .json({ success: false, error: `informe not found` })
        }

        return res.status(200).json({ success: true, data: informe })
    }).catch(err => console.log(err))
}

module.exports = {
    addInforme,
    getInformes,
    getInformeById,
    getInformeByMedicoId,
    getInformeByPacienteId,
    updateInforme,
    deleteInforme,
}