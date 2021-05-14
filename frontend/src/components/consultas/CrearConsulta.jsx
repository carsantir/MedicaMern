import React, { useState, useContext,useEffect } from 'react';
import { useHistory, Redirect } from "react-router-dom";
import axios from "axios";
import ErrorNotice from "../../components/misc/ErrorNotice";
import UserContext from "../../context/userContext";
import Select from 'react-select';
import Async from 'react-async';
import api from '../../api'
import moment from "moment";
function CrearConsulta () {
const fecha = moment().format("MM-DD-YYYY HH:mm")
const [motivo, setMotivo] = useState();
const [descripcion, setDescripcion] = useState();
const { userData } = useContext(UserContext);
const paciente = userData.user.id;
const [error, setError] = useState();
const history = useHistory();
// const onChange = async (selectedOption) => {

//     console.log(`Option selected:`, selectedOption);
//     setMedico(selectedOption.val);
    
//   };

const submit = async (e) => {
e.preventDefault();
try{
const user = await api.getUserById(paciente);
const medico = user.data.data.medico;
const newUser = {fecha,motivo,descripcion,paciente,medico};
await axios.post("http://localhost:5000/enquiries/add", newUser);

history.push("/"+userData.user.id+"/consultas");
} catch(err) {
err.response.data.msg && setError(err.response.data.msg)
}
};

// const sacaMedicos = () =>
//     api.getMedics()
//     .then(res => {return res})

    return (
    <div className="form">
    <h2>Crear consulta</h2>
    {error && <ErrorNotice message={error} clearError={() => setError(undefined)} />}
    <form onSubmit={submit}>
    <div class="input">
    <div class="inputBox">
    <label>Motivo: </label><br></br>
    <input type="text" id="motivo" onChange={e => setMotivo(e.target.value)}/><br></br>
    </div>
    <div class="inputBox">
    <label>Descripción: </label><br></br>
    <input type="text" id="descripcion" onChange={e => setDescripcion(e.target.value)}/><br></br>
    </div>
    {/* <Async promiseFn={sacaMedicos}>

{({ data, err }) => {
          if (err) return `Something went wrong: ${err.message}`

          if (data){

            const selectmedico = [];
            data.data.data.map((medico) => { selectmedico.push({ desc:medico.nombre+" "+medico.apellidos, val: medico._id  })});

            return (
                <Select options={selectmedico} getOptionLabel={(option)=>option.desc}
                getOptionValue={(option)=>option.val } id="selectMedico" placeholder="Selecciona un médico" onChange={onChange} ></Select>
                
            )}
        }}
</Async> */}
    <div class="inputBox">
    <input type="submit" value="Crear" className="btn btn-primary" />
    </div>
    </div>
    </form>
    </div>
    );
}
export default CrearConsulta;