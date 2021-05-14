const express = require('express')

const MedicamentoController = require('../controllers/medicamentoController')

const router = express.Router()

router.get('/', MedicamentoController.getMedicamentos)
router.get('/:id',MedicamentoController.getMedicamentoById)
router.post('/add',MedicamentoController.addMedicamento)

module.exports = router