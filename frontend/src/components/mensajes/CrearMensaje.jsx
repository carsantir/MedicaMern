import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import axios from "axios";
import ErrorNotice from "../../components/misc/ErrorNotice";
import UserContext from '../../context/userContext';
function CrearMensaje () {
const {userData} = useContext(UserContext);
const [mensaje, setMensaje] = useState();
const [consulta, setConsulta] = useState();
const [paciente, setPaciente] = useState();
const [medico, setMedico] = useState();
const fecha = new Date();
const escritoPor = userData.user.nickname+" "+userData.user.rol;
const [error, setError] = useState();
const history = useHistory();
const submit = async (e) => {
e.preventDefault();
try{
const newMensaje = {mensaje,consulta,paciente,medico,fecha,escritoPor};
await axios.post("http://localhost:5000/enquiries/addConsultas", newMensaje);

history.push("/");
} catch(err) {
err.response.data.msg && setError(err.response.data.msg)
}
};
return (
<div className="crearMensaje">
<h2>Crear mensaje</h2>
{error && <ErrorNotice message={error} clearError={() => setError(undefined)} />}
<form onSubmit={submit}>
<label>Mensaje: </label><br></br>
<textarea  id="mensaje" onChange={e => setMensaje(e.target.value)}/><br></br>
<label>Consulta: </label><br></br>
<input type="text" id="consulta" onChange={e => setConsulta(e.target.value)}/><br></br>
<label>Paciente ID: </label><br></br>
<input type="text" id="paciente" onChange={e => setPaciente(e.target.value)}/><br></br>
<label>Médico ID: </label><br></br>
<input type="text" id="medico" onChange={e => setMedico(e.target.value)}/><br></br>
<input type="submit" value="Crear" className="btn btn-primary" />
</form>
</div>
);
}
export default CrearMensaje;