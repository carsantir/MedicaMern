import React, {useState, useEffect,useContext } from 'react';
import { BrowserRouter, Switch, Route,useHistory,useParams  } from 'react-router-dom';
import axios from 'axios';
import Header from './components/layout/Header';
import Home from './components/pages/Home';
import Register from './components/auth/Register';
import RegisterMedic from './components/auth/RegisterMedic';
import Login from './components/auth/Login';
import CrearConsulta from './components/consultas/CrearConsulta';
import EditarConsulta from './components/consultas/EditarConsulta';
import CrearMensaje from './components/mensajes/CrearMensaje';
import Citas from './components/citas/Citas';
import Informes from './components/informes/Informes'
import CrearCita from './components/citas/CrearCita';
import CrearCitaPcr from './components/citas/CrearCitaPcr'
import CrearInformeSangre from './components/informes/CrearInformeSangre';
import CrearInformeOrina from './components/informes/CrearInformeOrina';
import CrearInformePrueba from './components/informes/CrearInformePrueba';
import CrearInformePresencial from './components/informes/CrearInformePresencial';
import CrearInformePcr from './components/informes/CrearInformePcr';
import EditarCita from './components/citas/EditarCita';
import EditarInformeSangre from './components/informes/EditarInformeSangre';
import EditarInformeOrina from './components/informes/EditarInformeOrina';
import EditarInformePrueba from './components/informes/EditarInformePrueba';
import EditarInformePresencial from './components/informes/EditarInformePresencial';
import Enfermedades from './components/enfermedades/Enfermedades';
import CrearEnfermedad from './components/enfermedades/CrearEnfermedad'
import EditarEnfermedad from './components/enfermedades/EditarEnfermedad'
import Mensaje from './components/mensajes/Mensaje';
import Consulta from './components/consultas/Consulta';
import NoPerm from './components/pages/NoPermisos';
import MiPerfil from './components/perfil/MiPerfil';
import MisPacientes from './components/pacientes/MisPacientes';
import CrearTratamientoMedicacion from './components/tratamientos/CrearTratamientoMedicacion';
import CrearTratamientoRehabilitacion from './components/tratamientos/CrearTratamientoRehabilitacion';
import TratamientoMedicacion from './components/tratamientos/TratamientoMedicacion'
import TratamientoRehabilitacion from './components/tratamientos/TratamientoRehabilitacion'
import RegistrosTension from './components/registrosTension/RegistrosTension'
import RegistrarTension from './components/registrosTension/RegistrarTension'
import Covid19 from './components/covid19/Covid19'
import RegistrarCovid19 from './components/covid19/RegistrarCovid19'
import UserContext from './context/userContext';
import './App.css';
function App() {
const [ userData, setUserData] = useState({
token: undefined,
user: undefined
});
useEffect(() => {
const checkLoggedIn = async () => {
let token = localStorage.getItem("auth-token");
if(token === null){
localStorage.setItem("auth-token", "");
token = "";
}
const tokenResponse = await axios.post('http://localhost:5000/users/tokenIsValid', null, {headers: {"x-auth-token": token}});
if (tokenResponse.data) {
const userRes = await axios.get("http://localhost:5000/users/", {
headers: { "x-auth-token": token },
});
setUserData({
token,
user: userRes.data,
});
}
}
checkLoggedIn();
}, []);

if(userData.user && userData.user.rol=="Paciente"){
return (
    <BrowserRouter>
    <UserContext.Provider value={{ userData, setUserData }}>
    <Header/>
    <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/register" component={Register} />
    <Route path="/registerMedic" component={RegisterMedic} />
    <Route exact path="/:id/consultas" component={(props)=><Consulta {...props} userData={userData.user}/>} />
    <Route path="/:idUser/consultas/:id/edit" component={(props)=><EditarConsulta {...props} userData={userData.user}/>}/>
    <Route exact path="/:id/medico/:idMedico/mensajes" component={Mensaje} />
    <Route exact path="/crearConsulta" component={CrearConsulta} />
    <Route exact path="/crearMensaje" component={CrearMensaje} />
    <Route path="/:idUser/citas/:id/edit" component={(props)=><EditarCita {...props} userData={userData.user}/>}/>
    <Route exact path="/:id/informes" component={(props)=><Informes {...props} userData={userData.user}/>} />
    <Route exact path="/:id/citas" component={(props)=><Citas {...props} userData={userData.user}/>} />
    <Route exact path="/:id" component={(props)=><MiPerfil {...props} userData={userData.user}/>} />
    <Route exact path="/:id/medico/:idMedico/crearCita" component={CrearCita} />
    <Route path="/login" component={Login} />
    <Route exact path="/:id/enfermedades" component={(props)=><Enfermedades {...props} userData={userData.user}/>} />
    <Route exact path="/:id/enfermedades/:idEnfermedad/tratamientoMedicacion" component={(props)=><TratamientoMedicacion {...props} userData={userData.user}/>} />
    <Route exact path="/:id/enfermedades/:idEnfermedad/tratamientoRehabilitacion" component={(props)=><TratamientoRehabilitacion {...props} userData={userData.user}/>} />
    <Route exact path="/:id/registrosTension" component={(props)=><RegistrosTension {...props} userData={userData.user}/>} />
    <Route exact path="/:id/registrarTension" component={RegistrarTension} />
    <Route exact path="/:id/covid19" component={(props)=><Covid19 {...props} userData={userData.user}/>} />
    <Route exact path="/:id/covid19/crearRegistroCovid" component={RegistrarCovid19} />
    <Route path="/error" component={NoPerm} />
    </Switch>
    </UserContext.Provider>
    </BrowserRouter>
    );
}else if(userData.user && userData.user.rol=="Médico"){
    return (
        <BrowserRouter>
        <UserContext.Provider value={{ userData, setUserData }}>
        <Header />
        <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/registerMedic" component={RegisterMedic} />
        <Route exact path="/:id/consultas" component={(props)=><Consulta {...props} userData={userData.user}/>} />
        <Route path="/:idUser/consultas/:id/edit" component={(props)=><EditarConsulta {...props} userData={userData.user}/>}/>
        <Route exact path="/:id/mensajes" component={Mensaje} />
        <Route exact path="/crearConsulta" component={CrearConsulta} />
        <Route exact path="/crearMensaje" component={CrearMensaje} />
        <Route path="/:idUser/citas/:id/edit" component={(props)=><EditarCita {...props} userData={userData.user}/>}/>
        <Route exact path="/:id/citas" component={(props)=><Citas {...props} userData={userData.user}/>} />
        <Route exact path="/:id/informes" component={(props)=><Informes {...props} userData={userData.user}/>} />
        <Route exact path="/:id/medico/:idPaciente/crearCita" component={CrearCita} />
        <Route path="/:idUser/citas/:id/:tipoCita/:tipoAnalisis/crearInformeSangre" component={(props)=><CrearInformeSangre {...props} userData={userData.user}/>}/>
        <Route path="/:idUser/citas/:id/:tipoCita/:tipoAnalisis/crearInformeOrina" component={(props)=><CrearInformeOrina{...props} userData={userData.user}/>}/>
        <Route path="/:idUser/citas/:id/:tipoCita/crearInformePrueba" component={(props)=><CrearInformePrueba{...props} userData={userData.user}/>}/>
        <Route path="/:idUser/citas/:id/:tipoCita/crearInformePresencial" component={(props)=><CrearInformePresencial {...props} userData={userData.user}/>}/>
        <Route path="/:idUser/informesSangre/:id/edit" component={(props)=><EditarInformeSangre {...props} userData={userData.user}/>}/>
        <Route path="/:idUser/informesOrina/:id/edit" component={(props)=><EditarInformeOrina{...props} userData={userData.user}/>}/>
        <Route path="/:idUser/informesPrueba/:id/edit" component={(props)=><EditarInformePrueba{...props} userData={userData.user}/>}/>
        <Route path="/:idUser/informesPresencial/:id/edit" component={(props)=><EditarInformePresencial {...props} userData={userData.user}/>}/>
        <Route exact path="/:id/enfermedades" component={(props)=><Enfermedades {...props} userData={userData.user}/>} />
        <Route exact path="/:id/enfermedades/crearEnfermedad" component={CrearEnfermedad} />
        <Route exact path="/:id/enfermedades/:idEnfermedad/edit" component={(props)=><EditarEnfermedad {...props} userData={userData.user}/>}/>
        <Route exact path="/:id/enfermedades/:idEnfermedad/crearTratamientoMedicacion" component={CrearTratamientoMedicacion} />
        <Route exact path="/:id/enfermedades/:idEnfermedad/crearTratamientoRehabilitacion" component={CrearTratamientoRehabilitacion} />
        <Route exact path="/:id/enfermedades/:idEnfermedad/tratamientoMedicacion" component={(props)=><TratamientoMedicacion {...props} userData={userData.user}/>} />
        <Route exact path="/:id/enfermedades/:idEnfermedad/tratamientoRehabilitacion" component={(props)=><TratamientoRehabilitacion {...props} userData={userData.user}/>} />
        <Route exact path="/:id/covid19" component={(props)=><Covid19 {...props} userData={userData.user}/>} />
        <Route exact path="/:id/covid19/:idRegistro/crearCitaPCR" component={CrearCitaPcr} />
        <Route exact path="/:idPaciente/citas/:idCita/PCR/crearInformePCR" component={CrearInformePcr} />
        <Route exact path="/:id" component={(props)=><MiPerfil {...props} userData={userData.user}/>} />
        <Route exact path="/:id/misPacientes" component={(props)=><MisPacientes {...props} userData={userData.user}/>} />
        <Route path="/login" component={Login} />
        <Route path="/error" component={NoPerm} />
        </Switch>
        </UserContext.Provider>
        </BrowserRouter>
        );
}else{
return (
    <BrowserRouter>
    <UserContext.Provider value={{ userData, setUserData }}>
    <Header />
    <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/register" component={Register} />
    <Route path="/registerMedic" component={RegisterMedic} />
    <Route exact path="/consultas" component={Login} />
    <Route path="/:id/edit" component={NoPerm}/>
    <Route exact path="/citas" component={Login} />
    <Route exact path="/mensajes" component={Login} />
    <Route exact path="/crearConsulta" component={Login} />
    <Route exact path="/crearMensaje" component={Login} />
    <Route path="/login" component={Login} />
    </Switch>
    </UserContext.Provider>
    </BrowserRouter>
    );
}
}

function Usuario(){
    const { userData } = useContext(UserContext);
    return userData;
}
export default App;