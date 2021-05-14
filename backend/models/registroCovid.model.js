const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const registroCovidSchema = new mongoose.Schema({
    fecha: { type: Date, required: true },
    contactoConPositivo:{ type: Boolean, required: true },
    tieneFiebre:{ type: Boolean, required: true },
    tieneTos:{ type: Boolean, required: true },
    cuestaRespirar:{ type: Boolean, required: true },
    perdidaOlfato:{ type: Boolean, required: true },
    perdidaGusto:{ type: Boolean, required: true },
    dolorGarganta:{ type: Boolean, required: true },
    diarrea:{ type: Boolean, required: true },
    dolorMuscular:{ type: Boolean, required: true },
    otrosSintomas:{ type: String },
    citasPCR:[{
        type:Schema.ObjectId,
        ref:'citasPCR'
    }],
    paciente: { type: Schema.ObjectId, ref: "patient" },
    medico: { type: Schema.ObjectId, ref: "medic" }    
});

module.exports = RegistroCovid = mongoose.model("registroCovid",registroCovidSchema);