const InformeAnalisisSangre = require('../models/informeAnalisisSangre.model')

addInforme = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a informe',
        })
    }

    const informe = new InformeAnalisisSangre(body)

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
    await InformeAnalisisSangre.find({}, (err, informes) => {
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

    InformeAnalisisSangre.findOne({ _id: req.params.id }, (err, informe) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'informe not found!',
            })
        }
        informe.fecha = body.fecha
        informe.observaciones = body.observaciones
        informe.hematies= body.hematies
        informe.hemoglobina= body.hemoglobina
        informe.hematocrito= body.hematocrito
        informe.vcm= body.vcm
        informe.hcm= body.hcm
        informe.linfocitos= body.linfocitos
        informe.neutrofilos= body.neutrofilos
        informe.eosinofilos= body.eosinofilos
        informe.plaquetas= body.plaquetas
        informe.vsg= body.vsg
        informe.glucosa= body.glucosa
        informe.urea= body.urea
        informe.acidoUrico= body.acidoUrico
        informe.creatinina= body.creatinina
        informe.colesterol= body.colesterol
        informe.trigliceridos= body.trigliceridos
        informe.transaminasas= body.transaminasas
        informe.fosfatasaAlcalina= body.fosfatasaAlcalina
        informe.calcio= body.calcio
        informe.hierro= body.hierro
        informe.potasio= body.potasio
        informe.sodio= body.sodio
        informe.bilirrubina= body.bilirrubina


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
    await InformeAnalisisSangre.findOne({ _id: req.params.id }, (err, informe) => {
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
    await InformeAnalisisSangre.find({ 'paciente': req.params.id }, (err, informe) => {
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
    await InformeAnalisisSangre.find({ 'medico': req.params.id }, (err, informe) => {
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
    await InformeAnalisisSangre.findOneAndDelete({ _id: req.params.id }, (err, informe) => {
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