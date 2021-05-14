const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const registroTensionSchema = new mongoose.Schema({
    fechaHora: {type:Date, required:true},
    presionSistole: {type: Number,required:true},
    presionDiastole: {type: Number,required:true},
    pulsaciones: {type: Number,required:true},   
    paciente: { type: Schema.ObjectId, ref: "patient" }, 
});

module.exports = RegistroTension = mongoose.model("registroTension",registroTensionSchema);