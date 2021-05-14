const mongoose = require("mongoose");
const userSchema = require("../models/user");
const Schema = mongoose.Schema;

const patientSchema = new mongoose.Schema({
    ...userSchema.obj,
    nombre: { type: String, required: true },
    apellidos: { type: String, required: true },
    fechaNacimiento: { type: Date, required: true },
    dni:{ type: String, required: true },
    sexo: { type: String, required: true },
    numSeguridadSocial: { type: String, required: true },
    direccion: { type: String, required: true },
    ciudad: { type: Schema.ObjectId, ref: "ciudad" }, 
    centroMedico: { type: Schema.ObjectId, ref: "hospital" }, 
    localidad: { type: String, required: true },
    cp: { type: Number, required: true },
    telefono: { type: Number, required: true },
    imgPerfil: { type: String},
    medico: { type: Schema.ObjectId, ref: "medic" },

});

// const medicSchema = new mongoose.Schema({
//     ...userSchema.obj,
//     nombre: { type: String, required: true },
//     apellidos: { type: String, required: true },
//     fechaNacimiento: { type: Date, required: true },
//     dni:{ type: String, required: true },
//     sexo: { type: String, required: true },
//     direccion: { type: String, required: true },
//     ciudad: { type: String, required: true },
//     localidad: { type: String, required: true },
//     cp: { type: Number, required: true },
//     telefono: { type: Number, required: true },
//     sector : {type: String},
// });

// module.exports = Medico = mongoose.model("medico",medicSchema);
module.exports = Paciente = mongoose.model("paciente", patientSchema);