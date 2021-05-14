const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mensajeSchema = new mongoose.Schema({
    mensaje: { type: String, required: true },
    fecha: {type:Date},
    consulta: { type: Schema.ObjectId, ref: "enquiry" },  
    medico: { type: Schema.ObjectId, ref: "medic" }, 
    paciente: { type: Schema.ObjectId, ref: "patient" },    
    escritoPor: {type: String}, 
});

module.exports = Mensaje = mongoose.model("mensaje",mensajeSchema);