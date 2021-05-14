const express = require('express')

const citaPcrController = require('../controllers/citaPcrController')

const router = express.Router()

router.get('/', citaPcrController.getCitas)
router.post('/add',citaPcrController.addCitas)
router.put('/:id/edit',citaPcrController.updateCita)
router.get('/:id',citaPcrController.getCitaById)
router.delete('/:id/delete', citaPcrController.deleteCita)
router.get('/paciente/:id',citaPcrController.getCitaByPacienteId)
router.get('/medico/:id',citaPcrController.getCitaByMedicoId)

module.exports = router