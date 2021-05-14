const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const citaPcrSchema = new mongoose.Schema({
    fecha: {type:Date},
    ciudad: {type: String}, 
    centroMedico: {type: String}, 
    motivo: {type: String},
    registroCovid: { type: Schema.ObjectId, ref: "registroCovid" },    
    paciente: { type: Schema.ObjectId, ref: "patient" },   
    medico: { type: Schema.ObjectId, ref: "medic" },   
    tipoCita: {type: String, required:true}
});

module.exports = CitaPcr = mongoose.model("citaPcr",citaPcrSchema);