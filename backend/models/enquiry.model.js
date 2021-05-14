const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const enquirySchema = new mongoose.Schema({
    fecha: { type: Date, required: true },
    motivo:{ type: String, required: true },
    mensajes:[{
        type:Schema.ObjectId,
        ref:'mensaje'
    }],
    paciente: { type: Schema.ObjectId, ref: "patient" },
    medico: { type: Schema.ObjectId, ref: "medic" }    
});

module.exports = Consulta = mongoose.model("consulta",enquirySchema);