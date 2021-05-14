const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const informeAnalisisSangre = new mongoose.Schema({
    fecha: {type:Date},
    observaciones: {type: String}, 
    cita: { type: Schema.ObjectId, ref: "cita" },    
    paciente: { type: Schema.ObjectId, ref: "patient" },   
    medico: { type: Schema.ObjectId, ref: "medic" },  
    tipoInforme: {type: String, default:'sangre'},  
    hematies: { type: Number, required: true },
    hemoglobina: { type: Number, required: true },
    hematocrito: { type: Number, required: true },
    vcm:{ type: Number, required: true },
    hcm: { type: Number, required: true },
    linfocitos: { type: Number, required: true },
    neutrofilos: { type: Number, required: true },
    eosinofilos: { type: Number, required: true },
    plaquetas: { type: Number, required: true },
    vsg: { type: Number, required: true },
    glucosa: { type: Number, required: true },
    urea: { type: Number, required: true },
    acidoUrico: { type: Number, required: true },
    creatinina: { type: Number, required: true },
    colesterol: { type: Number, required: true },
    trigliceridos: { type: Number, required: true },
    transaminasas: { type: Number, required: true },
    fosfatasaAlcalina: { type: Number, required: true },
    calcio: { type: Number, required: true },
    hierro: { type: Number, required: true },
    potasio: { type: Number, required: true },
    sodio: { type: Number, required: true },
    bilirrubina: { type: Number, required: true },
});

module.exports = InformeAnalisisSangre = mongoose.model("informeAnalisisSangre",informeAnalisisSangre);