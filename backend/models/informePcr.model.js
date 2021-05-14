const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const informePcrSchema = new mongoose.Schema({
    fecha: {type:Date,required:true},
    motivo: {type: String,required:true},
    descripcion: {type: String,required:true}, 
    esPositivo: {type:Boolean},
    tipoInforme: {type: String, default:'pcr'},  
    citaPcr: { type: Schema.ObjectId, ref: "citaPcr" },    
    paciente: { type: Schema.ObjectId, ref: "patient" },   
    medico: { type: Schema.ObjectId, ref: "medic" },   
});

module.exports = InformePcr = mongoose.model("informePcr",informePcrSchema);