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
import user from '../logo/user.png'
import nickname from '../logo/nickname.png'
import telefono from '../logo/phone.png'
import exclamation from '../logo/exclamation-mark.png'
import ReactSearchBox from 'react-search-box'

function Prueba(props) {
    const history = useHistory();
    const mensajes = () => history.push("/mensajes");
    let content;
    let buscador;
    buscador = <div class="barraBusqueda">
                <ReactSearchBox
          placeholder="Introduce el nombre del paciente"
          onChange={props.pacienteFilter}
          value={props.inputValue}
        />
        {/* <label htmlFor="search">Search by name</label>
        <input type="text" value={props.inputValue} onChange={props.pacienteFilter} /> */}
    </div>
    content = props.pacientes.map((pacientes) =>
    <div class="cards-consulta">
    <div class="topCitas">
    <img src={pacientes.imgPerfil || user}/>
    </div>
    <div class="consulta" key={pacientes._id}>
        <div class="fecha">
        <p><img class="calendar" src={personas}/><div class="fechaPad">Nombre: {pacientes.nombre}</div></p>
        </div>
        <div class="fecha">
        <p><img class="calendar" src={nickname}/><div class="fechaPad">Nombre usuario: {pacientes.nickname}</div></p>
        </div>
        <div class="fecha">
        <p><img class="calendar" src={telefono}/><div class="fechaPad">Teléfono: {pacientes.telefono}</div></p>
        </div>  
        <div class="consultaBotones">
        <Informes idPaciente={pacientes} />
        </div>
        <div class="consultaBotones">
        <Enfermedades idPaciente={pacientes} />
        </div>
    </div>
    </div>
    );
        return (
            <div class="consultaList">
              {buscador}
              {content}
              <br></br>
            </div>
          );
    
  }

  function Informes(props){
    const history = useHistory();
    const informes = () => history.push("/"+props.idPaciente._id+"/informes");
    return(
        <button className="rad-button-2 wwt flat" onClick={informes}>Informes</button>
      
    );
    }

    function Enfermedades(props){
        const history = useHistory();
        const enfermedades = () => history.push("/"+props.idPaciente._id+"/enfermedades");
        return(
            <button className="rad-button-2 wwt flat" onClick={enfermedades}>Enfermedades</button>
        );
        }

export default class MisPacientes extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            rol: this.props.userData.rol,
            loading: true,
            consulta:null,
            inputValue:'',
            pacientes: [],

        }
    }

    async componentDidMount(){
        const { id } = this.state
        const { rol } = this.state
        let url;
        url = await api.getPacientesByMedicoId(id)
        // const response = await fetch(url);
        // const data = await response.json();
        this.setState({pacientes: url.data.data, loading:false, rol:rol});
    }
    
    pacienteFilter = (event) => {
        console.log("change",event)
        this.setState({
            inputValue: event
        })
    }

    render(){
        const pacientesFiltrados =
        this.state.pacientes.filter(paciente => {
            return paciente.nickname.toLowerCase().includes(this.state.inputValue.toLowerCase())
        })
        return(
            <div>
                {this.state.loading || !this.state.pacientes ? (
                    <div>loading...</div>
                ):(
                    <div>
                        <Prueba pacientes={pacientesFiltrados} rol={this.state.rol} pacienteFilter={this.pacienteFilter}
                        inputValue={this.state.inputValue} />
                        
                    </div>
                )}
            </div>
        );
    }
}