const TratamientoRehabilitacion = require('../models/tratamientoRehabilitacion.model')
const Enfermedad = require('../models/enfermedad.model')
const Hospital = require('../models/hospital.model')

getTratamientosRehabilitacion = async (req, res) => {
    await TratamientoRehabilitacion.find({}, (err, tratamientoRehabilitacion) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!tratamientoRehabilitacion.length) {
            return res
                .status(404)
                .json({ success: false, error: `tratamientoRehabilitacion not found` })
        }
        Enfermedad.populate(tratamientoRehabilitacion,{path: "enfermedad"},function(err,tratamientoRehabilitacion){
            return res.status(200).json({ success: true, data: tratamientoRehabilitacion })
        });
    }).catch(err => console.log(err))
}
addTratamientoRehabilitacion = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a enquiry',
        })
    }

    const tratamientoRehabilitacion = new TratamientoRehabilitacion(body)

    if (!tratamientoRehabilitacion) {
        return res.status(400).json({ success: false, error: err })
    }

    tratamientoRehabilitacion
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: tratamientoRehabilitacion._id,
                message: 'tratamientoRehabilitacion created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'tratamientoRehabilitacion not created!',
            })
        })
}

updateTratamientoRehabilitacion = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    TratamientoRehabilitacion.findOne({ _id: req.params.id }, (err, tratamientoRehabilitacion) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'tratamientoRehabilitacion not found!',
            })
        }
        tratamientoRehabilitacion.consulta = body.consulta
        tratamientoRehabilitacion.fecha = body.fecha

        tratamientoRehabilitacion
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: tratamientoRehabilitacion._id,
                    message: 'tratamientoRehabilitacion updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'tratamientoRehabilitacion not updated!',
                })
            })
    })
}

getTratamientoRehabilitacionById = async (req, res) => {
    await TratamientoRehabilitacion.findOne({ _id: req.params.id }, (err, tratamientoRehabilitacion) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!tratamientoRehabilitacion) {
            return res
                .status(404)
                .json({ success: false, error: `tratamientoRehabilitacion not found` })
        }
        return res.status(200).json({ success: true, data: tratamientoRehabilitacion })
    }).catch(err => console.log(err))
}

getTratamientoRehabilitacionByEnfermedad = async (req, res) => {
    await TratamientoRehabilitacion.find({ 'enfermedad': req.params.id }, (err, tratamientoRehabilitacion) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!tratamientoRehabilitacion) {
            return res
                .status(404)
                .json({ success: false, error: `tratamientoRehabilitacion not found` })
        }
        Hospital.populate(tratamientoRehabilitacion,{path: "centroMedico"},function(err,tratamientoRehabilitacion){
            return res.status(200).json({ success: true, data: tratamientoRehabilitacion })
        });
    }).catch(err => console.log(err))
}


deleteTratamientoRehabilitacion = async (req, res) => {
    await TratamientoRehabilitacion.findOneAndDelete({ _id: req.params.id }, (err, tratamientoRehabilitacion) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!tratamientoRehabilitacion) {
            return res
                .status(404)
                .json({ success: false, error: `tratamientoRehabilitacion not found` })
        }

        return res.status(200).json({ success: true, data: tratamientoRehabilitacion })
    }).catch(err => console.log(err))
}

module.exports = {
    getTratamientosRehabilitacion,
    addTratamientoRehabilitacion,
    updateTratamientoRehabilitacion,
    getTratamientoRehabilitacionById,
    deleteTratamientoRehabilitacion,
    getTratamientoRehabilitacionByEnfermedad,
}