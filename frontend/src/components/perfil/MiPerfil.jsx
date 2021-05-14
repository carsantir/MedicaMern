import React, { Component, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import moment from 'moment';
import api, { editarConsultaAtencionEspecial } from '../../api'
import UserContext from "../../context/userContext";
import cita from '../logo/cita.png'
import user from '../logo/user.png'
import consultaImg from '../logo/medical-file.png'
import motive from '../logo/libreta-de-direcciones.png'
import personas from '../logo/personas.png'
import doctor from '../logo/doctor.png'
import medic from '../logo/medico.png'

function Prueba(props) {
    const history = useHistory();
    const mensajes = () => history.push("/mensajes");
    
    let content;
    let content2;
    if(props.rol=="Paciente"){
        return (
            <div class="perfilList">
                <div class="cards-cita">
                <div class="topCitas">
                <img src={props.user.imgPerfil || user}/>
                </div>
                <div class="citaSel" >
                <div class="userDetails">
                    <div class="bloque1">
                    <div class="atributo">
                Nombre: {props.user.nombre}
                </div>
                <div class="atributo">
                Nombre de usuario: {props.user.nickname}
                </div>
                <div class="atributo">
                Sexo: {props.user.sexo}
                {/* Fecha de nacimiento: {moment(props.user.fechaNacimiento).format('DD/MM/yyyy')} */}
                </div>
                <div class="atributo">
                DNI: {props.user.dni}
                </div>
                <div class="atributo">
                Ciudad: {props.ciudad.provincia}
                </div>
                <div class="atributo">
                Localidad: {props.user.localidad}
                </div>
                <div class="atributo">
                Dirección: {props.user.direccion}
                </div>
                    </div>
                    <div class="bloque2">
                    <div class="atributo">
                Apellidos: {props.user.apellidos}
                </div>
                <div class="atributo">
                Correo electrónico: {props.user.email}
                </div>
                <div class="atributo">
                Fecha de nacimiento: {moment(props.user.fechaNacimiento).format('DD/MM/yyyy')}
                </div>
                <div class="atributo">
                Número de seguridad social: {props.user.numSeguridadSocial}
                </div>
                <div class="atributo">
                Centro médico: {props.hospital.nombre}
                </div>
                <div class="atributo">
                Código postal: {props.user.cp}
                </div>
                <div class="atributo">
                Teléfono: {props.user.telefono}
                </div>
                    </div>
                {/* <div class="linea">
                <div class="atributo">
                Nombre: {props.user.nombre}
                </div>
                <div class="atributo">
                Apellidos: {props.user.apellidos}
                </div>
                </div>
                <br></br>
                <div class="linea">
                <div class="atributo">
                Sexo: {props.user.sexo}
                </div>
                <div class="atributo">
                Teléfono: {props.user.telefono}
                </div>
                </div>
                <br></br>
                <div class="linea">
                <div class="atributo">
                Fecha de nacimiento: {moment(props.user.fechaNacimiento).format('DD/MM/yyyy')}<br></br>
                </div>
                <div class="atributo">
                Dirección: {props.user.direccion}<br></br>
                </div>
                </div>
                <br></br>
                <div class="linea">
                <div class="atributo">
                Localidad: {props.user.localidad}<br></br>
                </div>
                <div class="atributo">
                Ciudad:{props.user.ciudad}
                </div>
                </div> */}
               

                </div>
                <br></br><br></br>
                <div class="linea">
                <div class="botonesCita">
                <Citas/>
                </div>
                <div class="botonesCita">
                <Informes />
                </div>
                <div class="botonesCita">
                <Enfermedades />
                </div>
                <div class="botonesCita">
                <RegistrosTension />
                </div>
                </div>
                </div>
                </div>
              <br></br><br></br>
            </div>
          );
        }else{
            return (
                <div class="perfilList">
                    <div class="cards-cita">
                    <div class="topCitas">
                    <img src={props.user.imgPerfil || user}/>
                    </div>
                    <div class="citaSel" >
                    <div class="userDetails">
                        <div class="bloque1">
                        <div class="atributo">
                    Nombre: {props.user.nombre}
                    </div>
                    <div class="atributo">
                    Nombre de usuario: {props.user.nickname}
                    </div>
                    <div class="atributo">
                    Sexo: {props.user.sexo}
                    {/* Fecha de nacimiento: {moment(props.user.fechaNacimiento).format('DD/MM/yyyy')} */}
                    </div>
                    <div class="atributo">
                    DNI: {props.user.dni}
                    </div>
                    <div class="atributo">
                    Ciudad: {props.ciudad.provincia}
                    </div>
                    <div class="atributo">
                    Localidad: {props.user.localidad}
                    </div>
                    <div class="atributo">
                    Dirección: {props.user.direccion}
                    </div>
                        </div>
                        <div class="bloque2">
                        <div class="atributo">
                    Apellidos: {props.user.apellidos}
                    </div>
                    <div class="atributo">
                    Correo electrónico: {props.user.email}
                    </div>
                    <div class="atributo">
                    Fecha de nacimiento: {moment(props.user.fechaNacimiento).format('DD/MM/yyyy')}
                    </div>
                    <div class="atributo">
                    Sector: {props.user.sector}
                    </div>
                    <div class="atributo">
                    Centro médico: {props.hospital.nombre}
                    </div>
                    <div class="atributo">
                    Código postal: {props.user.cp}
                    </div>
                    <div class="atributo">
                    Teléfono: {props.user.telefono}
                    </div>
                        </div>
                    {/* <div class="linea">
                    <div class="atributo">
                    Nombre: {props.user.nombre}
                    </div>
                    <div class="atributo">
                    Apellidos: {props.user.apellidos}
                    </div>
                    </div>
                    <br></br>
                    <div class="linea">
                    <div class="atributo">
                    Sexo: {props.user.sexo}
                    </div>
                    <div class="atributo">
                    Teléfono: {props.user.telefono}
                    </div>
                    </div>
                    <br></br>
                    <div class="linea">
                    <div class="atributo">
                    Fecha de nacimiento: {moment(props.user.fechaNacimiento).format('DD/MM/yyyy')}<br></br>
                    </div>
                    <div class="atributo">
                    Dirección: {props.user.direccion}<br></br>
                    </div>
                    </div>
                    <br></br>
                    <div class="linea">
                    <div class="atributo">
                    Localidad: {props.user.localidad}<br></br>
                    </div>
                    <div class="atributo">
                    Ciudad:{props.user.ciudad}
                    </div>
                    </div> */}
                   
    
                    </div>
                    </div>
                    </div>
                  <br></br><br></br>
                </div>
              );
        }
    // }else{
    //     content = props.consulta.map((consulta) =>
    //     <div class="cards-consulta">
    //         <div class='top'>
    //         <img src={doctor} />
    //         </div>
    //     <div class="consulta" key={consulta._id}>
    //         <div class="fecha">
    //         <p><img class="calendar" src={motive}/><div class="fechaPad">Motivo: {consulta.motivo}</div></p>
    //         </div>
    //         <div class="fecha">
    //         <p><img class="calendar" src={calendar}/><div class="fechaPad">Fecha: {moment(consulta.fecha).format('DD/MM/yyyy HH:mm')}</div></p>
    //         </div>
    //         <div class="fecha">
    //         <p><img class="calendar" src={personas}/><div class="fechaPad">Paciente: {consulta.paciente.nickname}</div></p>
    //         </div>
    //         <div class="consultaBotones">
    //         <EditarConsulta id={consulta._id} />
    //         </div>
    //         <div class="consultaBotones">
    //         <EliminarConsulta id={consulta._id}/>
    //         </div>
    //         <div class="consultaBotones">
    //         <MensajeMedico id={consulta._id} />
    //         </div>
    //         <div class="consultaBotones">
    //         <CrearCita id={consulta._id} idPaciente={consulta.paciente._id} />
    //         </div>
    //     </div>
    //     </div>
    //     );
    //     content2 = props.consultaAtencionEspecial.map((consultaAtencionEspecial) =>
    //     <div class="cards-consulta">
    //         <div class='top'>
    //         <img src={doctor} />
    //         </div>
    //     <div class="consulta" key={consultaAtencionEspecial._id}>
    //         <div class="fecha">
    //         <p><img class="calendar" src={motive}/><div class="fechaPad">Finalizada: {consultaAtencionEspecial.finalizada}</div></p>
    //         </div>
    //         <div class="fecha">
    //         <p><img class="calendar" src={calendar}/><div class="fechaPad">Fecha: {moment(consultaAtencionEspecial.fecha).format('DD/MM/yyyy HH:mm')}</div></p>
    //         </div>
    //         <div class="fecha">
    //         <p><img class="calendar" src={personas}/><div class="fechaPad">Paciente: {consultaAtencionEspecial.paciente.nickname}</div></p>
    //         </div>
    //         <div class="consultaBotones">
    //         <EditarConsultaAtencionEspecial id={consultaAtencionEspecial._id} />
    //         </div>
    //     </div>
    //     </div>
    //     );

    //     return (
    //         <div class="consultaList">
    //           {content2}
    //           {content}
    //           <br></br>
    //         </div>
    //       );
    // }
  }


  function Citas(){
    const history = useHistory();
    const { userData } = useContext(UserContext);
    const citas = () => history.push("/"+userData.user.id+"/citas");
    return(
        <div class="citas">
        <button className="rad-button wwt flat" onClick={citas}>Ver citas</button>
        </div>
    );
    }

    function Informes(){
        const history = useHistory();
        const { userData } = useContext(UserContext);
        const informes = () => history.push("/"+userData.user.id+"/informes");
        return(
            <div class="citas">
            <button className="rad-button wwt flat" onClick={informes}>Ver informes</button>
            </div>
        );
    }

    function Enfermedades(){
        const history = useHistory();
        const { userData } = useContext(UserContext);
        const enfermedades = () => history.push("/"+userData.user.id+"/enfermedades");
        return(
            <div class="citas">
            <button className="rad-button wwt flat" onClick={enfermedades}>Ver enfermedades</button>
            </div>
        );
    }


    function RegistrosTension(props){
        const history = useHistory();
        const { userData } = useContext(UserContext);
        const registrosTension = () => history.push("/"+userData.user.id+"/registrosTension");
        return(
            <button className="rad-button wwt flat" onClick={registrosTension}>Registros de tensión <br></br>arterial</button>
        );
    }

export default class MiPerfil extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            rol: this.props.userData.rol,
            loading: true,
        }
    }

    async componentWillMount(){
        const { id } = this.state
        const { rol } = this.state
        
        let url;
        let ciudad;
        let hospital;
        if(rol=="Paciente"){
            url = await api.getUserById(id)
            ciudad = await api.getProvinciaById(url.data.data.ciudad)
            hospital = await api.getHospitalById(url.data.data.centroMedico)
        }else{
            url = await api.getMedicById(id)
            ciudad = await api.getProvinciaById(url.data.data.ciudad)
            hospital = await api.getHospitalById(url.data.data.centroMedico)
        }
        // }else{
        //     url = await api.getConsultaByMedicoId(id)
            
        // }
        // const response = await fetch(url);
        // const data = await response.json();
        this.setState({
            user: url.data.data,
            loading:false, 
            rol:rol,
            ciudad:ciudad.data.data,
            hospital:hospital.data.data,
        });
    }
    

    render(){
        return(
            <div>
                {this.state.loading || !this.state.id ? (
                    <div>loading...</div>
                ):(
                    <div>
                        <Prueba rol={this.state.rol} user={this.state.user} ciudad={this.state.ciudad} hospital={this.state.hospital}/>
                        
                    </div>
                )}
            </div>
        );
    }
}