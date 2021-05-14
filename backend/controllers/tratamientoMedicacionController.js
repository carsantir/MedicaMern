const TratamientoMedicacion = require('../models/tratamientoMedicacion.model')
const Enfermedad = require('../models/enfermedad.model')
const Medicamento = require('../models/medicamento.model')

getTratamientosMedicacion = async (req, res) => {
    await TratamientoMedicacion.find({}, (err, tratamientoMedico) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!tratamientoMedico.length) {
            return res
                .status(404)
                .json({ success: false, error: `tratamientoMedico not found` })
        }
        Enfermedad.populate(tratamientoMedico,{path: "enfermedad"},Medicamento.populate(tratamientoMedico,{path: "medicamento"},function(err,tratamientoMedico){
            return res.status(200).json({ success: true, data: tratamientoMedico })
        }));
    }).catch(err => console.log(err))
}
addTratamientoMedicacion = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a enquiry',
        })
    }

    const tratamientoMedico = new TratamientoMedicacion(body)

    if (!tratamientoMedico) {
        return res.status(400).json({ success: false, error: err })
    }

    tratamientoMedico
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: tratamientoMedico._id,
                message: 'tratamientoMedico created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'tratamientoMedico not created!',
            })
        })
}

updateTratamientoMedicacion = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    TratamientoMedicacion.findOne({ _id: req.params.id }, (err, tratamientoMedicacion) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'tratamientoMedicacion not found!',
            })
        }
        tratamientoMedicacion.cantidadTomar = body.cantidadTomar
        tratamientoMedicacion.cantidadCaja = body.cantidadCaja
        tratamientoMedicacion.fecha1 = body.fecha1
        tratamientoMedicacion.fecha2 = body.fecha2

        tratamientoMedicacion
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: tratamientoMedicacion._id,
                    message: 'tratamientoMedicacion updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'tratamientoMedicacion not updated!',
                })
            })
    })
}

getTratamientoMedicacionById = async (req, res) => {
    await TratamientoMedicacion.findOne({ _id: req.params.id }, (err, tratamientoMedicacion) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!tratamientoMedicacion) {
            return res
                .status(404)
                .json({ success: false, error: `tratamientoMedicacion not found` })
        }
        return res.status(200).json({ success: true, data: tratamientoMedicacion })
    }).catch(err => console.log(err))
}

getTratamientoMedicacionByEnfermedad = async (req, res) => {
    await TratamientoMedicacion.find({ 'enfermedad': req.params.id }, (err, tratamientoMedicacion) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!tratamientoMedicacion) {
            return res
                .status(404)
                .json({ success: false, error: `tratamientoMedicacion not found` })
        }
        Medicamento.populate(tratamientoMedicacion,{path: "medicamento"},function(err,tratamientoMedico){
            return res.status(200).json({ success: true, data: tratamientoMedico })
        });
    }).catch(err => console.log(err))
}


deleteTratamientoMedicacion = async (req, res) => {
    await TratamientoMedicacion.findOneAndDelete({ _id: req.params.id }, (err, tratamientoMedicacion) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!tratamientoMedicacion) {
            return res
                .status(404)
                .json({ success: false, error: `tratamientoMedicacion not found` })
        }

        return res.status(200).json({ success: true, data: tratamientoMedicacion })
    }).catch(err => console.log(err))
}

module.exports = {
    getTratamientosMedicacion,
    addTratamientoMedicacion,
    updateTratamientoMedicacion,
    getTratamientoMedicacionById,
    deleteTratamientoMedicacion,
    getTratamientoMedicacionByEnfermedad,
}