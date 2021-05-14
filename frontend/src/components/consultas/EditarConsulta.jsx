import React, { Component,useContext,useEffect } from 'react'
import api from '../../api'
import { useHistory,Redirect } from "react-router-dom";
import UserContext from "../../context/userContext";
import { useOktaAuth } from "@okta/okta-react";
import firebase from "firebase/app";
import moment from 'moment';
import "firebase/auth";
import Select from 'react-select';
import Async from 'react-async';

import styled from 'styled-components'

const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px;
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`

class EditarConsulta extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            // idUser: this.props.match.params.idUser,
            idUser: this.props.userData.id,
            medico:'',
        }
    }


    // handleChangeInputMedico = async event => {
    //     const motivo = event.target.validity.valid
    //         ? event.target.value
    //         : this.state.motivo

    //     this.setState({ motivo })
    // }

    onChange = async (selectedOption) => {

        console.log(`Option selected:`, selectedOption);
        const medico=(selectedOption.val);
        this.setState({ medico })
      };


    handleUpdateConsulta = async () => {
        const { id, medico } = this.state
        const payload = { medico }

        await api.editarConsulta(id, payload).then(res => {
           console.log(`Consulta updated successfully`)
            this.setState({
                medico: '',
            })
            this.props.history.push('/');
        })
    }


    componentWillMount = async () => {
        const { id } = this.state
        const {idUser} =this.state
        console.log(idUser)
        const consulta = await api.getConsultaById(id)
        if(idUser != consulta.data.data.medico){
            this.props.history.push('/error');
        }
        this.setState({
            medico: consulta.data.data.medico,
        })
    }

    render() {
        const { medico,id } = this.state
        const sacaMedicos = () =>
        api.getMedics()
        .then(res => {return res})
        return (

            <Wrapper className="form">
                <Title className="titleForm">Enviar a especialista</Title>
             
                
                <Label className="etiquetaForm">Médico: </Label>
                <Async promiseFn={sacaMedicos}>

                {({ data, err }) => {
                        if (err) return `Something went wrong: ${err.message}`

                        if (data){

                            const selectMedico = [];
                            data.data.data.map((medico) => { selectMedico.push({ desc:medico.nombre+" "+medico.apellidos+"-"+medico.sector, val: medico._id  })});

                            return (
                                <Select
                                options={selectMedico} getOptionLabel={(option)=>option.desc}
                                getOptionValue={(option)=>option.val } id="selectMedico" placeholder="Selecciona un medico" onChange={this.onChange} ></Select>
                                
                            )}
                        }}
                </Async>
                  
                <Button className="botonSubmit" onClick={this.handleUpdateConsulta}>Editar consulta</Button>        
                <CancelButton className="botonSubmit" href={id+'/consultas'}>Cancelar</CancelButton>
     
             
            </Wrapper>
     
        )
}
}

export default EditarConsulta