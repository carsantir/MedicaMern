const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const informeAnalisisOrina = new mongoose.Schema({
    fecha: {type:Date},
    observaciones: {type: String}, 
    cita: { type: Schema.ObjectId, ref: "cita" },    
    paciente: { type: Schema.ObjectId, ref: "patient" },   
    medico: { type: Schema.ObjectId, ref: "medic" },  
    tipoInforme: {type: String, default:'orina'}, 
    densidad: { type: Number, required: true },
    ph: { type: Number, required: true },
    glucosa: { type: Number, required: true },
    proteina:{ type: Number, required: true },
    hematies: { type: Number, required: true },
    leufocitos: { type: Number, required: true },
    cetonas: { type: Number, required: true },
    bilirrubina: { type: Number, required: true },
    nitritos: { type: Boolean, required: true, default:false },
    cristales: { type: Boolean, required: true, default:false },
    celulasEpiteliales: { type: Boolean, required: true, default:false },
    cilindros: { type: Boolean, required: true, default:false },
    bacterias: { type: Boolean, required: true, default:false },
});

module.exports = InformeAnalisisOrina = mongoose.model("informeAnalisisOrina",informeAnalisisOrina);