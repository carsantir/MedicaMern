import React, { Component, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import moment from 'moment';
import api from '../../api'
import UserContext from "../../context/userContext";

function ListaCitas(props) {
    const history = useHistory();
    let content;
    let content2;
    if(props.rol=="Paciente"){
        content = props.cita.map((cita) =>
        <div class="cards">
            <br></br>
        <div class="cita" key={cita._id}>
            <p>Motivo: {cita.motivo}</p>
            <p>Tipo de cita: {cita.tipoCita}</p>
            <TipoAnalisis tipoCita={cita.tipoCita} cita={cita}/>
            <p>Fecha:{moment(cita.fecha).format('DD/MM/yyyy')}</p>
            <p>Medico: {cita.medico.nickname}</p>
            <p>Ciudad: {cita.ciudad}</p>
            <p>Centro Médico: {cita.centroMedico}</p>

        </div>
        </div>
        );

        content2 = props.citaPcr.map((citaPcr) =>
        <div class="cards">
            <br></br>
        <div class="cita" key={citaPcr._id}>
            <p>Motivo: {citaPcr.motivo}</p>
            <p>Tipo de cita: {citaPcr.tipoCita}</p>
            <p>Fecha:{moment(citaPcr.fecha).format('DD/MM/yyyy')}</p>
            <p>Medico: {citaPcr.medico.nickname}</p>
            <p>Ciudad: {citaPcr.ciudad}</p>
            <p>Centro Médico: {citaPcr.centroMedico}</p>

        </div>
        </div>
        );
        return (
        <div>
            {content2}
            {content}
            <br></br>
        </div>
        );
        }else{
            content = props.cita.map((cita) =>
            <div class="cards">
                <br></br>
            <div class="cita" key={cita._id}>
                <p>Motivo: {cita.motivo}</p>
                <p>Tipo de cita: {cita.tipoCita}</p>
                <TipoAnalisis tipoCita={cita.tipoCita} cita={cita}/>
                <p>Fecha:{moment(cita.fecha).format('DD/MM/yyyy')}</p>
                <p>Paciente: {cita.paciente.nickname}</p>
                <p>Ciudad: {cita.ciudad}</p>
                <p>Centro Médico: {cita.centroMedico}</p>
                <div class="consultaBotones">
                <EditarCita id={cita._id} />
                </div>
                <div class="consultaBotones">
                <EliminarCita id={cita._id}/>
                </div>
                <div class="consultaBotones">
                <CrearInforme paciente={cita.paciente} id={cita._id} tipoCita={cita.tipoCita} tipoAnalisis={cita.tipoAnalisis}/>
                </div>

            </div>
            </div>
            );

            content2 = props.citaPcr.map((citaPcr) =>
            <div class="cards">
                <br></br>
            <div class="cita" key={citaPcr._id}>
                <p>Motivo: {citaPcr.motivo}</p>
                <p>Tipo de cita: {citaPcr.tipoCita}</p>
                <p>Fecha:{moment(citaPcr.fecha).format('DD/MM/yyyy')}</p>
                <p>Paciente: {citaPcr.paciente.nickname}</p>
                <p>Ciudad: {citaPcr.ciudad}</p>
                <p>Centro Médico: {citaPcr.centroMedico}</p>
                <div class="consultaBotones">
                <CrearInformePcr paciente={citaPcr.paciente} id={citaPcr._id} tipoCita={citaPcr.tipoCita} />
                </div>
            </div>
            </div>
            );
            return (
            <div>
                {content2}
                {content}
                <br></br>
            </div>
            );
        }
  }

  function TipoAnalisis(props) {
    if(props.tipoCita=="análisis"){
    return(
        <p>Tipo de análisis: {props.cita.tipoAnalisis}</p>
    );
    }else{
    return(
        <p></p>
    );  
    }
}


    function CrearInforme(props) {
        const history = useHistory();
        const { userData } = useContext(UserContext);
        let crearInforme;
        if(props.tipoCita=="análisis" && props.tipoAnalisis=="sangre"){
            crearInforme = () => history.push("/"+props.paciente._id+"/citas/"+props.id+"/"+props.tipoCita+"/"+props.tipoAnalisis+"/crearInformeSangre");
        }else if(props.tipoCita=="análisis" && props.tipoAnalisis=="orina"){
            crearInforme = () => history.push("/"+props.paciente._id+"/citas/"+props.id+"/"+props.tipoCita+"/"+props.tipoAnalisis+"/crearInformeOrina");
        }else if(props.tipoCita=="prueba médica"){
            crearInforme = () => history.push("/"+props.paciente._id+"/citas/"+props.id+"/"+props.tipoCita+"/crearInformePrueba");
        }else if(props.tipoCita=="presencial"){
            crearInforme = () => history.push("/"+props.paciente._id+"/citas/"+props.id+"/"+props.tipoCita+"/crearInformePresencial");
        }
        return(
            <button className="rad-button-2 wwt flat" onClick={crearInforme}>Crear informe</button>
        );
    }

    function CrearInformePcr(props) {
        const history = useHistory();
        const { userData } = useContext(UserContext);
        let crearInforme;
        crearInforme = () => history.push("/"+props.paciente._id+"/citas/"+props.id+"/PCR/crearInformePcr");
        return(
            <button className="rad-button-2 wwt flat" onClick={crearInforme}>Crear informe</button>
        );
    }

    function EditarCita(props) {
        const history = useHistory();
        const { userData } = useContext(UserContext);
        const editarCita = () => history.push("/"+userData.user.id+"/citas/"+props.id+"/edit");
        return(
            <button className="rad-button-2 wwt flat" onClick={editarCita}>Editar cita</button>
        );
    }

    function EliminarCita(props) {
        const history = useHistory();
        const eliminarCita = () => {
            api.eliminarCita(props.id)
            window.location.reload()
        }
        return(
            <button className="rad-button-2 wwt flat" onClick={eliminarCita}>Eliminar cita</button>
        );
    }


export default class Cita extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            rol: this.props.userData.rol,
        }
    }

    async componentWillMount(){
        const { id } = this.state
        const { rol } = this.state
        let url;
        let url2;
        if(rol=="Paciente"){
            url = await api.getCitaByPacienteId(id)
            url2 = await api.getCitasPcrByPacienteId(id)
        }else{
            url = await api.getCitaByMedicoId(id)
            url2 = await api.getCitasPcrByMedicoId(id)
        }
        this.setState({cita: url.data.data,citaPcr: url2.data.data, loading:false, rol:rol});
    }
    

    render(){
        return(
            <div>
                {this.state.loading || !this.state.cita ? (
                    <div>loading...</div>
                ):(
                    <div>
                        <ListaCitas cita={this.state.cita} citaPcr={this.state.citaPcr} rol={this.state.rol} />
                        
                    </div>
                )}
            </div>
        );
    }
}