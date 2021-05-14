const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hospitalSchema = new mongoose.Schema({
    nombre: { type: String, required: true },   
    provincia: { type: String, required: true }
});

module.exports = Hospital = mongoose.model("hospital",hospitalSchema);