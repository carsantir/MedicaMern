const Medicamento = require('../models/medicamento.model')

getMedicamentos = async (req, res) => {
    await Medicamento.find({}, (err, medicamento) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!medicamento.length) {
            return res
                .status(404)
                .json({ success: false, error: `medicamento not found` })
        }
            return res.status(200).json({ success: true, data: medicamento })
    }).catch(err => console.log(err))
}

getMedicamentoById = async (req, res) => {
    await Medicamento.findOne({ _id: req.params.id }, (err, medicamento) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!medicamento) {
            return res
                .status(404)
                .json({ success: false, error: `medicamento not found` })
        }
        return res.status(200).json({ success: true, data: medicamento })
    }).catch(err => console.log(err))
}

addMedicamento = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a medicamento',
        })
    }

    const medicamento = new Medicamento(body)

    if (!medicamento) {
        return res.status(400).json({ success: false, error: err })
    }

    medicamento
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: medicamento._id,
                message: 'medicamento created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'medicamento not created!',
            })
        })
}

module.exports = {
    getMedicamentos,
    getMedicamentoById,
    addMedicamento,
}