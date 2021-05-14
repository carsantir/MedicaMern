import React, { useState, useContext,useEffect } from 'react';
import { useHistory, Redirect,useParams } from "react-router-dom";
import axios from "axios";
import ErrorNotice from "../../components/misc/ErrorNotice";
import UserContext from "../../context/userContext";
import Select from 'react-select';
import Async from 'react-async';
import api from '../../api'
function CrearEnfermedad () {
const [tipoEnfermedad, setTipoEnfermedad] = useState();
const [nombre, setNombre] = useState();
const [descripcion, setDescripcion] = useState();
const { userData } = useContext(UserContext);
const medico = userData.user.id;
const  idPaciente  = useParams()
const paciente = idPaciente.id
const [error, setError] = useState();
const history = useHistory();
const onChange = async (selectedOption) => {

    console.log(`Option selected:`, selectedOption);
    setTipoEnfermedad(selectedOption.val);
    
  };
const submit = async (e) => {
e.preventDefault();
try{
const newUser = {tipoEnfermedad,nombre,descripcion,paciente,medico};
await axios.post("http://localhost:5000/enfermedades/add", newUser);

history.push("/");
} catch(err) {
err.response.data.msg && setError(err.response.data.msg)
}
};
    const sacaTipoEnfermedad = () =>
    api.getTipoEnfermedad()
    .then(res => {return res})

    return (
    <div className="form">
    <h2>Crear enfermedad</h2>
    {error && <ErrorNotice message={error} clearError={() => setError(undefined)} />}
    <form onSubmit={submit}>
    <div class="input">
    <div class="inputBox">
    <label>Nombre: </label><br></br>
    <input type="text" id="nombre" onChange={e => setNombre(e.target.value)}/><br></br>
    </div>
    <div class="inputBox">
    <label>Tipo de enfermedad </label><br></br>
    <Async promiseFn={sacaTipoEnfermedad}>

{({ data, err }) => {
          if (err) return `Something went wrong: ${err.message}`

          if (data){

            const selectTipoEnfermedad = [];
            data.data.data.map((enfermedad) => { selectTipoEnfermedad.push({ desc:enfermedad, val: enfermedad  })});

            return (
                <Select options={selectTipoEnfermedad} getOptionLabel={(option)=>option.desc}
                getOptionValue={(option)=>option.val } id="selectTipoEnfermedad" placeholder="Selecciona un tipo de enfermedad" onChange={onChange} ></Select>
                
            )}
        }}
</Async>
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
export default CrearEnfermedad;