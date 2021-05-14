const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const consultaAtencionEspecialSchema = new mongoose.Schema({
    fecha: { type: Date, required: true},
    finalizada: {type:Boolean},
    paciente: { type: Schema.ObjectId, ref: "patient" },
    medico: { type: Schema.ObjectId, ref: "medic" }    
});

module.exports = ConsultaAtencionEspecial = mongoose.model("consultaAtencionEspecial",consultaAtencionEspecialSchema);