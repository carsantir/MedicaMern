const express = require('express')

const EnfermedadController = require('../controllers/enfermedadController')

const router = express.Router()

router.get('/', EnfermedadController.getEnfermedades)
router.post('/add',EnfermedadController.addEnfermedad)
router.put('/:id/edit',EnfermedadController.updateEnfermedad)
router.get('/:id',EnfermedadController.getEnfermedadById)
router.delete('/:id/delete', EnfermedadController.deleteEnfermedad)
router.get('/paciente/:id',EnfermedadController.getEnfermedadByPacienteId)
router.get('/medico/:id',EnfermedadController.getEnfermedadByMedicoId)
router.get('/tipo/enfermedad',EnfermedadController.getTipoEnfermedad)

module.exports = router