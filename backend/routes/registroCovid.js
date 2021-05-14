const express = require('express')

const RegistroCovid = require('../controllers/registroCovidController')

const router = express.Router()

router.get('/', RegistroCovid.getRegistrosCovid)
router.post('/add',RegistroCovid.addRegistroCovid)
router.put('/:id/delete',RegistroCovid.deleteRegistroCovid)
router.get('/:id',RegistroCovid.getRegistroCovidById)
router.get('/paciente/:id',RegistroCovid.getRegistroCovidByPacienteId)
router.get('/medico/:id',RegistroCovid.getRegistroCovidByMedicoId)

module.exports = router