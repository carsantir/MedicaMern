import React, { useState, useContext,useEffect } from 'react';
import { useHistory, Redirect,useParams } from "react-router-dom";
import axios from "axios";
import ErrorNotice from "../../components/misc/ErrorNotice";
import UserContext from "../../context/userContext";
import Select from 'react-select';
import Async from 'react-async';
import api from '../../api'
function CrearTratamientoMedicacion () {
const [cantidadTomar, setCantidadTomar] = useState();
const [cantidadCaja, setCantidadCaja] = useState();
const [fecha1, setFecha1] = useState();
const [fecha2,setFecha2] = useState();
const [medicamento,setMedicamento] = useState();
const idEnfermedad = useParams()
const enfermedad = idEnfermedad.idEnfermedad
const { userData } = useContext(UserContext);
const [error, setError] = useState();
const history = useHistory();
const onChange = async (selectedOption) => {

    console.log(`Option selected:`, selectedOption);
    setMedicamento(selectedOption.val);
    
  };

const onChange2 = async (valor) => {

    setFecha2(valor.target.value);

};
const submit = async (e) => {
e.preventDefault();
try{
const newUser = {cantidadTomar,cantidadCaja,fecha1,fecha2,medicamento,enfermedad};
await axios.post("http://localhost:5000/tratamientoMedicacion/add", newUser);

history.push("/");
} catch(err) {
err.response.data.msg && setError(err.response.data.msg)
}
};
    const sacaMedicamentos = () =>
    api.getMedicamentos()
    .then(res => {return res})

    return (
    <div className="form">
    <h2>Crear enfermedad</h2>
    {error && <ErrorNotice message={error} clearError={() => setError(undefined)} />}
    <form onSubmit={submit}>
    <div class="input">
    <div class="inputBox">
    <label>Medicamento: </label><br></br>
    <Async promiseFn={sacaMedicamentos}>

{({ data, err }) => {
          if (err) return `Something went wrong: ${err.message}`

          if (data){

            const selectMedicamento = [];
            data.data.data.map((medicamento) => { selectMedicamento.push({ desc:medicamento.nombre, val: medicamento._id  })});

            return (
                <Select options={selectMedicamento} getOptionLabel={(option)=>option.desc}
                getOptionValue={(option)=>option.val } id="selectMedicamento" placeholder="Selecciona un medicamento" onChange={onChange} ></Select>
                
            )}
        }}
</Async>
    </div>
    <div class="inputBox">
    <label>Cantidad de la caja: </label><br></br>
    <input type="number" id="cantidadCaja" onChange={e => setCantidadCaja(e.target.value)}/><br></br>
    </div>
    <div class="inputBox">
    <label>Cantidad que tomar: </label><br></br>
    <input type="number" id="cantidadTomar" onChange={e => setCantidadTomar(e.target.value)}/><br></br>
    </div>
    <div class="inputBox">
    <label>Hora: </label><br></br>
    <input type="datetime-local" id="fecha1" onChange={e => setFecha1(e.target.value)}/><br></br>
    </div>
    <Fecha2 cantidadTomar={cantidadTomar} cambia={onChange2}/>
    <div class="inputBox">
    <input type="submit" value="Crear" className="btn btn-primary" />
    </div>
    </div>
    </form>
    </div>
    );
}

function Fecha2(props){
    if(props.cantidadTomar==2){
        return(
            <div class="inputBox">
            <label>Hora 2: </label><br></br>
            <input type="datetime-local" id="fecha2" onChange={props.cambia}/><br></br>
            </div>  
        );
    }else{
        return(
        <div></div>
        );}
}
export default CrearTratamientoMedicacion;