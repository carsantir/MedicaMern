const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const Medico = require("../models/medic.model");
const MedicController = require('../controllers/medicController')
// Register
router.post("/register", async (req, res) => {
try {
let { email, password, passwordCheck, nickname, rol, nombre, apellidos, fechaNacimiento, dni, sexo, direccion, ciudad, localidad, cp, telefono,sector,imgPerfil,centroMedico } = req.body;
// validate
if (!email || !password || !passwordCheck || !nickname || !nombre || !apellidos || !fechaNacimiento || !dni || !sexo || !direccion || !ciudad || !localidad || !cp || !telefono || !sector || !imgPerfil || !centroMedico)
return res.status(400).json({ msg: "Not all fields have been entered." });
if (password.length < 5)
return res
.status(400)
.json({ msg: "The password needs to be at least 5 characters long." });
if (password !== passwordCheck)
return res
.status(400)
.json({ msg: "Enter the same password twice for verification." });
const existingUser = await Medico.findOne({ email: email });
if (existingUser)
return res
.status(400)
.json({ msg: "An account with this email already exists." });
if (!nickname) nickname = email;
const salt = await bcrypt.genSalt();
const passwordHash = await bcrypt.hash(password, salt);
const newUser = new Medico({
email,
password: passwordHash,
nickname,
rol,
nombre, 
apellidos, 
fechaNacimiento, 
dni, 
sexo,  
direccion, 
ciudad, 
localidad, 
cp, 
telefono,
sector,
imgPerfil,
centroMedico,
});
const savedUser = await newUser.save();
res.json(savedUser);
} catch (err) {
res.status(500).json({ error: err.message });
}
});

router.get('/', MedicController.getMedics)
router.get('/:id',MedicController.getMedicById)
router.get('/:id/pacientes',MedicController.getPacientesByMedicoId)
router.get('/tipo/medico',MedicController.getTipoMedico)
router.get('/medicos/familia',MedicController.getMedicosFamilia)
module.exports = router;