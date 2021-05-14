const Paciente = require('../models/user.model')
const Provincia = require('../models/provincia.model')
const Hospital = require('../models/hospital.model')

getUserById = async (req, res) => {
    await Paciente.findOne({ _id: req.params.id }, (err, paciente) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!paciente) {
            return res
                .status(404)
                .json({ success: false, error: `paciente not found` })
        }
        return res.status(200).json({ success: true, data: paciente })
    }).catch(err => console.log(err))
}

addHospital = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a registro tension',
        })
    }

    const hospital = new Hospital(body)

    if (!hospital) {
        return res.status(400).json({ success: false, error: err })
    }

    hospital
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: hospital._id,
                message: 'hospital created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'hospital not created!',
            })
        })
}

getHospitales= async (req, res) => {
    await Hospital.find({provincia:req.params.provincia}, (err, hospital) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!hospital) {
            return res
                .status(404)
                .json({ success: false, error: `hospital not found` })
        }
        return res.status(200).json({ success: true, data: hospital })
    }).catch(err => console.log(err))
}

getHospitalesAll= async (req, res) => {
    await Hospital.find({}, (err, hospital) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!hospital) {
            return res
                .status(404)
                .json({ success: false, error: `hospital not found` })
        }
        return res.status(200).json({ success: true, data: hospital })
    }).catch(err => console.log(err))
}

getHospitalById = async (req, res) => {
    await Hospital.findOne({ _id: req.params.id }, (err, hospital) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!hospital) {
            return res
                .status(404)
                .json({ success: false, error: `hospital not found` })
        }
        return res.status(200).json({ success: true, data: hospital })
    }).catch(err => console.log(err))
}

addProvincia = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a registro tension',
        })
    }

    const provincia = new Provincia(body)

    if (!provincia) {
        return res.status(400).json({ success: false, error: err })
    }

    provincia
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: provincia._id,
                message: 'provincia created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'provincia not created!',
            })
        })
}

getProvincias= async (req, res) => {
    await Provincia.find({}, (err, provincia) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!provincia) {
            return res
                .status(404)
                .json({ success: false, error: `provincia not found` })
        }
        return res.status(200).json({ success: true, data: provincia })
    }).catch(err => console.log(err))
}

getProvinciaById = async (req, res) => {
    await Provincia.findOne({ _id: req.params.id }, (err, provincia) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!provincia) {
            return res
                .status(404)
                .json({ success: false, error: `provincia not found` })
        }
        return res.status(200).json({ success: true, data: provincia })
    }).catch(err => console.log(err))
}


module.exports = {
    getUserById,
    addHospital,
    getProvincias,
    getHospitales,
    getHospitalesAll,
    addProvincia,
    getHospitalById,
    getProvinciaById,
}