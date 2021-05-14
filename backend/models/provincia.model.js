const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const provinciaSchema = new mongoose.Schema({
    provincia: { type: String, required: true },
});

module.exports = Provincia = mongoose.model("provincia",provinciaSchema);