import React, { useState, useContext,useEffect } from 'react';
import { useHistory, Redirect, useParams } from "react-router-dom";
import axios from "axios";
import ErrorNotice from "../../components/misc/ErrorNotice";
import UserContext from "../../context/userContext";
import Select from 'react-select';
import Async from 'react-async';
import api from '../../api'
function CrearInformeSangre () {
const [fecha, setFecha] = useState();
const [observaciones, setObservaciones] = useState();
const { userData } = useContext(UserContext);
const { idUser } = useParams()
const paciente = idUser;
const medico = userData.user.id;
const { id } = useParams();
const cita = id;
const { tipoAnalisis } = useParams();
const tipoInforme = tipoAnalisis;
const [hematies, setHematies] = useState();
const [hemoglobina, setHemoglobina] = useState();
const [hematocrito, setHematocrito] = useState();
const [vcm, setVcm] = useState();
const [hcm, setHcm] = useState();
const [linfocitos, setLinfocitos] = useState();
const [neutrofilos, setNeutrofilos] = useState();
const [eosinofilos, setEosinofilos] = useState();
const [plaquetas, setPlaquetas] = useState();
const [vsg, setVsg] = useState();
const [glucosa, setGlucosa] = useState();
const [urea, setUrea] = useState();
const [acidoUrico, setAcidoUrico] = useState();
const [creatinina, setCreatinina] = useState();
const [colesterol, setColesterol] = useState();
const [trigliceridos, setTrigliceridos] = useState();
const [transaminasas, setTransaminasas] = useState();
const [fosfatasaAlcalina, setFosfatasaAlcalina] = useState();
const [calcio, setCalcio] = useState();
const [hierro, setHierro] = useState();
const [potasio, setPotasio] = useState();
const [sodio, setSodio] = useState();
const [bilirrubina, setBilirrubina] = useState();

const [error, setError] = useState();
const history = useHistory();

const submit = async (e) => {
e.preventDefault();
try{
const newUser = {fecha,observaciones,cita,paciente,medico, tipoInforme, hematies, hemoglobina, hematocrito,vcm,hcm,linfocitos,neutrofilos,
    eosinofilos, plaquetas, vsg,glucosa,urea,acidoUrico,creatinina,colesterol,trigliceridos,transaminasas, fosfatasaAlcalina,calcio,
    hierro,potasio,sodio,bilirrubina};
await axios.post("http://localhost:5000/informes/analisis/sangre/add", newUser);

history.push("/");
} catch(err) {
err.response.data.msg && setError(err.response.data.msg)
}
};

    return (
    <div className="form-horizontal">
    <h2>Crear informe sangre:</h2>
    {error && <ErrorNotice message={error} clearError={() => setError(undefined)} />}
    <form onSubmit={submit}>
    <div class="input">
    <div class="registerAux">
    <div class="inputBox">
    <label>Fecha: </label><br></br>
    <input type="datetime-local" id="fecha" onChange={e => setFecha(e.target.value)}/><br></br>
    </div>
    <div class="inputBox">
    <label>Observaciones: </label><br></br>
    <textarea id="observaciones" onChange={e => setObservaciones(e.target.value)}/><br></br>
    </div>
    </div>
    <div class="registerAux">
    <div class="inputBox-sangre">
    <label>Hematies: </label><br></br>
    <input type="number" step="0.01" id="sangreInp" onChange={e => setHematies(e.target.value)}/><br></br>
    </div>
    <div class="inputBox-sangre">
    <label>Hemoglobina: </label><br></br>
    <input type="number" step="0.01" id="sangreInp" onChange={e => setHemoglobina(e.target.value)}/><br></br>
    </div>
    <div class="inputBox-sangre">
    <label>Hematocrito: </label><br></br>
    <input type="number" step="0.01" id="sangreInp" onChange={e => setHematocrito(e.target.value)}/><br></br>
    </div>
    <div class="inputBox-sangre">
    <label>VCM: </label><br></br>
    <input type="number" step="0.01" id="sangreInp" onChange={e => setVcm(e.target.value)}/><br></br>
    </div>
    <div class="inputBox-sangre">
    <label>HCM: </label><br></br>
    <input type="number" step="0.01" id="sangreInp" onChange={e => setHcm(e.target.value)}/><br></br>
    </div>
    </div>
    <div class="registerAux">
    <div class="inputBox-sangre">
    <label>Linfocitos: </label><br></br>
    <input type="number" step="0.01" id="sangreInp" onChange={e => setLinfocitos(e.target.value)}/><br></br>
    </div>
    <div class="inputBox-sangre">
    <label>Neutrofilos: </label><br></br>
    <input type="number" step="0.01" id="sangreInp" onChange={e => setNeutrofilos(e.target.value)}/><br></br>
    </div>
    <div class="inputBox-sangre">
    <label>Eosinofilos: </label><br></br>
    <input type="number" step="0.01" id="sangreInp" onChange={e => setEosinofilos(e.target.value)}/><br></br>
    </div>
    <div class="inputBox-sangre">
    <label>Plaquetas: </label><br></br>
    <input type="number" step="0.01" id="sangreInp" onChange={e => setPlaquetas(e.target.value)}/><br></br>
    </div>
    <div class="inputBox-sangre">
    <label>VSG: </label><br></br>
    <input type="number" step="0.01" id="sangreInp" onChange={e => setVsg(e.target.value)}/><br></br>
    </div>
    </div>
    <div class="registerAux">
    <div class="inputBox-sangre">
    <label>Glucosa: </label><br></br>
    <input type="number" step="0.01" id="sangreInp" onChange={e => setGlucosa(e.target.value)}/><br></br>
    </div>
    <div class="inputBox-sangre">
    <label>Urea: </label><br></br>
    <input type="number" step="0.01" id="sangreInp" onChange={e => setUrea(e.target.value)}/><br></br>
    </div>
    <div class="inputBox-sangre">
    <label>Ácido úrico: </label><br></br>
    <input type="number" step="0.01" id="sangreInp" onChange={e => setAcidoUrico(e.target.value)}/><br></br>
    </div>
    <div class="inputBox-sangre">
    <label>Creatinina: </label><br></br>
    <input type="number" step="0.01" id="sangreInp" onChange={e => setCreatinina(e.target.value)}/><br></br>
    </div>
    <div class="inputBox-sangre">
    <label>Colesterol: </label><br></br>
    <input type="number" step="0.01" id="sangreInp" onChange={e => setColesterol(e.target.value)}/><br></br>
    </div>
    </div>
    <div class="registerAux">
    <div class="inputBox-sangre">
    <label>Trigliceridos: </label><br></br>
    <input type="number" step="0.01" id="sangreInp" onChange={e => setTrigliceridos(e.target.value)}/><br></br>
    </div>
    <div class="inputBox-sangre">
    <label>Transaminasas: </label><br></br>
    <input type="number" step="0.01" id="sangreInp" onChange={e => setTransaminasas(e.target.value)}/><br></br>
    </div>
    <div class="inputBox-sangre">
    <label>Fosfatasa Alcalina: </label><br></br>
    <input type="number" step="0.01" id="sangreInp" onChange={e => setFosfatasaAlcalina(e.target.value)}/><br></br>
    </div>
    <div class="inputBox-sangre">
    <label>Calcio: </label><br></br>
    <input type="number" step="0.01" id="sangreInp" onChange={e => setCalcio(e.target.value)}/><br></br>
    </div>
    <div class="inputBox-sangre">
    <label>Hierro: </label><br></br>
    <input type="number" step="0.01" id="sangreInp" onChange={e => setHierro(e.target.value)}/><br></br>
    </div>
    </div>
    <div class="registerAux">
    <div class="inputBox-sangre">
    <label>Potasio: </label><br></br>
    <input type="number" step="0.01" id="sangreInp" onChange={e => setPotasio(e.target.value)}/><br></br>
    </div>
    <div class="inputBox-sangre">
    <label>Sodio: </label><br></br>
    <input type="number" step="0.01" id="sangreInp" onChange={e => setSodio(e.target.value)}/><br></br>
    </div>
    <div class="inputBox-sangre">
    <label>Bilirrubina: </label><br></br>
    <input type="number" step="0.01" id="sangreInp" onChange={e => setBilirrubina(e.target.value)}/><br></br>
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
export default CrearInformeSangre;