const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tratamientoMedicacionSchema = new mongoose.Schema({
    cantidadTomar: { type: Number, required: true },
    cantidadCaja: { type: Number, required: true },
    fecha1: {type:Date,required: true},
    fecha2: {type:Date},
    medicamento: { type: Schema.ObjectId, ref: "medicamento" },  
    enfermedad: { type: Schema.ObjectId, ref: "enfermedad" },   
});

module.exports = TratamientoMedicacion = mongoose.model("tratamientoMedicacion",tratamientoMedicacionSchema);