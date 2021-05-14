import React, { Component, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import moment from 'moment';
import api from '../../api'
import UserContext from "../../context/userContext";
import calendar from '../logo/calendar.png'
import consultaImg from '../logo/medical-file.png'
import motive from '../logo/libreta-de-direcciones.png'
import personas from '../logo/personas.png'
import doctor from '../logo/doctor.png'
import medic from '../logo/medico.png'

function Prueba(props) {
    let content;
    if(props.rol=="Paciente"){
        content = props.enfermedad.map((enfermedad) =>
        <div class="cards-consulta">
        <div class='top'>
        <img src={doctor} />
        </div>
        <div class="consulta" key={enfermedad._id}>
        <div class="fecha">
            <p><img class="calendar" src={motive}/><div class="fechaPad">Tipo de enfermedad: {enfermedad.tipoEnfermedad}</div></p>
            </div>
            <div class="fecha">
            <p><img class="calendar" src={calendar}/><div class="fechaPad">Nombre: {enfermedad.nombre}</div></p>
            </div>
            <div class="fecha">
            <p><img class="calendar" src={personas}/><div class="fechaPad">Descripción: {enfermedad.descripcion}</div></p>
            </div>
            <div class="fecha">
            <p><img class="calendar" src={personas}/><div class="fechaPad">Médico: {enfermedad.medico.nickname}</div></p>
            </div>
            <div class="consultaBotones">
            <TratamientoMedicacion id={enfermedad._id} />
            </div>
            <div class="consultaBotones">
            <TratamientoRehabilitacion id={enfermedad._id} />
            </div>
        </div>
        </div>
        );

        return (
            <div class="consultaList">
              {content}
              <br></br><br></br>
            </div>
          );
    }else{
        content = props.enfermedad.map((enfermedad) =>
        <div class="cards-consulta">
            <div class='top'>
            <img src={doctor} />
            </div>
        <div class="consulta" key={enfermedad._id}>
            <div class="fecha">
            <p><img class="calendar" src={motive}/><div class="fechaPad">Tipo de enfermedad: {enfermedad.tipoEnfermedad}</div></p>
            </div>
            <div class="fecha">
            <p><img class="calendar" src={calendar}/><div class="fechaPad">Nombre: {enfermedad.nombre}</div></p>
            </div>
            <div class="fecha">
            <p><img class="calendar" src={personas}/><div class="fechaPad">Descripción: {enfermedad.descripcion}</div></p>
            </div>
            <div class="fecha">
            <p><img class="calendar" src={personas}/><div class="fechaPad">Paciente: {enfermedad.paciente.nickname}</div></p>
            </div>
            <div class="consultaBotones">
            <EditarEnfermedad id={enfermedad._id} />
            </div>
            <div class="consultaBotones">
            <EliminarEnfermedad id={enfermedad._id}/>
            </div>
            <div class="consultaBotones">
            <CrearTratamientoMedicacion id={enfermedad._id}/>
            </div>
            <div class="consultaBotones">
            <CrearTratamientoRehabilitacion id={enfermedad._id}/>
            </div>
        </div>
        </div>
        );

        return (
            <div class="consultaList">
              {content}
              <br></br><br></br>
              <CrearEnfermedad idPaciente={props.idPaciente}/>
            </div>
          );
    }
  }

  function CrearEnfermedad(props){
    const history = useHistory();
    const { userData } = useContext(UserContext);
    const crearEnfermedad = () => history.push("/"+props.idPaciente+"/enfermedades/crearEnfermedad");
    return(
        <div class="crearConsulta">
        <button className="rad-button-2 wwt flat" onClick={crearEnfermedad}>Crear enfermedad</button>
        </div>
    );
    }

    function EditarEnfermedad(props) {
        const history = useHistory();
        const { userData } = useContext(UserContext);
        const editarEnfermedad = () => history.push("/"+userData.user.id+"/enfermedades/"+props.id+"/edit");
        return(
            <button className="rad-button-2 wwt flat" onClick={editarEnfermedad}>Editar enfermedad</button>
        );
    }

    function EliminarEnfermedad(props) {
        const history = useHistory();
        const { userData } = useContext(UserContext);
        const eliminarEnfermedad = () => {
            api.eliminarEnfermedad(props.id)
            window.location.reload()
        }
        return(
            <button className="rad-button-2 wwt flat" onClick={eliminarEnfermedad}>Eliminar enfermedad</button>
        );
    }

    function CrearTratamientoMedicacion(props) {
        const history = useHistory();
        const { userData } = useContext(UserContext);
        const tratamientoMedicacion = () => history.push("/"+userData.user.id+"/enfermedades/"+props.id+"/crearTratamientoMedicacion");
        return(
            <button className="rad-button-2 wwt flat" onClick={tratamientoMedicacion}>Crear tratamiento <br></br>medicación</button>
        );
    }

    function CrearTratamientoRehabilitacion(props) {
        const history = useHistory();
        const { userData } = useContext(UserContext);
        const tratamientoRehabilitacion = () => history.push("/"+userData.user.id+"/enfermedades/"+props.id+"/crearTratamientoRehabilitacion");
        return(
            <button className="rad-button-2 wwt flat" onClick={tratamientoRehabilitacion}>Crear tratamiento <br></br>rehabilitación</button>
        );
    }

    function TratamientoMedicacion(props){
        const history = useHistory();
        const { userData } = useContext(UserContext);
        const tratamientoMedicacion = () => history.push("/"+userData.user.id+"/enfermedades/"+props.id+"/tratamientoMedicacion");
        return(
            <button className="rad-button-2 wwt flat" onClick={tratamientoMedicacion}>Ver tratamientos <br></br>de medicación</button>
        );
    }

    function TratamientoRehabilitacion(props){
        const history = useHistory();
        const { userData } = useContext(UserContext);
        const tratamientoRehabilitacion = () => history.push("/"+userData.user.id+"/enfermedades/"+props.id+"/tratamientoRehabilitacion");
        return(
            <button className="rad-button-2 wwt flat" onClick={tratamientoRehabilitacion}>Ver tratamientos <br></br>de rehabilitación</button>
        );
    }


export default class Enfermedades extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            rol: this.props.userData.rol,
            loading: true,
            consulta:null,
        }
    }

    async componentWillMount(){
        const { id } = this.state
        const { rol } = this.state
        let url;
        // if(rol=="Paciente"){
            url = await api.getEnfermedadByPacienteId(id)
        // }else{
        //     url = await api.getEnfermedadByMedicoId(id)
        // }
        // const response = await fetch(url);
        // const data = await response.json();
        this.setState({enfermedad: url.data.data, loading:false, rol:rol,idPaciente:id});
    }
    

    render(){
        return(
            <div>
                {this.state.loading || !this.state.enfermedad ? (
                    <div>loading...</div>
                ):(
                    <div>
                        <Prueba enfermedad={this.state.enfermedad} rol={this.state.rol} idPaciente={this.state.idPaciente} />
                        
                    </div>
                )}
            </div>
        );
    }
}