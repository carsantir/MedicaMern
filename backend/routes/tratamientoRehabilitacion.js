const express = require('express')

const tratamientoRehabilitacionController = require('../controllers/tratamientoRehabilitacionController')

const router = express.Router()

router.get('/', tratamientoRehabilitacionController.getTratamientosRehabilitacion)
router.post('/add',tratamientoRehabilitacionController.addTratamientoRehabilitacion)
router.put('/:id/edit',tratamientoRehabilitacionController.updateTratamientoRehabilitacion)
router.get('/:id',tratamientoRehabilitacionController.getTratamientoRehabilitacionById)
router.delete('/:id/delete', tratamientoRehabilitacionController.deleteTratamientoRehabilitacion)
router.get('/enfermedad/:id',tratamientoRehabilitacionController.getTratamientoRehabilitacionByEnfermedad)

module.exports = router