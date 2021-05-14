const mongoose = require("mongoose");
const userSchema = require("../models/user");
const Schema = mongoose.Schema;

const medicSchema = new mongoose.Schema({
    ...userSchema.obj,
    nombre: { type: String, required: true },
    apellidos: { type: String, required: true },
    fechaNacimiento: { type: Date, required: true },
    dni:{ type: String, required: true },
    sexo: { type: String, required: true },
    direccion: { type: String, required: true },
    ciudad: { type: Schema.ObjectId, ref: "ciudad" }, 
    centroMedico: { type: Schema.ObjectId, ref: "hospital" }, 
    localidad: { type: String, required: true },
    cp: { type: Number, required: true },
    telefono: { type: Number, required: true },
    imgPerfil: { type: String},
    sector: {
        type: String,
        enum : ['Familia','Alergología','Anestesiología y reanimación','Aparato digestivo','Cardiología','Endocrinología y nutrición',
    'Geriatría','Hematología y hemoterapia','Medicina de la educación física y del deporte','Medicina espacial','Medicina intensiva',
    'Medicina interna','Medicina legal y forense','Medicina preventiva y salud pública','Medicina del trabajo','Nefrología',
    'Neumología','Neurología','Neurofisiología Clínica','Oncología médica','Oncología radioterápica','Pediatría',
    'Psiquiatría','Rehabilitación','Reumatología','Oftalmología','Otorrinolaringología','Urología','Ginecología'],
    }, 
});

module.exports = Medico = mongoose.model("medico",medicSchema);