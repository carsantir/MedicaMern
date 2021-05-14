const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const informeAnalisisSchema = new mongoose.Schema({
    tipoInforme: {
        type: String,
        enum : ['sangre','orina'],
    }, 
});

module.exports = InformeAnalisis = mongoose.model("informeAnalisis",informeAnalisisSchema);