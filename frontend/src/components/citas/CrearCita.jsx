import React, { useState, useContext,useEffect  } from 'react';
import { useHistory, Redirect,useParams  } from "react-router-dom";
import axios from "axios";
import ErrorNotice from "../../components/misc/ErrorNotice";
import UserContext from "../../context/userContext";
import api from '../../api'
import Select from 'react-select';
import Async from 'react-async';

function CrearCita () {
const [fecha, setFecha] = useState();
const [motivo, setMotivo] = useState();
const [tipoCita, setTipoCita] = useState();
const [tipoAnalisis, setTipoAnalisis] = useState();
const { id } = useParams()
const { idPaciente } = useParams()
const { userData, setUserData } = useContext(UserContext);
const consulta = id;
const paciente = idPaciente;
const medico = userData.user.id;
const [error, setError] = useState();
const history = useHistory();

const onChange = async (selectedOption) => {

    console.log(`Option selected:`, selectedOption);
    setTipoCita(selectedOption.val);
    
  };

const onChange2 = async (selectedOption) => {

console.log(`Option selected:`, selectedOption);
setTipoAnalisis(selectedOption.val);


};


const submit = async (e) => {
e.preventDefault();
try{
const aux = await api.getUserById(paciente)
const aux2 = await api.getProvinciaById(aux.data.data.ciudad)
const aux3 = await api.getHospitalById(aux.data.data.centroMedico)
const ciudad = aux2.data.data.provincia;
const centroMedico = aux3.data.data.nombre;
const newCita = {fecha,ciudad,centroMedico,motivo,consulta,paciente,medico,tipoCita,tipoAnalisis};
await axios.post("http://localhost:5000/citas/add", newCita);

history.push(userData.user.id+"/consultas");
} catch(err) {
err.response.data.msg && setError(err.response.data.msg)
}
};

const sacaCitas = () =>
    api.getTipoCita()
    .then(res => {return res})

const sacaAnalisis = () =>
    api.getTipoAnalisis()
    .then(res => {return res})


    return (
    <div className="form-horizontal">
    <h2>Crear cita</h2>
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
    <div class="registerAux">
    <div class="inputBox">
    <label>Tipo de Cita: </label><br></br>
    <Async promiseFn={sacaCitas}>

    {({ data, err }) => {
            if (err) return `Something went wrong: ${err.message}`

            if (data){

                const selectcita = [];
                data.data.data.map((cita) => { selectcita.push({ desc:cita, val: cita  })});

                return (
                    <Select options={selectcita} getOptionLabel={(option)=>option.desc}
                    getOptionValue={(option)=>option.val } id="selectcita" placeholder="Selecciona una cita" onChange={onChange} ></Select>
                    
                )}
            }}
    </Async>
    </div>
    <div class="inputBox">
    <Prueba analisis={sacaAnalisis} cambia={onChange2} cita={tipoCita}/>
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


function Prueba(props){
    if(props.cita=="análisis"){
    return(
<div>
<label>Tipo de análisis: </label><br></br>
<Async promiseFn={props.analisis}>
    

{({ data, err }) => {
        if (err) return `Something went wrong: ${err.message}`

        if (data){

            const selectcita = [];
            data.data.data.map((cita) => { selectcita.push({ desc:cita, val: cita  })});

            return (
                <Select options={selectcita} getOptionLabel={(option)=>option.desc}
                getOptionValue={(option)=>option.val } id="selectcita" placeholder="Selecciona una cita" onChange={props.cambia} ></Select>
                
            )}
        }}
</Async>
</div>);

    }else{
        return(
            <div></div>
        );
    }
    }
export default CrearCita;