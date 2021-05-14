import React, { useState, useContext,useEffect } from 'react';
import { useHistory, Redirect, useParams } from "react-router-dom";
import Checkbox from '@material-ui/core/Checkbox';
import axios from "axios";
import ErrorNotice from "../../components/misc/ErrorNotice";
import UserContext from "../../context/userContext";
import Select from 'react-select';
import Async from 'react-async';
import api from '../../api'
function CrearInformeOrina () {
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
const [densidad, setDensidad] = useState();
const [ph, setPh] = useState();
const [glucosa, setGlucosa] = useState();
const [proteina, setProteina] = useState();
const [hematies, setHematies] = useState();
const [leufocitos, setLeufocitos] = useState();
const [cetonas, setCetonas] = useState();
const [bilirrubina, setBilirrubina] = useState();
const [nitritos, setNitritos] = useState();
const [cristales, setCristales] = useState();
const [celulasEpiteliales, setCelulasEpiteliales] = useState();
const [cilindros, setCilindros] = useState();
const [bacterias, setBacterias] = useState();

const [error, setError] = useState();
const history = useHistory();

const submit = async (e) => {
e.preventDefault();
try{
const newUser = {fecha,observaciones,cita,paciente,medico, tipoInforme, densidad, ph, glucosa,proteina,hematies,leufocitos,cetonas,
    bilirrubina, nitritos, cristales,celulasEpiteliales,cilindros,bacterias};
await axios.post("http://localhost:5000/informes/analisis/orina/add", newUser);

history.push("/");
} catch(err) {
err.response.data.msg && setError(err.response.data.msg)
}
};

    return (
    <div className="form-horizontal">
    <h2>Crear consulta</h2>
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
    <label>Densidad: </label><br></br>
    <input type="number" step="0.01" id="densidad" onChange={e => setDensidad(e.target.value)}/><br></br>
    </div>
    <div class="inputBox-sangre">
    <label>PH: </label><br></br>
    <input type="number" step="0.01" id="ph" onChange={e => setPh(e.target.value)}/><br></br>
    </div>
    <div class="inputBox-sangre">
    <label>Glucosa: </label><br></br>
    <input type="number" step="0.01" id="glucosa" onChange={e => setGlucosa(e.target.value)}/><br></br>
    </div>
    <div class="inputBox-sangre">
    <label>Proteina: </label><br></br>
    <input type="number" step="0.01" id="proteina" onChange={e => setProteina(e.target.value)}/><br></br>
    </div>
    <div class="inputBox-sangre">
    <label>Hematies: </label><br></br>
    <input type="number" step="0.01" id="hematies" onChange={e => setHematies(e.target.value)}/><br></br>
    </div>
    </div>
    <div class="registerAux">
    <div class="inputBox-sangre">
    <label>Leufocitos: </label><br></br>
    <input type="number" step="0.01" id="leufocitos" onChange={e => setLeufocitos(e.target.value)}/><br></br>
    </div>
    <div class="inputBox-sangre">
    <label>Cetonas: </label><br></br>
    <input type="number" step="0.01" id="cetonas" onChange={e => setCetonas(e.target.value)}/><br></br>
    </div>
    <div class="inputBox-sangre">
    <label>Bilirrubina: </label><br></br>
    <input type="number" step="0.01" id="bilirrubina" onChange={e => setBilirrubina(e.target.value)}/><br></br>
    </div>
    <div class="inputBox-sangre">
    <label>Nitritos: </label><br></br>
    <Checkbox id="nitritos" onClick={e => setNitritos(estadoCheckbox(e))}/><br></br>
    </div>
    <div class="inputBox-sangre">
    <label>Cristales: </label><br></br>
    <Checkbox id="cristales" onChange={e => setCristales(e.target.checked)}/><br></br>
    </div>
    </div>
    <div class="registerAux">
    <div class="inputBox-sangre">
    <label>Células epiteliales: </label><br></br>
    <Checkbox id="celulasEpiteliales" onChange={e => setCelulasEpiteliales(e.target.checked)}/><br></br>
    </div>
    <div class="inputBox-sangre">
    <label>Cilindros: </label><br></br>
    <Checkbox id="cilindros" onChange={e => setCilindros(e.target.checked)}/><br></br>
    </div>
    <div class="inputBox-sangre">
    <label>Bacterias: </label><br></br>
    <Checkbox id="bacterias" onChange={e => setBacterias(e.target.checked)}/><br></br>
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

function estadoCheckbox(e){
    let bol;
    if(e.target.checked){
        bol= true;
    }else{
        bol= false;
    }
    return bol;
}
export default CrearInformeOrina;