const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const informePruebaSchema = new mongoose.Schema({
    fecha: {type:Date},
    resultado: {type: String},
    tipoInforme: {type: String, default:'prueba'}, 
    nombre: {type: String},
    descripcion: {type: String}, 
    cita: { type: Schema.ObjectId, ref: "cita" },    
    paciente: { type: Schema.ObjectId, ref: "patient" },   
    medico: { type: Schema.ObjectId, ref: "medic" },   
});

module.exports = InformePrueba = mongoose.model("informePrueba",informePruebaSchema);