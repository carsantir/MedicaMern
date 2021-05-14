import React, { useState, useContext,useEffect } from 'react';
import { useHistory, Redirect } from "react-router-dom";
import axios from "axios";
import ErrorNotice from "../../components/misc/ErrorNotice";
import UserContext from "../../context/userContext";
import Select from 'react-select';
import Async from 'react-async';
import api from '../../api'
import moment from "moment";
function RegistrarTension () {
const fechaHora = moment().format("MM-DD-YYYY HH:mm")
const [presionSistole, setPresionSistole] = useState();
const [presionDiastole, setPresionDiastole] = useState();
const [pulsaciones, setPulsaciones] = useState();
const { userData } = useContext(UserContext);
const paciente = userData.user.id;
const [error, setError] = useState();
const history = useHistory();

const submit = async (e) => {
e.preventDefault();
try{
const newUser = {fechaHora,presionSistole,presionDiastole,pulsaciones,paciente};
await axios.post("http://localhost:5000/registroTension/add", newUser);

history.push("/"+userData.user.id+"/registrosTension");
} catch(err) {
err.response.data.msg && setError(err.response.data.msg)
}
};

    return (
    <div className="form">
    <h2>Crear registro tensión arterial</h2>
    {error && <ErrorNotice message={error} clearError={() => setError(undefined)} />}
    <form onSubmit={submit}>
    <div class="input">
    <div class="inputBox">
    <label>Presión sístole: </label><br></br>
    <input type="number" step="0.01" id="presionSistole" onChange={e => setPresionSistole(e.target.value)}/><br></br>
    </div>
    <div class="inputBox">
    <label>Presión diástole: </label><br></br>
    <input type="number" step="0.01" id="presionDiastole" onChange={e => setPresionDiastole(e.target.value)}/><br></br>
    </div>
    <div class="inputBox">
    <label>Pulsaciones: </label><br></br>
    <input type="number" id="pulsaciones" onChange={e => setPulsaciones(e.target.value)}/><br></br>
    </div>
    <div class="inputBox">
    <input type="submit" value="Registrar" className="btn btn-primary" />
    </div>
    </div>
    </form>
    </div>
    );
}
export default RegistrarTension;