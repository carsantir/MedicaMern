const express = require('express')

const informeAnalisisController = require('../controllers/informeAnalisisController')
const informePruebaController = require('../controllers/informePruebaController')
const informePresencialController = require('../controllers/informePresencialController')
const informePcrController = require('../controllers/informePcrController')

const router = express.Router()

router.get('/prueba/', informePruebaController.getInformes)
router.post('/prueba/add',informePruebaController.addInforme)
router.put('/prueba/:id/edit',informePruebaController.updateInforme)
router.get('/prueba/:id',informePruebaController.getInformeById)
router.delete('/prueba/:id/delete', informePruebaController.deleteInforme)
router.get('/prueba/paciente/:id',informePruebaController.getInformeByPacienteId)
router.get('/prueba/medico/:id',informePruebaController.getInformeByMedicoId)

router.get('/presencial/', informePresencialController.getInformes)
router.post('/presencial/add',informePresencialController.addInforme)
router.put('/presencial/:id/edit',informePresencialController.updateInforme)
router.get('/presencial/:id',informePresencialController.getInformeById)
router.delete('/presencial/:id/delete', informePresencialController.deleteInforme)
router.get('/presencial/paciente/:id',informePresencialController.getInformeByPacienteId)
router.get('/presencial/medico/:id',informePresencialController.getInformeByMedicoId)

router.get('/pcr/', informePcrController.getInformes)
router.post('/pcr/add',informePcrController.addInforme)
router.put('/pcr/:id/edit',informePcrController.updateInforme)
router.get('/pcr/:id',informePcrController.getInformeById)
router.delete('/pcr/:id/delete', informePcrController.deleteInforme)
router.get('/pcr/paciente/:id',informePcrController.getInformeByPacienteId)
router.get('/pcr/medico/:id',informePcrController.getInformeByMedicoId)

router.get('/informe/tipoInforme',informeAnalisisController.getTipoInforme)

module.exports = router