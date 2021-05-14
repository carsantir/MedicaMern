const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tratamientoRehabilitacionSchema = new mongoose.Schema({
    centroMedico: { type: Schema.ObjectId, ref: "hospital" }, 
    consulta: {type:String,required: true},
    descripcion: {type:String,required: true},
    fecha: {type:Date,required: true},
    enfermedad: { type: Schema.ObjectId, ref: "enfermedad" },   
});

module.exports = TratamientoRehabilitacion = mongoose.model("tratamientoRehabilitacion",tratamientoRehabilitacionSchema);