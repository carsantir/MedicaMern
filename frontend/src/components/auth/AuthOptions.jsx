import React, { useContext,useState } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from "../../context/userContext";
import moment from "moment";
import axios from "axios";
import api from '../../api'
function AuthOptions () {
const { userData, setUserData } = useContext(UserContext);
const [error, setError] = useState();
const history = useHistory();
const register = () => history.push("/register");
const login = () => history.push("/login");
const registerMedic = () => history.push("/registerMedic");
const consultas = () => history.push("/"+userData.user.id+"/consultas");
const covid19 = () => history.push("/"+userData.user.id+"/covid19");
const citas = () => history.push("/"+userData.user.id+"/citas");
const informes = () => history.push("/"+userData.user.id+"/informes");
const enfermedades = () => history.push("/"+userData.user.id+"/enfermedades");
const miPerfil = () => history.push("/"+userData.user.id);
const misPacientes = () => history.push("/"+userData.user.id+"/misPacientes")
const crearConsultaAtencionEspecialModel = async (e) => {
  e.preventDefault();
  try{
    const fecha = moment();
    const finalizada = false;
    const paciente = userData.user.id;
    const user = await api.getUserById(paciente);
    const medico = user.data.data.medico;
    const newUser = {fecha,finalizada,paciente,medico};
    await axios.post("http://localhost:5000/consultaAtencionEspecial/add", newUser);
    
    history.push("/");
    } catch(err) {
    err.response.data.msg && setError(err.response.data.msg)
    }
  
};
const logout = () => {
setUserData({
token: undefined,
user: undefined
})
localStorage.setItem("auth-token","");
};
if(userData.user){
  if(userData.user.rol=="Paciente"){
      return (<nav className="auth-options">
            <div class = "button-wrap">
    <button class = "rad-button wwt flat" onClick={crearConsultaAtencionEspecialModel}>Urgencia</button>
    </div>
    <div class = "button-wrap">
    <button class = "rad-button wwt flat" onClick={covid19}>COVID-19</button>
    </div>
    <div class = "button-wrap">
        <button class = "rad-button wwt flat" onClick={consultas}>Consultas</button>
      </div>
    <div class = "button-wrap">
    <button class = "rad-button wwt flat" onClick={miPerfil}>Mi Perfil</button>
    </div>
          <div class = "button-wrap">
        <button class = "rad-button wwt flat" onClick={logout}>Cerrar sesión</button>
      </div>
 
   
      {/* <div class = "button-wrap">
        <button class = "rad-button wwt flat" onClick={citas}>Citas</button>
      </div> */}

      {/* <div class = "button-wrap">
        <button class = "rad-button wwt flat" onClick={informes}>Informes</button>
      </div> */}

      {/* <div class = "button-wrap">
        <button class = "rad-button wwt flat" onClick={enfermedades}>Enfermedades</button>
      </div> */}
  </nav>)
  }else if(userData.user.rol=="Médico"){
    return (<nav className="auth-options">
  <br></br>
  <div class = "button-wrap">
  <button class = "rad-button wwt flat" onClick={consultas}>Consultas</button>
  </div>
  <br></br>
  <div class = "button-wrap">
    <button class = "rad-button wwt flat" onClick={covid19}>COVID-19</button>
    </div>
  <br></br>
  <div class = "button-wrap">
  <button class = "rad-button wwt flat" onClick={citas}>Citas</button>
  </div>
  <br></br>
  <div class = "button-wrap">
  <button class = "rad-button wwt flat" onClick={misPacientes}>Mis Pacientes</button>
  </div>
  {/* <div class = "button-wrap">
  <button class = "rad-button wwt flat" onClick={informes}>Informes</button>
  </div>
  <br></br>
  <div class = "button-wrap">
  <button class = "rad-button wwt flat" onClick={enfermedades}>Enfermedades</button>
  </div> */}
      <div class = "button-wrap">
    <button class = "rad-button wwt flat" onClick={miPerfil}>Mi Perfil</button>
    </div>
  <div class = "button-wrap">
  <button class = "rad-button wwt flat" onClick={logout}>Cerrar sesión</button>
  </div>
  </nav>)
  }
}else{
    return (<nav className="auth-options">
                    <div class = "button-wrap">
                    <button class = "rad-button wwt flat" onClick={register}>Registrar</button>
                    </div>
                    <br></br>
                    <div class = "button-wrap">
                    <button class = "rad-button wwt flat" onClick={registerMedic}>Registrar médico</button>
                    </div>
                    <br></br>
                    <div class = "button-wrap">
                    <button class = "rad-button wwt flat" onClick={login}>Iniciar sesión</button>
                    </div>
            </nav>)
}
}
export default AuthOptions;