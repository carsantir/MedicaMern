import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5000/enquiries',
})
const api2 = axios.create({
    baseURL: 'http://localhost:5000/citas',
})
const api3 = axios.create({
    baseURL: 'http://localhost:5000/medics',
})
const api4 = axios.create({
    baseURL: 'http://localhost:5000/informes/analisis'
})
const api5 = axios.create({
    baseURL: 'http://localhost:5000/informes'
})
const api6 = axios.create({
    baseURL: 'http://localhost:5000/enfermedades'
})

const api7 = axios.create({
    baseURL: 'http://localhost:5000/consultaAtencionEspecial'
})
const api8 = axios.create({
    baseURL: 'http://localhost:5000/users'
})

const api9 = axios.create({
    baseURL: 'http://localhost:5000/medicamentos'
})

const api10 = axios.create({
    baseURL: 'http://localhost:5000/tratamientoMedicacion'
})

const api11 = axios.create({
    baseURL: 'http://localhost:5000/tratamientoRehabilitacion'
})

const api12 = axios.create({
    baseURL: 'http://localhost:5000/registroTension'
})

const api13 = axios.create({
    baseURL: 'http://localhost:5000/registroCovid'
})

const api14 = axios.create({
    baseURL: 'http://localhost:5000/citasPcr'
})
export const listaConsulta = () => api.get(`/`)
export const editarConsulta = (id, payload) => api.put(`/${id}/edit`, payload)
export const getConsultaById = (id) => api.get(`/${id}`)
export const getConsultaByPacienteId = (id) => api.get(`/paciente/${id}`)
export const getConsultaByMedicoId = (id) => api.get(`/medico/${id}`)
export const eliminarConsulta = (id) => api.delete(`/${id}/delete`)
export const getMensajes = (id) => api.get(`/${id}/mensajes`)
export const getCitaByPacienteId = (id) => api2.get(`/paciente/${id}`)
export const getCitaByMedicoId = (id) => api2.get(`/medico/${id}`)
export const eliminarCita = (id) => api2.delete(`/${id}/delete`)
export const editarCita = (id, payload) => api2.put(`/${id}/edit`, payload)
export const getCitaById = (id) => api2.get(`/${id}`)
export const getMedics = () => api3.get(`/`)
export const getMedicById = (id) => api3.get(`/${id}`)
export const getSector = () => api3.get(`/tipo/medico`)
export const getMedicosFamilia = () => api3.get(`/medicos/familia`)
export const getPacientesByMedicoId = (id) => api3.get(`/${id}/pacientes`)
export const getTipoCita = () => api2.get(`/cita/tipoCitas`)
export const getTipoAnalisis = () => api2.get(`/cita/tipoAnalisis`)
export const getInformeAnalisisSangreByMedico = (id) => api4.get(`/sangre/medico/${id}`)
export const getInformeAnalisisOrinaByMedico = (id) => api4.get(`/orina/medico/${id}`)
export const getInformePruebaByMedico = (id) => api5.get(`/prueba/medico/${id}`)
export const getInformePresencialByMedico = (id) => api5.get(`/presencial/medico/${id}`)
export const getInformeAnalisisSangreByPaciente = (id) => api4.get(`/sangre/paciente/${id}`)
export const getInformeAnalisisOrinaByPaciente = (id) => api4.get(`/orina/paciente/${id}`)
export const getInformePruebaByPaciente = (id) => api5.get(`/prueba/paciente/${id}`)
export const getInformePresencialByPaciente = (id) => api5.get(`/presencial/paciente/${id}`)
export const getInformePcrByPaciente = (id) => api5.get(`/pcr/paciente/${id}`)
export const getInformePcrByMedico = (id) => api5.get(`/pcr/medico/${id}`)
export const eliminarInformeSangre = (id) => api4.delete(`/sangre/${id}/delete`)
export const eliminarInformeOrina= (id) => api4.delete(`/orina/${id}/delete`)
export const eliminarInformePrueba = (id) => api5.delete(`/prueba/${id}/delete`)
export const eliminarInformePresencial = (id) => api5.delete(`/presencial/${id}/delete`)
export const editarInformeSangre = (id,payload) => api4.put(`/sangre/${id}/edit`,payload)
export const editarInformeOrina= (id,payload) => api4.put(`/orina/${id}/edit`,payload)
export const editarInformePrueba = (id,payload) => api5.put(`/prueba/${id}/edit`,payload)
export const editarInformePresencial = (id,payload) => api5.put(`/presencial/${id}/edit`,payload)
export const getInformeSangre = (id) => api4.get(`/sangre/${id}`)
export const getInformeOrina= (id) => api4.get(`/orina/${id}`)
export const getInformePrueba = (id) => api5.get(`/prueba/${id}`)
export const getInformePresencial = (id) => api5.get(`/presencial/${id}`)
export const getEnfermedades= () => api6.get(`/`)
export const addEnfermedad= () => api6.post(`/add`)
export const editEnfermedad= (id,payload) => api6.put(`/${id}/edit`,payload)
export const getEnfermedad = (id) => api6.get(`/${id}`)
export const deleteEnfermedad = (id) => api6.delete(`/${id}/delete`)
export const getEnfermedadByPacienteId = (id) => api6.get(`/paciente/${id}`)
export const getEnfermedadByMedicoId = (id) => api6.get(`/medico/${id}`)
export const getTipoEnfermedad = () => api6.get(`/tipo/enfermedad`)
export const getConsultasAtencionEspecial = () => api7.get(`/`)
export const editarConsultaAtencionEspecial = (id) => api7.put(`/${id}/edit`)
export const getConsultaAtencionEspecialById = (id) => api7.get(`/${id}`)
export const getConsultaAtencionEspecialByPaciente = (id) => api7.get(`/paciente/${id}`)
export const getConsultaAtencionEspecialByMedico = (id) => api7.get(`/medico/${id}`)
export const getUserById = (id) => api8.get(`/${id}`)
export const getProvincias = () => api8.get(`/provincias/all`)
export const getHospitales = (provincia) => api8.get(`/${provincia}/hospitales`)
export const getHospitalesAll = () => api8.get(`/hospitales/all`)
export const getHospitalById = (id) => api8.get(`/hospitales/${id}`)
export const getProvinciaById = (id) => api8.get(`/provincias/${id}`)
export const getMedicamentos = () => api9.get(`/`)
export const getTratamientoMedicacionByEnfermedad = (id) => api10.get(`/enfermedad/${id}`)
export const getTratamientoRehabilitacionByEnfermedad = (id) => api11.get(`/enfermedad/${id}`)
export const getRegistrosTensionByPacienteId = (id) => api12.get(`/paciente/${id}`)
export const getRegistroCovidByPacienteId = (id) => api13.get(`/paciente/${id}`)
export const getRegistroCovidByMedicoId = (id) => api13.get(`/medico/${id}`)
export const getRegistroCovidById = (id) => api13.get(`/${id}`)
export const getCitasPcrByPacienteId = (id) => api14.get(`/paciente/${id}`)
export const getCitasPcrByMedicoId = (id) => api14.get(`/medico/${id}`)


