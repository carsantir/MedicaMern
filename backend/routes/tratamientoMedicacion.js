const express = require('express')

const tratamientoMedicacionController = require('../controllers/tratamientoMedicacionController')

const router = express.Router()

router.get('/', tratamientoMedicacionController.getTratamientosMedicacion)
router.post('/add',tratamientoMedicacionController.addTratamientoMedicacion)
router.put('/:id/edit',tratamientoMedicacionController.updateTratamientoMedicacion)
router.get('/:id',tratamientoMedicacionController.getTratamientoMedicacionById)
router.delete('/:id/delete', tratamientoMedicacionController.deleteTratamientoMedicacion)
router.get('/enfermedad/:id',tratamientoMedicacionController.getTratamientoMedicacionByEnfermedad)

module.exports = router