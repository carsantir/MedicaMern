import React, { useState, useContext,useEffect } from 'react';
import { useHistory, Redirect,useParams } from "react-router-dom";
import axios from "axios";
import ErrorNotice from "../../components/misc/ErrorNotice";
import UserContext from "../../context/userContext";
import Select from 'react-select';
import Async from 'react-async';
import api from '../../api'
function CrearTratamientoRehabilitacion () {
const [consulta, setConsulta] = useState();
const [fecha, setFecha] = useState();
const [descripcion, setDescripcion] = useState();
const idEnfermedad = useParams()
const enfermedad = idEnfermedad.idEnfermedad
const { userData } = useContext(UserContext);
const [error, setError] = useState();
const history = useHistory();

const submit = async (e) => {
e.preventDefault();
try{
const enfermedadAux = await api.getEnfermedad(enfermedad)
const pac = enfermedadAux.data.data.paciente
const user = await api.getUserById(pac)
const centroMedico = user.data.data.centroMedico
const newUser = {consulta,fecha,centroMedico,enfermedad,descripcion};
await axios.post("http://localhost:5000/tratamientoRehabilitacion/add", newUser);

history.push("/");
} catch(err) {
err.response.data.msg && setError(err.response.data.msg)
}
};


    return (
    <div className="form">
    <h2>Crear tratamiento rehabilitación:</h2>
    {error && <ErrorNotice message={error} clearError={() => setError(undefined)} />}
    <form onSubmit={submit}>
    <div class="input">
    <div class="inputBox">
    <label>Fecha: </label><br></br>
    <input type="datetime-local" id="fecha" onChange={e => setFecha(e.target.value)}/><br></br>
    </div>
    <div class="inputBox">
    <label>Consulta: </label><br></br>
    <input type="text" id="consulta" onChange={e => setConsulta(e.target.value)}/><br></br>
    </div>
    <div class="inputBox">
    <label>Descripción: </label><br></br>
    <input type="text" id="descripcion" onChange={e => setDescripcion(e.target.value)}/><br></br>
    </div>
    <div class="inputBox">
    <input type="submit" value="Crear" className="btn btn-primary" />
    </div>
    </div>
    </form>
    </div>
    );
}

export default CrearTratamientoRehabilitacion;