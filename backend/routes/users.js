const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const Paciente = require("../models/user.model");
const Medico = require("../models/medic.model");
const userController = require('../controllers/userController')
// Register
router.post("/register", async (req, res) => {
try {
let { email, password, passwordCheck, nickname, rol, nombre, apellidos, fechaNacimiento, dni, sexo, numSeguridadSocial, direccion, ciudad, localidad, cp, telefono,imgPerfil,medico,centroMedico } = req.body;
// validate
if (!email || !password || !passwordCheck || !nickname || !nombre || !apellidos || !fechaNacimiento || !dni || !sexo || !numSeguridadSocial || !direccion || !ciudad || !localidad || !cp || !telefono || !centroMedico)
return res.status(400).json({ msg: "Not all fields have been entered." });
if (password.length < 5)
return res
.status(400)
.json({ msg: "The password needs to be at least 5 characters long." });
if (password !== passwordCheck)
return res
.status(400)
.json({ msg: "Enter the same password twice for verification." });
const existingUser = await Paciente.findOne({ email: email });
if (existingUser)
return res
.status(400)
.json({ msg: "An account with this email already exists." });
if (!nickname) nickname = email;
const salt = await bcrypt.genSalt();
const passwordHash = await bcrypt.hash(password, salt);
const newUser = new Paciente({
email,
password: passwordHash,
nickname,
rol,
nombre, 
apellidos, 
fechaNacimiento, 
dni, 
sexo, 
numSeguridadSocial, 
direccion, 
ciudad, 
localidad, 
cp, 
telefono,
imgPerfil,
medico,
centroMedico,
});
const savedUser = await newUser.save();
res.json(savedUser);
} catch (err) {
res.status(500).json({ error: err.message });
}
});
// Login
router.post("/login", async (req, res) => {
let alert = require('alert'); 
try {
const { email, password } = req.body;
// validate
if (!email || !password)
return res.status(400).json({ msg: "Not all fields have been entered." });
let user;
if(await Paciente.findOne({ email: email })){
if((await Paciente.findOne({ email: email })).rol=="Paciente"){
    user = await Paciente.findOne({ email: email });
    }
}else if(await Medico.findOne({ email: email })){
    if ((await Medico.findOne({ email: email })).rol=="Médico"){
        user = await Medico.findOne({ email: email });
    }
}
if (!user)
return res
.status(400)
.json({ msg: "No account with this nickname has been registered." });
const isMatch = await bcrypt.compare(password, user.password);
if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });
const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
res.json({
token,
user: {
id: user._id,
nickname: user.nickname,
rol: user.rol,
},
});
} catch (err) {
res.status(500).json({ error: err.message });
}
});
// Delete
router.delete("/delete", auth, async (req, res) => {
try {
const deletedUser = await Paciente.findByIdAndDelete(req.user);
res.json(deletedUser);
} catch (err) {
res.status(500).json({ error: err.message });
}
});
// Check if token is valid
router.post("/tokenIsValid", async (req, res) => {
try {
const token = req.header("x-auth-token");
if (!token) return res.json(false);
const verified = jwt.verify(token, process.env.JWT_SECRET);
if (!verified) return res.json(false);
let user;
if(await Paciente.findById(verified.id)){
    user = await Paciente.findById(verified.id);
}else if(await Medico.findById(verified.id)){
    user = await Medico.findById(verified.id);
}
if (!user) return res.json(false);
return res.json(true);
} catch (err) {
res.status(500).json({ error: err.message });
}
});
router.get("/", auth, async (req, res) => {
    let user;
    if(await Paciente.findById(req.user)){
        user = await Paciente.findById(req.user);
    }else if(await Medico.findById(req.user)){
        user = await Medico.findById(req.user);
    }
res.json({
nickname: user.nickname,
id: user._id,
rol: user.rol,
});
});

router.get('/:id', userController.getUserById)
router.post('/addHospital',userController.addHospital)
router.get('/:provincia/hospitales',userController.getHospitales)
router.get('/hospitales/all',userController.getHospitalesAll)
router.get('/hospitales/:id',userController.getHospitalById)
router.get('/provincias/all',userController.getProvincias)
router.get('/provincias/:id',userController.getProvinciaById)
router.post('/addProvincias',userController.addProvincia)

module.exports = router;