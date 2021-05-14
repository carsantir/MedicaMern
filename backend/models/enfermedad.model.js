const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const enfermedadSchema = new mongoose.Schema({
    tipoEnfermedad: {
        type: String,
        enum : ['Crónica','Temporal'],
    }, 
    nombre:{ type: String, required: true },
    descripcion:{ type: String, required: true },
    paciente: { type: Schema.ObjectId, ref: "patient" },
    medico: { type: Schema.ObjectId, ref: "medic" }    
});

module.exports = Enfermedad = mongoose.model("enfermedad",enfermedadSchema);