const InformeAnalisisOrina = require('../models/informeAnalisisOrina.model')

addInforme = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a informe',
        })
    }

    const informe = new InformeAnalisisOrina(body)

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
    await InformeAnalisisOrina.find({}, (err, informes) => {
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

    InformeAnalisisOrina.findOne({ _id: req.params.id }, (err, informe) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'informe not found!',
            })
        }
        informe.fecha = body.fecha
        informe.observaciones = body.observaciones
        informe.densidad= body.densidad
        informe.ph= body.ph
        informe.glucosa= body.glucosa
        informe.proteina= body.proteina
        informe.hematies= body.hematies
        informe.leufocitos= body.leufocitos
        informe.cetonas= body.cetonas
        informe.bilirrubina= body.bilirrubina
        informe.nitritos= body.nitritos
        informe.cristales= body.cristales
        informe.celulasEpiteliales= body.celulasEpiteliales
        informe.cilindros= body.cilindros
        informe.bacterias= body.bacterias
        
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
    await InformeAnalisisOrina.findOne({ _id: req.params.id }, (err, informe) => {
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
    await InformeAnalisisOrina.find({ 'paciente': req.params.id }, (err, informe) => {
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
    await InformeAnalisisOrina.find({ 'medico': req.params.id }, (err, informe) => {
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
    await InformeAnalisisOrina.findOneAndDelete({ _id: req.params.id }, (err, informe) => {
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