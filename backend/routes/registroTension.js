const express = require('express')

const registroTensionController = require('../controllers/registroTensionController')

const router = express.Router()

router.get('/', registroTensionController.getRegistrosTension)
router.post('/add',registroTensionController.addRegistroTension)
router.put('/:id/edit',registroTensionController.updateRegistroTension)
router.get('/:id',registroTensionController.getRegistroTensionById)
router.get('/paciente/:id',registroTensionController.getRegistroTensionByPacienteId)
router.delete('/:id/delete', registroTensionController.deleteRegistroTension)

module.exports = router