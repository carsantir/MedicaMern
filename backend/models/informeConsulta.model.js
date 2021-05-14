const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const informeConsultaSchema = new mongoose.Schema({
    fecha: {type:Date},
    motivo: {type: String},
    tipoInforme: {type: String, default:'presencial'}, 
    descripcion: {type: String}, 
    diagnostico: {type: String},
    cita: { type: Schema.ObjectId, ref: "cita" },    
    paciente: { type: Schema.ObjectId, ref: "patient" },   
    medico: { type: Schema.ObjectId, ref: "medic" },   
});

module.exports = InformeConsulta = mongoose.model("informeConsulta",informeConsultaSchema);