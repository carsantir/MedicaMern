import React, { useState, useContext,useEffect } from 'react';
import { useHistory, Redirect, useParams } from "react-router-dom";
import Checkbox from '@material-ui/core/Checkbox';
import axios from "axios";
import ErrorNotice from "../../components/misc/ErrorNotice";
import UserContext from "../../context/userContext";
import Select from 'react-select';
import Async from 'react-async';
import api from '../../api'
function CrearInformePresencial () {
const [fecha, setFecha] = useState();
const [motivo, setMotivo] = useState();
const [diagnostico, setDiagnostico] = useState();
const [descripcion, setDescripcion] = useState();
const { userData } = useContext(UserContext);
const { idUser } = useParams()
const paciente = idUser;
const medico = userData.user.id;
const { id } = useParams();
const cita = id;

const [error, setError] = useState();
const history = useHistory();

const submit = async (e) => {
e.preventDefault();
try{
const newUser = {fecha,motivo,diagnostico,descripcion,cita,paciente,medico};
await axios.post("http://localhost:5000/informes/presencial/add", newUser);

history.push("/");
} catch(err) {
err.response.data.msg && setError(err.response.data.msg)
}
};

    return (
    <div className="form-horizontal">
    <h2>Crear informe presencial</h2>
    {error && <ErrorNotice message={error} clearError={() => setError(undefined)} />}
    <form onSubmit={submit}>
    <div class="input">
    <div class="registerAux">
    <div class="inputBox">
    <label>Fecha: </label><br></br>
    <input type="datetime-local" id="fecha" onChange={e => setFecha(e.target.value)}/><br></br>
    </div>
    <div class="inputBox">
    <label>Motivo: </label><br></br>
    <input type="text" id="motivo" onChange={e => setMotivo(e.target.value)}/><br></br>
    </div>
    </div>
    <div class="registerAux">
    <div class="inputBox">
    <label>Descripción: </label><br></br>
    <input type="text" id="descripcion" onChange={e => setDescripcion(e.target.value)}/><br></br>
    </div>
    <div class="inputBox">
    <label>Diagnóstico: </label><br></br>
    <textarea id="diagnostico" onChange={e => setDiagnostico(e.target.value)}/><br></br>
    </div>
    </div>
    <div id="registrarPac" class="inputBox">
    <input type="submit" value="Crear" className="btn btn-primary" />
    </div>
    </div>
    </form>
    </div>
    );
}
export default CrearInformePresencial;