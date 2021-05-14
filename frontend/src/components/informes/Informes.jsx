import React, { Component, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import moment from 'moment';
import api from '../../api'
import UserContext from "../../context/userContext";

function ListaInformes(props) {
    const history = useHistory();
    let content;
    let content2;
    let content3;
    let content4;
    let content5;
    if(props.rol=="Paciente"){
        content = props.informeSangre.map((informeSangre) =>
        <div class="cards">
            <br></br>
        <div class="cita" key={informeSangre._id}>
            <p>Tipo de informe: {informeSangre.tipoInforme}</p>
            <p>Fecha:{moment(informeSangre.fecha).format('DD/MM/yyyy')}</p>
            <p>Medico: {informeSangre.medico.nickname}</p>
            <p>Observaciones: {informeSangre.observaciones}</p>
        </div>
        </div>
        );
        content2 = props.informeOrina.map((informeOrina) =>
        <div class="cards">
            <br></br>
        <div class="cita" key={informeOrina._id}>
            <p>Tipo de informe: {informeOrina.tipoInforme}</p>
            <p>Fecha:{moment(informeOrina.fecha).format('DD/MM/yyyy')}</p>
            <p>Medico: {informeOrina.medico.nickname}</p>
            <p>Observaciones: {informeOrina.observaciones}</p>
        </div>
        </div>
        );
        content3 = props.informePrueba.map((informePrueba) =>
        <div class="cards">
            <br></br>
        <div class="cita" key={informePrueba._id}>
            <p>Tipo de informe: {informePrueba.tipoInforme}</p>
            <p>Prueba: {informePrueba.nombre}</p>
            <p>Fecha:{moment(informePrueba.fecha).format('DD/MM/yyyy')}</p>
            <p>Médico: {informePrueba.medico.nickname}</p>
            <p>Descripción: {informePrueba.descripcion}</p>
            <p>Resultados: {informePrueba.resultado}</p>
        </div>
        </div>
        );
        content4 = props.informePresencial.map((informePresencial) =>
        <div class="cards">
            <br></br>
        <div class="cita" key={informePresencial._id}>
        <p>Tipo de informe: {informePresencial.tipoInforme}</p>
            <p>Motivo: {informePresencial.motivo}</p>
            <p>Fecha:{moment(informePresencial.fecha).format('DD/MM/yyyy')}</p>
            <p>Médico: {informePresencial.medico.nickname}</p>
            <p>Descripción: {informePresencial.descripcion}</p>
            <p>Diagnóstico: {informePresencial.diagnostico}</p>
        </div>
        </div>
        );

        content5 = props.informePcr.map((informePcr) =>
        <div class="cards">
            <br></br>
        <div class="cita" key={informePcr._id}>
        <p>Tipo de informe: {informePcr.tipoInforme}</p>
            <p>Motivo: {informePcr.motivo}</p>
            <p>Fecha:{moment(informePcr.fecha).format('DD/MM/yyyy')}</p>
            <p>Médico: {informePcr.medico.nickname}</p>
            <p>Descripción: {informePcr.descripcion}</p>
            <p>Es positivo: {cambiaDisplay(informePcr.esPositivo)}</p>
        </div>
        </div>
        );
        return (
        <div>
            {content}
            {content2}
            {content3}
            {content4}
            {content5}
            <br></br>
        </div>
        );
        }else{
            content = props.informeSangre.map((informeSangre) =>
            <div class="cards">
                <br></br>
            <div class="cita" key={informeSangre._id}>
            <p>Tipo de informe: {informeSangre.tipoInforme}</p>
            <p>Fecha:{moment(informeSangre.fecha).format('DD/MM/yyyy')}</p>
            <p>Paciente: {informeSangre.paciente.nickname}</p>
            <p>Observaciones: {informeSangre.observaciones}</p>
                <div class="consultaBotones">
                <EditarInformeSangre id={informeSangre._id} />
                </div>
                <div class="consultaBotones">
                <EliminarInformeSangre id={informeSangre._id}/>
                </div>

            </div>
            </div>
            );
            content2 = props.informeOrina.map((informeOrina) =>
            <div class="cards">
                <br></br>
            <div class="cita" key={informeOrina._id}>
            <p>Tipo de informe: {informeOrina.tipoInforme}</p>
            <p>Fecha:{moment(informeOrina.fecha).format('DD/MM/yyyy')}</p>
            <p>Paciente: {informeOrina.paciente.nickname}</p>
            <p>Observaciones: {informeOrina.observaciones}</p>
            <div class="consultaBotones">
                <EditarInformeOrina id={informeOrina._id} />
                </div>
                <div class="consultaBotones">
                <EliminarInformeOrina id={informeOrina._id}/>
                </div>

            </div>
            </div>
            );
            content3 = props.informePrueba.map((informePrueba) =>
            <div class="cards">
                <br></br>
            <div class="cita" key={informePrueba._id}>
                <p>Tipo de informe: {informePrueba.tipoInforme}</p>
                <p>Prueba: {informePrueba.nombre}</p>
                <p>Fecha:{moment(informePrueba.fecha).format('DD/MM/yyyy')}</p>
                <p>Paciente: {informePrueba.paciente.nickname}</p>
                <p>Descripción: {informePrueba.descripcion}</p>
                <p>Resultados: {informePrueba.resultado}</p>
                <div class="consultaBotones">
                <EditarInformePrueba id={informePrueba._id} />
                </div>
                <div class="consultaBotones">
                <EliminarInformePrueba id={informePrueba._id}/>
                </div>
            </div>
            </div>
            );
            content4 = props.informePresencial.map((informePresencial) =>
            <div class="cards">
                <br></br>
            <div class="cita" key={informePresencial._id}>
                <p>Tipo de informe: {informePresencial.tipoInforme}</p>
                <p>Motivo: {informePresencial.motivo}</p>
                <p>Fecha:{moment(informePresencial.fecha).format('DD/MM/yyyy')}</p>
                <p>Paciente: {informePresencial.paciente.nickname}</p>
                <p>Descripción: {informePresencial.descripcion}</p>
                <p>Diagnóstico: {informePresencial.diagnostico}</p>
                <div class="consultaBotones">
                <EditarInformePresencial id={informePresencial._id} />
                </div>
                <div class="consultaBotones">
                <EliminarInformePresencial id={informePresencial._id}/>
                </div>
            </div>
            </div>
            );

            content5 = props.informePcr.map((informePcr) =>
            <div class="cards">
                <br></br>
            <div class="cita" key={informePcr._id}>
            <p>Tipo de informe: {informePcr.tipoInforme}</p>
                <p>Motivo: {informePcr.motivo}</p>
                <p>Fecha:{moment(informePcr.fecha).format('DD/MM/yyyy')}</p>
                <p>Paciente: {informePcr.paciente.nickname}</p>
                <p>Descripción: {informePcr.descripcion}</p>
                <p>Es positivo: {cambiaDisplay(informePcr.esPositivo)}</p>
            </div>
            </div>
            );
            return (
            <div>
                {content}
                {content2}
                {content3}
                {content4}
                {content5}
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

    function EditarInformeSangre(props) {
        const history = useHistory();
        const { userData } = useContext(UserContext);
        const editarInforme = () => history.push("/"+userData.user.id+"/informesSangre/"+props.id+"/edit");
        return(
            <button className="rad-button-2 wwt flat" onClick={editarInforme}>Editar informe</button>
        );
    }

    function EditarInformeOrina(props) {
        const history = useHistory();
        const { userData } = useContext(UserContext);
        const editarInforme = () => history.push("/"+userData.user.id+"/informesOrina/"+props.id+"/edit");
        return(
            <button className="rad-button-2 wwt flat" onClick={editarInforme}>Editar informe</button>
        );
    }

    function EditarInformePrueba(props) {
        const history = useHistory();
        const { userData } = useContext(UserContext);
        const editarInforme = () => history.push("/"+userData.user.id+"/informesPrueba/"+props.id+"/edit");
        return(
            <button className="rad-button-2 wwt flat" onClick={editarInforme}>Editar informe</button>
        );
    }

    function EditarInformePresencial(props) {
        const history = useHistory();
        const { userData } = useContext(UserContext);
        const editarInforme = () => history.push("/"+userData.user.id+"/informesPresencial/"+props.id+"/edit");
        return(
            <button className="rad-button-2 wwt flat" onClick={editarInforme}>Editar informe</button>
        );
    }

    function EliminarInformeSangre(props) {
        const history = useHistory();
        const eliminarInforme = () => {
            api.eliminarInformeSangre(props.id)
            window.location.reload()
        }
        return(
            <button className="rad-button-2 wwt flat" onClick={eliminarInforme}>Eliminar informe</button>
        );
    }

    function EliminarInformeOrina(props) {
        const history = useHistory();
        const eliminarInforme = () => {
            api.eliminarInformeOrina(props.id)
            window.location.reload()
        }
        return(
            <button className="rad-button-2 wwt flat" onClick={eliminarInforme}>Eliminar informe</button>
        );
    }

    function EliminarInformePrueba(props) {
        const history = useHistory();
        const eliminarInforme = () => {
            api.eliminarInformePrueba(props.id)
            window.location.reload()
        }
        return(
            <button className="rad-button-2 wwt flat" onClick={eliminarInforme}>Eliminar informe</button>
        );
    }

    function EliminarInformePresencial(props) {
        const history = useHistory();
        const eliminarInforme = () => {
            api.eliminarInformePresencial(props.id)
            window.location.reload()
        }
        return(
            <button className="rad-button-2 wwt flat" onClick={eliminarInforme}>Eliminar informe</button>
        );
    }


export default class Informes extends React.Component{
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
        let url3;
        let url4;
        let url5;
        // if(rol=="Paciente"){
            url = await api.getInformeAnalisisSangreByPaciente(id)
            url2 = await api.getInformeAnalisisOrinaByPaciente(id)
            url3 = await api.getInformePruebaByPaciente(id)
            url4 = await api.getInformePresencialByPaciente(id)
            url5 = await api.getInformePcrByPaciente(id)
        // }else{
        //     url = await api.getInformeAnalisisSangreByMedico(id)
        //     url2 = await api.getInformeAnalisisOrinaByMedico(id)
        //     url3 = await api.getInformePruebaByMedico(id)
        //     url4 = await api.getInformePresencialByMedico(id)
        //     url5 = await api.getInformePcrByMedico(id)
        // }
        this.setState({informeSangre: url.data.data,informeOrina: url2.data.data,informePrueba: url3.data.data,informePresencial: url4.data.data,
            informePcr: url5.data.data, loading:false, rol:rol});
    }
    

    render(){
        return(
            <div>
                {this.state.loading || !this.state.informeSangre || !this.state.informeOrina || !this.state.informePrueba || !this.state.informePresencial ? (
                    <div>loading...</div>
                ):(
                    <div>
                        <ListaInformes informeSangre={this.state.informeSangre} informeOrina={this.state.informeOrina} 
                        informePrueba={this.state.informePrueba} informePresencial={this.state.informePresencial} 
                        informePcr={this.state.informePcr} rol={this.state.rol} />
                        
                    </div>
                )}
            </div>
        );
    }
}