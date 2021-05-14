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
    if(props.rol=="Paciente"){
        content = props.registroCovid.map((registroCovid) =>
        <div class="cards-consulta">
        <div class='top'>
        <img src={doctor} />
        </div>
        <div class="consulta" key={registroCovid._id}>
  
            <div class="fecha">
            <p><img class="calendar" src={calendar}/><div class="fechaPad">Fecha: {moment(registroCovid.fecha).format('DD/MM/yyyy HH:mm')}</div></p>
            </div>
            <div class="fecha">
            <p><img class="calendar" src={motive}/><div class="fechaPad">Contacto con positivo: {cambiaDisplay(registroCovid.contactoConPositivo)}</div></p>
            </div>
            <div class="fecha">
            <p><img class="calendar" src={medic}/><div class="fechaPad">Fiebre: {cambiaDisplay(registroCovid.tieneFiebre)}</div></p>
            </div>
            <div class="fecha">
            <p><img class="calendar" src={medic}/><div class="fechaPad">Diarrea: {cambiaDisplay(registroCovid.diarrea)}</div></p>
            </div>
         
        </div>
        </div>
        );

        return (
            <div class="consultaList">
                <br></br>
                <CrearRegistroCovid />
                <br></br>
              {content}
            </div>
          );
    }else{
        content = props.registroCovid.map((registroCovid) =>
        <div class="cards-consulta">
            <div class='top'>
            <img src={doctor} />
            </div>
        <div class="consulta" key={registroCovid._id}>
      
        <div class="fecha">
            <p><img class="calendar" src={calendar}/><div class="fechaPad">Fecha: {moment(registroCovid.fecha).format('DD/MM/yyyy HH:mm')}</div></p>
            </div>
            <div class="fecha">
            <p><img class="calendar" src={motive}/><div class="fechaPad">Contacto con positivo: {cambiaDisplay(registroCovid.contactoConPositivo)}</div></p>
            </div>
            <div class="fecha">
            <p><img class="calendar" src={medic}/><div class="fechaPad">Fiebre: {cambiaDisplay(registroCovid.tieneFiebre)}</div></p>
            </div>
            <div class="fecha">
            <p><img class="calendar" src={medic}/><div class="fechaPad">Contacto con positivo: {cambiaDisplay(registroCovid.diarrea)}</div></p>
            </div>
            <div class="consultaBotones">
            <CrearCitaCovid id={registroCovid._id} idPaciente={registroCovid.paciente._id} />
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

  function cambiaDisplay(valor){
      let final;
      if(valor==true){
          final="Sí"
      }else{
          final="No"
      }
      return final;
  }

  function CrearRegistroCovid(){
    const history = useHistory();
    const { userData } = useContext(UserContext);
    const crearRegistroCovid = () => history.push("/"+userData.user.id+"/covid19/crearRegistroCovid");
    return(
        <div class="crearConsulta">
        <button className="rad-button-2 wwt flat" onClick={crearRegistroCovid}>Registrar síntomas <br></br>COVID-19</button>
        </div>
    );
    }

    function CrearCitaCovid(props){
        const history = useHistory();
        const { userData } = useContext(UserContext);
        const crearCitaCovid = () => history.push("/"+userData.user.id+"/covid19/"+props.id+"/crearCitaPCR");
        return(
            <div class="crearConsulta">
            <button className="rad-button-2 wwt flat" onClick={crearCitaCovid}>Crear cita PCR</button>
            </div>
        );
        }


export default class Covid19 extends React.Component{
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
        if(rol=="Paciente"){
        url = await api.getRegistroCovidByPacienteId(id)
        }else{
        url = await api.getRegistroCovidByMedicoId(id)
        }
        // const response = await fetch(url);
        // const data = await response.json();
        this.setState({registroCovid: url.data.data, loading:false, rol:rol});
    }
    

    render(){
        return(
            <div>
                {this.state.loading || !this.state.registroCovid ? (
                    <div>loading...</div>
                ):(
                    <div>
                        <Prueba registroCovid={this.state.registroCovid} rol={this.state.rol}/>
                        
                    </div>
                )}
            </div>
        );
    }
}