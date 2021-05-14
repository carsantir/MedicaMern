const mongoose = require("mongoose");

const medicamentoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
});

module.exports = Medicamento = mongoose.model("medicamento",medicamentoSchema);