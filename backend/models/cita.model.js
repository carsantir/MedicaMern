const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const citaSchema = new mongoose.Schema({
    fecha: {type:Date},
    ciudad: {type: String}, 
    centroMedico: {type: String}, 
    motivo: {type: String},
    consulta: { type: Schema.ObjectId, ref: "enquiry" },    
    paciente: { type: Schema.ObjectId, ref: "patient" },   
    medico: { type: Schema.ObjectId, ref: "medic" },   
    tipoCita: {
        type: String,
        enum : ['análisis','presencial','prueba médica'],
    }, 
    tipoAnalisis: {
        type: String,
        enum : ['sangre','orina'],
    }, 
});

module.exports = Cita = mongoose.model("cita",citaSchema);