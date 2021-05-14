import React, { useState, useContext,useEffect  } from 'react';
import { useHistory, Redirect,useParams  } from "react-router-dom";
import axios from "axios";
import ErrorNotice from "../../components/misc/ErrorNotice";
import UserContext from "../../context/userContext";
import api from '../../api'
import Select from 'react-select';
import Async from 'react-async';

function CrearCitaPcr () {
const [fecha, setFecha] = useState();
const [motivo, setMotivo] = useState();
const tipoCita="PCR"
const { id } = useParams()
const { idRegistro } = useParams()
const { userData, setUserData } = useContext(UserContext);
const consulta = id;
const medico = userData.user.id;
const [error, setError] = useState();
const history = useHistory();

const submit = async (e) => {
e.preventDefault();
try{
const aux = await api.getMedicById(medico)
const aux2 = await api.getProvinciaById(aux.data.data.ciudad)
const aux3 = await api.getHospitalById(aux.data.data.centroMedico)
const ciudad = aux2.data.data.provincia;
const centroMedico = aux3.data.data.nombre;
const registro = await api.getRegistroCovidById(idRegistro)
const paciente = registro.data.data.paciente;
const registroCovid = registro.data.data._id;
const newCita = {fecha,ciudad,centroMedico,motivo,consulta,paciente,medico,tipoCita,registroCovid};
await axios.post("http://localhost:5000/citasPcr/add", newCita);

history.push(userData.user.id+"/covid19");
} catch(err) {
err.response.data.msg && setError(err.response.data.msg)
}
};



    return (
    <div className="form-horizontal">
    <h2>Crear cita de PCR</h2>
    {error && <ErrorNotice message={error} clearError={() => setError(undefined)} />}
    <form onSubmit={submit}>
    <div class="input">
    <div class="registerAux">
    <div class="inputBox">
    <label>Fecha: </label><br></br>
    <input type="date" id="fecha" onChange={e => setFecha(e.target.value)}/><br></br>
    </div>
    <div class="inputBox">
    <label>Motivo: </label><br></br>
    <input type="text" id="motivo" onChange={e => setMotivo(e.target.value)}/><br></br>
    </div>
    </div>
    <div id="registrarPac" class="inputBox">
    <br></br>
    <input type="submit" value="Crear" className="btn btn-primary" />
    </div>
    </div>
    </form>
    </div>
    );
}

export default CrearCitaPcr;