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
        content = props.tratamiento.map((tratamiento) =>
        <div class="cards-consulta">
        <div class='top'>
        <img src={doctor} />
        </div>
        <div class="consulta" key={tratamiento._id}>
        <div class="fecha">
            <p><img class="calendar" src={motive}/><div class="fechaPad">Enfermedad: {props.enfermedad.nombre}</div></p>
            </div>
            <div class="fecha">
            <p><img class="calendar" src={calendar}/><div class="fechaPad">Medicamento: {tratamiento.medicamento.nombre}</div></p>
            </div>
            <div class="fecha">
            <p><img class="calendar" src={personas}/><div class="fechaPad">Cantidad que tomar: {tratamiento.cantidadTomar}</div></p>
            </div>
            <div class="fecha">
            <p><img class="calendar" src={personas}/><div class="fechaPad">Hora: {moment(tratamiento.fecha1).format('DD/MM/yyyy HH:mm')}</div></p>
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
        content = props.tratamiento.map((tratamiento) =>
        <div class="cards-consulta">
            <div class='top'>
            <img src={doctor} />
            </div>
        <div class="consulta" key={tratamiento._id}>
            <div class="fecha">
            <p><img class="calendar" src={motive}/><div class="fechaPad">Enfermedad: {tratamiento.enfermedad}</div></p>
            </div>
            <div class="fecha">
            <p><img class="calendar" src={calendar}/><div class="fechaPad">Medicamento: {tratamiento.medicamento.nombre}</div></p>
            </div>
            <div class="fecha">
            <p><img class="calendar" src={personas}/><div class="fechaPad">Cantidad que tomar: {tratamiento.cantidadTomar}</div></p>
            </div>
            <div class="fecha">
            <p><img class="calendar" src={personas}/><div class="fechaPad">Hora: {tratamiento.fecha1}</div></p>
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
    }
  }


export default class TratamientoMedicacion extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            rol: this.props.userData.rol,
            idEnfermedad: this.props.match.params.idEnfermedad,
            loading: true,
            consulta:null,
        }
    }

    async componentWillMount(){
        const { id } = this.state
        const { idEnfermedad } = this.state
        const { rol } = this.state
        let url;
        let enfermedad;
        url = await api.getTratamientoMedicacionByEnfermedad(idEnfermedad)
        enfermedad = await api.getEnfermedad(idEnfermedad)
        
        // const response = await fetch(url);
        // const data = await response.json();
        this.setState({tratamiento: url.data.data,enfermedad:enfermedad.data.data, loading:false, rol:rol});
    }
    

    render(){
        return(
            <div>
                {this.state.loading || !this.state.tratamiento ? (
                    <div>loading...</div>
                ):(
                    <div>
                        <Prueba tratamiento={this.state.tratamiento} rol={this.state.rol} enfermedad={this.state.enfermedad} />
                        
                    </div>
                )}
            </div>
        );
    }
}