const apis = {
    listaConsulta,
    editarConsulta,
    getConsultaById,
    eliminarConsulta,
    getConsultaByPacienteId,
    getConsultaByMedicoId,
    getMensajes,
    getCitaByPacienteId,
    getCitaByMedicoId,
    eliminarCita,
    editarCita,
    getCitaById,
    getMedics,
    getMedicById,
    getSector,
    getMedicosFamilia,
    getTipoCita,
    getTipoAnalisis,
    getInformeAnalisisSangreByMedico,
    getInformeAnalisisOrinaByMedico,
    getInformePruebaByMedico,
    getInformePresencialByMedico,
    getInformeAnalisisSangreByPaciente,
    getInformeAnalisisOrinaByPaciente,
    getInformePruebaByPaciente,
    getInformePresencialByPaciente,
    eliminarInformeSangre,
    eliminarInformeOrina,
    eliminarInformePrueba,
    eliminarInformePresencial,
    editarInformeSangre,
    editarInformeOrina,
    editarInformePrueba,
    editarInformePresencial,
    getInformeSangre,
    getInformeOrina,
    getInformePrueba,
    getInformePresencial,
    getEnfermedades,
    addEnfermedad,
    editEnfermedad,
    deleteEnfermedad,
    getEnfermedad,
    getEnfermedadByPacienteId,
    getEnfermedadByMedicoId,
    getTipoEnfermedad,
    getConsultasAtencionEspecial,
    editarConsultaAtencionEspecial,
    getConsultaAtencionEspecialById,
    getConsultaAtencionEspecialByPaciente,
    getConsultaAtencionEspecialByMedico,
    getUserById,
    getProvincias,
    getHospitales,
    getHospitalesAll,
    getHospitalById,
    getProvinciaById,
    getMedicamentos,
    getTratamientoMedicacionByEnfermedad,
    getTratamientoRehabilitacionByEnfermedad,
    getRegistrosTensionByPacienteId,
    getRegistroCovidByPacienteId,
    getRegistroCovidByMedicoId,
    getRegistroCovidById,
    getCitasPcrByPacienteId,
    getCitasPcrByMedicoId,
    getInformePcrByPaciente,
    getInformePcrByMedico,
    getPacientesByMedicoId,

}

export default apis