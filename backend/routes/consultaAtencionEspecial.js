const express = require('express')

const ConsultaAtencionEspecial = require('../controllers/consultaAtencionEspecialController')

const router = express.Router()

router.get('/', ConsultaAtencionEspecial.getConsultasAtencionEspecial)
router.post('/add',ConsultaAtencionEspecial.addConsultaAtencionEspecial)
router.put('/:id/edit',ConsultaAtencionEspecial.updateConsultaAtencionEspecial)
router.get('/:id',ConsultaAtencionEspecial.getConsultaAtencionEspecialById)
router.get('/paciente/:id',ConsultaAtencionEspecial.getConsultaAtencionEspecialByPacienteId)
router.get('/medico/:id',ConsultaAtencionEspecial.getConsultaAtencionEspecialByMedicoId)

module.exports = router