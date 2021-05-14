const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const app = express();
// app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`The server has started on port: ${PORT}`));
mongoose.connect(
process.env.CONNECTION_URL,
{
useNewUrlParser: true,
useUnifiedTopology: true,
useCreateIndex: true,
},
(err) => {
if (err) throw err;
console.log("MongoDB connection established");
}
);
app.use(bodyParser.json({ limit: "5mb" }));
app.use("/users", require("./routes/users"));
app.use("/medics", require("./routes/medics"));
app.use("/enquiries", require("./routes/enquiries"));
app.use("/citas",require("./routes/citas"));
app.use("/citasPcr",require("./routes/citasPcr"));
app.use("/informes/analisis",require("./routes/informesAnalisis"));
app.use("/informes",require("./routes/informes"));
app.use("/enfermedades",require("./routes/enfermedades"));
app.use("/medicamentos",require("./routes/medicamentos"));
app.use("/tratamientoMedicacion",require("./routes/tratamientoMedicacion"));
app.use("/tratamientoRehabilitacion",require("./routes/tratamientoRehabilitacion"));
app.use("/registroTension",require("./routes/registroTension"));
app.use("/consultaAtencionEspecial",require("./routes/consultaAtencionEspecial"));
app.use("/registroCovid",require("./routes/registroCovid"));