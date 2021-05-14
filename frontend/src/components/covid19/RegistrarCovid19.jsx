import React, { useState, useContext,useEffect } from 'react';
import { useHistory, Redirect } from "react-router-dom";
import axios from "axios";
import ErrorNotice from "../../components/misc/ErrorNotice";
import UserContext from "../../context/userContext";
import Select from 'react-select';
import Async from 'react-async';
import api from '../../api'
import moment from "moment";
import Checkbox from '@material-ui/core/Checkbox';
function RegistrarCovid19 () {
const fecha = moment().format("MM-DD-YYYY HH:mm")
const [contactoConPositivo, setContactoConPositivo] = useState();
const [tieneFiebre, setTieneFiebre] = useState();
const [tieneTos, setTieneTos] = useState();
const [cuestaRespirar, setCuestaRespirar] = useState();
const [perdidaOlfato, setPerdidaOlfato] = useState();
const [perdidaGusto, setPerdidaGusto] = useState();
const [dolorGarganta, setDolorGarganta] = useState();
const [diarrea, setDiarrea] = useState();
const [dolorMuscular, setDolorMuscular] = useState();
const [otrosSintomas, setOtrosSintomas] = useState();
const { userData } = useContext(UserContext);
const paciente = userData.user.id;
const [error, setError] = useState();
const history = useHistory();

const submit = async (e) => {
e.preventDefault();
try{
    const user = await api.getUserById(paciente);
    const medico = user.data.data.medico;
const newUser = {fecha,contactoConPositivo,tieneFiebre,tieneTos,cuestaRespirar,perdidaOlfato,perdidaGusto,dolorGarganta,
    diarrea,dolorMuscular,otrosSintomas,paciente,medico};
await axios.post("http://localhost:5000/registroCovid/add", newUser);

history.push("/"+userData.user.id+"/covid19");
} catch(err) {
err.response.data.msg && setError(err.response.data.msg)
}
};

    return (
    <div className="form">
    <h2>Crear registro COVID-19</h2>
    {error && <ErrorNotice message={error} clearError={() => setError(undefined)} />}
    <form onSubmit={submit}>
    <div class="input">
    <div class="registerAux">
    <div class="inputBox-sangre">
    <label>Contacto con positivo: </label><br></br>
    <Checkbox id="contactoConPositivo" onChange={e => setContactoConPositivo(e.target.checked)}/><br></br>
    </div>
    <div class="inputBox-sangre">
    <label>Tiene fiebre: </label><br></br>
    <Checkbox id="tieneFiebre" onChange={e => setTieneFiebre(e.target.checked)}/><br></br>
    </div>
    <div class="inputBox-sangre">
    <label>Tiene tos: </label><br></br>
    <Checkbox id="tieneTos" onChange={e => setTieneTos(e.target.checked)}/><br></br>
    </div>
    <div class="inputBox-sangre">
    <label>Cuesta respirar: </label><br></br>
    <Checkbox id="cuestaRespirar" onChange={e => setCuestaRespirar(e.target.checked)}/><br></br>
    </div>
    <div class="inputBox-sangre">
    <label>Pérdida olfato: </label><br></br>
    <Checkbox id="perdidaOlfato" onChange={e => setPerdidaOlfato(e.target.checked)}/><br></br>
    </div>
    </div>
    <div class="registerAux">
    <div class="inputBox-sangre">
    <label>Pérdida gusto: </label><br></br>
    <Checkbox id="perdidaGusto" onChange={e => setPerdidaGusto(e.target.checked)}/><br></br>
    </div>
    <div class="inputBox-sangre">
    <label>Dolor de garganta: </label><br></br>
    <Checkbox id="dolorGarganta" onChange={e => setDolorGarganta(e.target.checked)}/><br></br>
    </div>
    <div class="inputBox-sangre">
    <label>Diarrea: </label><br></br>
    <Checkbox id="diarrea" onChange={e => setDiarrea(e.target.checked)}/><br></br>
    </div>
    <div class="inputBox-sangre">
    <label>Dolor muscular: </label><br></br>
    <Checkbox id="dolorMuscular" onChange={e => setDolorMuscular(e.target.checked)}/><br></br>
    </div>
    <div class="inputBox-sangre">
    <label>Otros síntomas: </label><br></br>
    <textarea id="otrosSintomas" onChange={e => setOtrosSintomas(e.target.value)}/><br></br>
    </div>
    </div>
    <div id="registrarPac" class="inputBox">
    <input type="submit" value="Registrar" className="btn btn-primary" />
    </div>
    </div>
    </form>
    </div>
    );
}
export default RegistrarCovid19;