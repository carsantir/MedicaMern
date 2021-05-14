const express = require('express')

const EnquiryController = require('../controllers/enquiryController')
const MensajeController = require('../controllers/mensajeController')

const router = express.Router()

router.get('/', EnquiryController.getEnquiries)
router.post('/add',EnquiryController.addEnquiries)
router.put('/:id/edit',EnquiryController.updateConsulta)
router.get('/:id',EnquiryController.getConsultaById)
router.delete('/:id/delete', EnquiryController.deleteConsulta)
router.get('/paciente/:id',EnquiryController.getConsultaByPacienteId)
router.get('/medico/:id',EnquiryController.getConsultaByMedicoId)

router.post('/addConsultas',MensajeController.addMensajes)
router.get('/:id/mensajes',MensajeController.getMensajes)

module.exports = router