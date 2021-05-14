import React, { Component } from "react";
import { useHistory,useParams } from "react-router-dom";
import moment from 'moment';
import { useState, useContext } from 'react';
import axios from "axios";
import ErrorNotice from "../../components/misc/ErrorNotice";
import UserContext from '../../context/userContext';
import api from '../../api'
function CrearMensaje () {
    const {userData} = useContext(UserContext);
    const [mensaje, setMensaje] = useState();
    const { id } = useParams()
    const consulta = id;
    const paciente = userData.user.id;
    const { idMedico } = useParams()
    const medico = idMedico;
    const fecha = new Date();
    const escritoPor = userData.user.nickname+" "+userData.user.rol;
    const [error, setError] = useState();
    const history = useHistory();
    const submit = async (e) => {
    e.preventDefault();
    try{
    const newMensaje = {mensaje,consulta,paciente,medico,fecha,escritoPor};
    await axios.post("http://localhost:5000/enquiries/addConsultas", newMensaje);
    
    window.location.reload();
    } catch(err) {
    err.response.data.msg && setError(err.response.data.msg)
    }
    };
    return (
    <div className="crearMensaje">
    <h2 class="mensajeTitulo">Crear mensaje</h2>
    {error && <ErrorNotice message={error} clearError={() => setError(undefined)} />}
    <form onSubmit={submit}>
    <textarea  id="mensaje" onChange={e => setMensaje(e.target.value)}/><br></br>
    <div class="divCrearMensaje">
    <input type="submit" value="Enviar mensaje" class="rad-button-2 wwt flat"/>
    </div>
    <br></br>
    </form>
    </div>
    );
    }

// function DivChat(mensajeId){
//     const { userData } = useContext(UserContext);
//     let mensajeSp=mensajeId.split(' ')[0]
//     if(userData.user.nickname == mensajeSp){
//         return <div class="container darker"></div>;
//     }else{
//         return <div class="container"></div>;
//     }
// }

function DivChat(mensajeId){
    const { userData } = useContext(UserContext);
    let mensajeSp=mensajeId.split(' ')[0]
    if(userData.user.nickname != mensajeSp){
        return "container";
    }else{
        return "container darker";
    }
}

function FechaChat(mensajeId){
    const { userData } = useContext(UserContext);
    let mensajeSp=mensajeId.split(' ')[0]
    if(userData.user.nickname != mensajeSp){
        return "time-left";
    }else{
        return "time-right";
    }
}

function CerrarDiv(){
    return '</div>';
}

function Prueba(props) {
    const { userData } = useContext(UserContext);
    console.log(userData.user.id)
    const content = props.mensaje.map((mensaje) =>
      <div key={mensaje._id}>
          {/* {DivChat(mensaje.escritoPor)} */}
          <div class={DivChat(mensaje.escritoPor)}>
        {/* <p>ID: {mensaje._id}</p> */}
        <p>{mensaje.escritoPor}: {mensaje.mensaje}</p>
        <span class={FechaChat(mensaje.escritoPor)}>{moment(mensaje.fecha).format('DD/MM/yyyy HH:mm')}</span>
        {/* <p>Escrito por: {mensaje.escritoPor}</p> */}
        <br></br>
       </div>
      </div>
    );
    return (
      <div>
        {content}
      </div>
    );
  }


export default class Mensaje extends React.Component{
    state={
        loading: true,
        mensaje:null,
        id: this.props.match.params.id,
    };

    async componentWillMount(){
        const { id } = this.state
        const url =  await api.getMensajes(id)
        // const response = await fetch(url);
        // const data = await response.json();
        this.setState({mensaje: url.data.data, loading:false});
    }
    

    render(){
        return(
            <div>
                {this.state.loading || !this.state.mensaje ? (
                    <div>loading...</div>
                ):(
                    <div>
                        <Prueba mensaje={this.state.mensaje} />
                    </div>
                )}
                <CrearMensaje />
            </div>
        );
    }
}