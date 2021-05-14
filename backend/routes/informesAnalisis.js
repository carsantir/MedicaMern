const express = require('express')

const informeAnalisisController = require('../controllers/informeAnalisisController')
const informeAnalisisOrinaController = require('../controllers/informeAnalisisOrinaController')
const informeAnalisisSangreController = require('../controllers/informeAnalisisSangreController')

const router = express.Router()

router.get('/orina/', informeAnalisisOrinaController.getInformes)
router.post('/orina/add',informeAnalisisOrinaController.addInforme)
router.put('/orina/:id/edit',informeAnalisisOrinaController.updateInforme)
router.get('/orina/:id',informeAnalisisOrinaController.getInformeById)
router.delete('/orina/:id/delete', informeAnalisisOrinaController.deleteInforme)
router.get('/orina/paciente/:id',informeAnalisisOrinaController.getInformeByPacienteId)
router.get('/orina/medico/:id',informeAnalisisOrinaController.getInformeByMedicoId)

router.get('/sangre/', informeAnalisisSangreController.getInformes)
router.post('/sangre/add',informeAnalisisSangreController.addInforme)
router.put('/sangre/:id/edit',informeAnalisisSangreController.updateInforme)
router.get('/sangre/:id',informeAnalisisSangreController.getInformeById)
router.delete('/sangre/:id/delete', informeAnalisisSangreController.deleteInforme)
router.get('/sangre/paciente/:id',informeAnalisisSangreController.getInformeByPacienteId)
router.get('/sangre/medico/:id',informeAnalisisSangreController.getInformeByMedicoId)

router.get('/informe/tipoInforme',informeAnalisisController.getTipoInforme)

module.exports = router