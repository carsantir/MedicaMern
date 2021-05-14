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
import telephone from '../logo/phone.png'
import direccion from '../logo/address.png'

function Prueba(props) {
    const history = useHistory();
    const mensajes = () => history.push("/mensajes");
    let content;
    let content2;
    if(props.rol=="Paciente"){
        content = props.consulta.map((consulta) =>
        <div class="cards-consulta">
        <div class='top'>
        <img src={doctor} />
        </div>
        <div class="consulta" key={consulta._id}>
            <div class="fecha">
            <p><img class="calendar" src={motive}/><div class="fechaPad">Motivo: {consulta.motivo}</div></p>
            </div>
            <div class="fecha">
            <p><img class="calendar" src={calendar}/><div class="fechaPad">Fecha: {moment(consulta.fecha).format('DD/MM/yyyy HH:mm')}</div></p>
            </div>
            <div class="fecha">
            <p><img class="calendar" src={medic}/><div class="fechaPad">Medico: {consulta.medico.nickname}</div></p>
            </div>
            <div class="consultaBotones">
            <Mensaje id={consulta._id} idMedico={consulta.medico._id} />
            </div>
        </div>
        </div>
        );

        content2 = props.consultaAtencionEspecial.map((consultaAtencionEspecial) =>
        <div class="cards-consultaEspecial">
            <div class='topConsultaEspecial'>
            <img src={exclamation} />
            </div>
        <div class="consultaEspecial" key={consultaAtencionEspecial._id}>
            <div class="fecha">
            <p><img class="calendar" src={calendar}/><div class="fechaPad">Fecha: {moment(consultaAtencionEspecial.fecha).format('DD/MM/yyyy HH:mm')}</div></p>
            </div>
            <div class="fecha">
            <p><img class="calendar" src={medic}/><div class="fechaPad">Medico: {consultaAtencionEspecial.medico.nickname}</div></p>
            </div>
        </div>
        </div>
        );

        return (
            <div class="consultaList">
              {content2}
              {content}
              <br></br><br></br>
              <Consultas />
            </div>
          );
    }else{
        content = props.consulta.map((consulta) =>
        <div class="cards-consulta">
            <div class='top'>
            <img src={doctor} />
            </div>
        <div class="consulta" key={consulta._id}>
            <div class="fecha">
            <p><img class="calendar" src={motive}/><div class="fechaPad">Motivo: {consulta.motivo}</div></p>
            </div>
            <div class="fecha">
            <p><img class="calendar" src={calendar}/><div class="fechaPad">Fecha: {moment(consulta.fecha).format('DD/MM/yyyy HH:mm')}</div></p>
            </div>
            <div class="fecha">
                <p><img class="calendar" src={personas}/><div class="fechaPad">Paciente: {consulta.paciente.nickname}</div></p>
                </div>
            <div class="consultaBotones">
            <EditarConsulta id={consulta._id} />
            </div>
            <div class="consultaBotones">
            <EliminarConsulta id={consulta._id}/>
            </div>
            <div class="consultaBotones">
            <MensajeMedico id={consulta._id} />
            </div>
            <div class="consultaBotones">
            <CrearCita id={consulta._id} idPaciente={consulta.paciente._id} />
            </div>
            <br></br><br></br>
            <div class="consultaBotones">
            <CrearEnfermedad idPaciente={consulta.paciente._id} />
            </div>
        </div>
        </div>
        );
        content2 = props.consultaAtencionEspecial.map((consultaAtencionEspecial) =>
                <div class="cards-consultaEspecial">
                <div class='topConsultaEspecial'>
                <img src={exclamation} />
                </div>
            <div class="consultaEspecial" key={consultaAtencionEspecial._id}>
                <div class="fecha">
                <p><img class="calendar" src={calendar}/><div class="fechaPad">Fecha: {moment(consultaAtencionEspecial.fecha).format('DD/MM/yyyy HH:mm')}</div></p>
                </div>
                <div class="fecha">
                <p><img class="calendar" src={personas}/><div class="fechaPad">Paciente: {consultaAtencionEspecial.paciente.nickname}</div></p>
                </div>
                <div class="fecha">
            <p><img class="calendar" src={telephone}/><div class="fechaPad">Teléfono: {consultaAtencionEspecial.paciente.telefono}</div></p>
            </div>
            <div class="fecha">
            <p><img class="calendar" src={direccion}/><div class="fechaPad">Dirección: {consultaAtencionEspecial.paciente.direccion}</div></p>
            </div>
                <div class="consultaBotones">
                    <EditarConsultaAtencionEspecial id={consultaAtencionEspecial._id} />
                    </div>
            </div>
            </div>
        );

        return (
            <div class="consultaList">
              {content2}
              {content}
              <br></br>
            </div>
          );
    }
  }

  function Consultas(){
    const history = useHistory();
    const crearConsulta = () => history.push("/crearConsulta");
    return(
        <div class="crearConsulta">
        <button className="rad-button-2 wwt flat" style={{marginBottom:"2em"}} onClick={crearConsulta}>Crear consulta</button>
        </div>
    );
    }

    function EditarConsulta(props) {
        const history = useHistory();
        const { userData } = useContext(UserContext);
        const editarConsulta = () => history.push("/"+userData.user.id+"/consultas/"+props.id+"/edit");
        return(
            <button className="rad-button-2 wwt flat" onClick={editarConsulta}>Cambiar médico</button>
        );
    }

    function EditarConsultaAtencionEspecial(props) {
        const history = useHistory();
        const { userData } = useContext(UserContext);
        const updateConsultaAtencionEspecial = async () => {
            const id = props.id;
            // finalizada = true;
            // const payload = finalizada;
    
            await api.editarConsultaAtencionEspecial(id).then(res => {
               console.log(`Cita updated successfully`)
               history.push("/");
            })
        }
        return(
            <button className="rad-button-2 wwt flat" onClick={updateConsultaAtencionEspecial}>Finalizar consulta</button>
        );
    }

    function CrearCita(props) {
        const history = useHistory();
        const crearCita = () => history.push("/"+props.id+"/medico/"+props.idPaciente+"/crearCita");
        return(
            <button className="rad-button-2 wwt flat" onClick={crearCita}>Crear cita</button>
        );
    }

    function CrearEnfermedad(props) {
        const history = useHistory();
        const crearEnfermedad = () => history.push("/"+props.idPaciente+"/enfermedades/crearEnfermedad");
        return(
            <button className="rad-button-2 wwt flat" onClick={crearEnfermedad}>Diagnosticar <br></br>enfermedad</button>
        );
    }

    function Mensaje(props) {
        const history = useHistory();
        const mensajes = () => history.push("/"+props.id+"/medico/"+props.idMedico+"/mensajes");
        return(
            <button className="rad-button-2 wwt flat" onClick={mensajes}>Mensajes</button>
        );
    }

    function MensajeMedico(props) {
        const history = useHistory();
        const mensajes = () => history.push("/"+props.id+"/mensajes");
        return(
            <button className="rad-button-2 wwt flat" onClick={mensajes}>Mensajes</button>
        );
    }

    function EliminarConsulta(props) {
        const history = useHistory();
        const eliminarConsulta = () => {
            api.eliminarConsulta(props.id)
            window.location.reload()
        }
        return(
            <button className="rad-button-2 wwt flat" onClick={eliminarConsulta}>Eliminar consulta</button>
        );
    }

export default class Consulta extends React.Component{
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
        let url2;
        if(rol=="Paciente"){
            url = await api.getConsultaByPacienteId(id)
            url2 = await api.getConsultaAtencionEspecialByPaciente(id)
        }else{
            url = await api.getConsultaByMedicoId(id)
            url2 = await api.getConsultaAtencionEspecialByMedico(id)
        }
        // const response = await fetch(url);
        // const data = await response.json();
        this.setState({consulta: url.data.data,consultaAtencionEspecial: url2.data.data, loading:false, rol:rol});
    }
    

    render(){
        return(
            <div>
                {this.state.loading || !this.state.consulta ? (
                    <div>loading...</div>
                ):(
                    <div>
                        <Prueba consulta={this.state.consulta} consultaAtencionEspecial={this.state.consultaAtencionEspecial} rol={this.state.rol}/>
                        
                    </div>
                )}
            </div>
        );
    }
}