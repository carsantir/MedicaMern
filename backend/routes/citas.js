const express = require('express')

const citaController = require('../controllers/citaController')

const router = express.Router()

router.get('/', citaController.getCitas)
router.post('/add',citaController.addCitas)
router.put('/:id/edit',citaController.updateCita)
router.get('/:id',citaController.getCitaById)
router.delete('/:id/delete', citaController.deleteCita)
router.get('/paciente/:id',citaController.getCitaByPacienteId)
router.get('/medico/:id',citaController.getCitaByMedicoId)
router.get('/cita/tipoCitas',citaController.getTipoCita)
router.get('/cita/tipoAnalisis',citaController.getTipoAnalisis)

module.exports = router