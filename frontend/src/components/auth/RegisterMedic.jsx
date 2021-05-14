import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import axios from "axios";
import UserContext from "../../context/userContext";
import ErrorNotice from "../misc/ErrorNotice";
import Select from 'react-select';
import Async from 'react-async';
import FileBase from 'react-file-base64';
import api from '../../api'
function Register () {
const [email, setEmail] = useState();
const [password, setPassword] = useState();
const [passwordCheck, setPasswordCheck] = useState();
const [nickname, setNickname] = useState();
const rol = "Médico";
const [nombre, setNombre] = useState();
const [apellidos, setApellidos] = useState();
const [fechaNacimiento, setFechaNacimiento] = useState();
const [dni, setDni] = useState();
const [sexo, setSexo] = useState();
const [direccion, setDireccion] = useState();
const [ciudad, setCiudad] = useState();
const [centroMedico, setCentroMedico] = useState();
const [localidad, setLocalidad] = useState();
const[aux,setAux]=useState();
const [cp, setCp] = useState();
const [telefono, setTelefono] = useState();
const [imgPerfil, setImgPerfil] = useState();
const [sector, setSector] = useState();
const [error, setError] = useState();
const history = useHistory();
const onChange = async (selectedOption) => {

    console.log(`Option selected:`, selectedOption);
    setSector(selectedOption.val);
  };

  const onChange2 = async (selectedOption) => {

    console.log(`Option selected:`, selectedOption);
    setCentroMedico(selectedOption.val);
    
    
    };

    const onChange3 = async (selectedOption) => {

      console.log(`Option selected:`, selectedOption);
      setCiudad(selectedOption.val);
      setAux(selectedOption.desc)
      
    };
const submit = async (e) => {
e.preventDefault();
try{
const newUser = {email, password, passwordCheck, nickname,rol, nombre, apellidos, fechaNacimiento, dni, sexo, direccion, ciudad, localidad, cp, telefono,sector,centroMedico,imgPerfil};
await axios.post("http://localhost:5000/medics/register", newUser);
// const loginResponse = await axios.post("http://localhost:5000/users/login", {
// email, password
// });
// setUserData({
// token: loginResponse.data.token,
// user: loginResponse.data.user
// });
// localStorage.setItem("auth-token", loginResponse.data.token);
history.push("/");
} catch(err) {
err.response.data.msg && setError(err.response.data.msg)
}
};
const sacaSector = () =>
api.getSector()
.then(res => {return res})

const sacaProvincia = () =>
    api.getProvincias()
    .then(res => {return res})

const sacaCentroMedico = () =>
api.getHospitales(aux)
.then(res => {return res})
return (
<div className="form-horizontal">
<h2>Registrar médico:</h2>
{error && <ErrorNotice message={error} clearError={() => setError(undefined)} />}
<form onSubmit={submit}>
<div class="input">
<div class="registerAux">
<div class="inputBox">
<label>Nombre: </label><br></br>
<input type="text" id="nombre" onChange={e => setNombre(e.target.value)}/><br></br>
</div>
<div class="inputBox">
<label>Apellidos: </label><br></br>
<input type="text" id="apellidos" onChange={e => setApellidos(e.target.value)}/><br></br>
</div>
</div>
<div class="registerAux">
<div class="inputBox">
<label>Nombre de usuario: </label><br></br>
<input type="text" id="nickname" onChange={e => setNickname(e.target.value)}/><br></br>
</div>
<div class="inputBox">
<label>Correo electrónico: </label><br></br>
<input type="email" id="email" onChange={e => setEmail(e.target.value)}/><br></br>
</div>
</div>
<div class="registerAux">
<div class="inputBox">
<label>Contraseña: </label><br></br>
<input type="password" id="password" onChange={e => setPassword(e.target.value)}/><br></br>
</div>
<div class="inputBox">
<label>Confirma contraseña: </label><br></br>
<input type="password" placeholder="Confirma la contraseña" onChange={e => setPasswordCheck(e.target.value)}/><br></br>
</div>
</div>
<div class="registerAux">
<div class="inputBox">
<label>Sexo: </label><br></br>
<input type="text" id="sexo" onChange={e => setSexo(e.target.value)}/><br></br>
</div>
<div class="inputBox">
<label>Fecha Nacimiento: </label><br></br>
<input type="date" id="fechaNacimiento" onChange={e => setFechaNacimiento(e.target.value)}/><br></br>
</div>
</div>
<div class="registerAux">
<div class="inputBox">
<label>Dni: </label><br></br>
<input type="text" id="dni" onChange={e => setDni(e.target.value)}/><br></br>
</div>
<div class="inputBox">
<label>Sector </label><br></br>
<Async promiseFn={sacaSector}>

{({ data, err }) => {
          if (err) return `Something went wrong: ${err.message}`

          if (data){

            const selectSector = [];
            data.data.data.map((sector) => { selectSector.push({ desc:sector, val: sector  })});

            return (
                <Select options={selectSector} getOptionLabel={(option)=>option.desc}
                getOptionValue={(option)=>option.val } id="selectSector" placeholder="Selecciona un sector" onChange={onChange} ></Select>
                
            )}
        }}
</Async><br></br>
</div>
</div>
<div class="registerAux">
<div class="inputBox">
<label>Ciudad: </label><br></br>
<Async promiseFn={sacaProvincia}>

{({ data, err }) => {
        if (err) return `Something went wrong: ${err.message}`

        if (data){

            const selectProvincia = [];
            data.data.data.map((provincia) => { selectProvincia.push({ desc:provincia.provincia, val: provincia._id  })});

            return (
                <Select
                options={selectProvincia} getOptionLabel={(option)=>option.desc}
                getOptionValue={(option)=>option.val } id="selectProvincia" placeholder="Selecciona una provincia" onChange={onChange3} ></Select>
                
            )}
        }}
</Async>
</div>
<div class="inputBox">
    <CentroMedico centroMedico={sacaCentroMedico} cambia={onChange2} ciudad={ciudad}/>
    </div>
</div>
<div class="registerAux">
<div class="inputBox">
<label>Localidad: </label><br></br>
<input type="text" id="localidad" onChange={e => setLocalidad(e.target.value)}/><br></br>
</div>
<div class="inputBox">
<label>Código Postal: </label><br></br>
<input type="text" id="cp" onChange={e => setCp(e.target.value)}/><br></br>
</div>
</div>
<div class="registerAux">
<div class="inputBox">
<label>Dirección: </label><br></br>
<input type="text" id="direccion" onChange={e => setDireccion(e.target.value)}/><br></br>
</div>
<div class="inputBox">
<label>Teléfono: </label><br></br>
<input type="text" id="telefono" onChange={e => setTelefono(e.target.value)}/><br></br>
</div>
</div>
<div id="subidaFoto" class="inputBox">
<label>Imagen de perfil: </label><br></br>
<FileBase type="file" multiple={false} onDone={({ base64 }) => setImgPerfil(base64)} /><br></br>
{/* <input type="text" id="imgPerfil" onChange={e => setImgPerfil(e.target.value)}/><br></br> */}
</div>
<br></br>
<div id="registrarPac" class="inputBox">
<input type="submit" value="Registrar" className="registrar" />
</div>
</div>
</form>
</div>
);
}

function CentroMedico(props){
  return(
<div>
<label>Centro médico: </label><br></br>
<Async promiseFn={props.centroMedico}>
  

{({ data, err }) => {
      if (err) return `Something went wrong: ${err.message}`

      if (data){

          const selectCentroMedico = [];
          data.data.data.map((centroMedico) => { selectCentroMedico.push({ desc:centroMedico.nombre, val: centroMedico._id  })});

          return (
              <Select 
              noOptionsMessage={() => 'Debes seleccionar una provincia'} 
              options={selectCentroMedico} getOptionLabel={(option)=>option.desc}
              getOptionValue={(option)=>option.val } id="selectCentroMedico" placeholder="Selecciona un centro médico" onChange={props.cambia} ></Select>
              
          )}
      }}
</Async>
</div>);
  }

export default Register;