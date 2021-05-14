import React, { Component, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import moment from 'moment';
import api, { editarConsultaAtencionEspecial } from '../../api'
import UserContext from "../../context/userContext";
import calendar from '../logo/calendar.png'
import consultaImg from '../logo/medical-file.png'
import motive from '../logo/libreta-de-direcciones.png'
import personas from '../logo/personas.png'
import doctor from '../logo/doctor.png'
import medic from '../logo/medico.png'
import exclamation from '../logo/exclamation-mark.png'

function Prueba(props) {
    const history = useHistory();
    let content;
    let content2;
    if(props.rol=="Paciente"){
        content = props.registrosTension.map((registrosTension) =>
        <div class="cards-consulta">
        <div class='top'>
        <img src={doctor} />
        </div>
        <div class="consulta" key={registrosTension._id}>
            <div class="fecha">
            <p><img class="calendar" src={calendar}/><div class="fechaPad">Fecha y hora: {moment(registrosTension.fechaHora).format('DD/MM/yyyy HH:mm')}</div></p>
            </div>
            <div class="fecha">
            <p><img class="calendar" src={motive}/><div class="fechaPad">Presión Sístole: {registrosTension.presionSistole}</div></p>
            </div>
            <div class="fecha">
            <p><img class="calendar" src={medic}/><div class="fechaPad">Presión Diástole: {registrosTension.presionDiastole}</div></p>
            </div>
            <div class="fecha">
            <p><img class="calendar" src={medic}/><div class="fechaPad">Pulsaciones: {registrosTension.pulsaciones}</div></p>
            </div>
        </div>
        </div>
        );

        return (
            <div class="consultaList">
                <br></br>
                 <RegistrarTension />
                <br></br>
              {content}
            </div>
          );
    }else{
        content = props.registrosTension.map((registrosTension) =>
        <div class="cards-consulta">
            <div class='top'>
            <img src={doctor} />
            </div>
        <div class="consulta" key={registrosTension._id}>
        <div class="fecha">
            <p><img class="calendar" src={calendar}/><div class="fechaPad">Fecha y hora: {moment(registrosTension.fechaHora).format('DD/MM/yyyy HH:mm')}</div></p>
            </div>
            <div class="fecha">
            <p><img class="calendar" src={motive}/><div class="fechaPad">Presión Sístole: {registrosTension.presionSistole}</div></p>
            </div>
            <div class="fecha">
            <p><img class="calendar" src={medic}/><div class="fechaPad">Presión Diástole: {registrosTension.presionDiastole}</div></p>
            </div>
            <div class="fecha">
            <p><img class="calendar" src={medic}/><div class="fechaPad">Pulsaciones: {registrosTension.pulsaciones}</div></p>
            </div>
        </div>
        </div>
        );

        return (
            <div class="consultaList">
              {content}
              <br></br>
            </div>
          );
    }
  }

  function RegistrarTension(){
    const history = useHistory();
    const { userData } = useContext(UserContext);
    const registrarTension = () => history.push("/"+userData.user.id+"/registrarTension");
    return(
        <div class="crearConsulta">
        <button className="rad-button-2 wwt flat" onClick={registrarTension}>Registrar tensión arterial</button>
        </div>
    );
    }

export default class RegistrosTension extends React.Component{
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
        url = await api.getRegistrosTensionByPacienteId(id);
        // }else{
        //     url = await api.getConsultaByMedicoId(id)
        //     url2 = await api.getConsultaAtencionEspecialByMedico(id)
        // }
        // const response = await fetch(url);
        // const data = await response.json();
        this.setState({registrosTension:url.data.data, loading:false, rol:rol});
    }
    

    render(){
        return(
            <div>
                {this.state.loading || !this.state.registrosTension ? (
                    <div>loading...</div>
                ):(
                    <div>
                        <Prueba registrosTension={this.state.registrosTension} rol={this.state.rol}/>
                        
                    </div>
                )}
            </div>
        );
    }
}