import React, { Component,useContext,useEffect } from 'react'
import api from '../../api'
import { useHistory,Redirect } from "react-router-dom";
import UserContext from "../../context/userContext";
import { useOktaAuth } from "@okta/okta-react";
import firebase from "firebase/app";
import "firebase/auth";

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


class EditarCita extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            // idUser: this.props.match.params.idUser,
            idUser: this.props.userData.id,
            fecha: '',
            ciudad:'',
            direccion:'',
            centroMedico:'',
            motivo: '',
        }
    }

    handleChangeInputFecha = async event => {
        const fecha = event.target.value
        this.setState({ fecha })
    }
    
    handleChangeInputCiudad = async event => {
        const ciudad = event.target.validity.valid
            ? event.target.value
            : this.state.ciudad

        this.setState({ ciudad })
    }

    handleChangeInputDireccion = async event => {
        const direccion = event.target.validity.valid
            ? event.target.value
            : this.state.direccion

        this.setState({ direccion })
    }

    handleChangeInputCentroMedico = async event => {
        const centroMedico = event.target.validity.valid
            ? event.target.value
            : this.state.centroMedico

        this.setState({ centroMedico })
    }

    handleChangeInputMotivo = async event => {
        const motivo = event.target.validity.valid
            ? event.target.value
            : this.state.motivo

        this.setState({ motivo })
    }
    


    handleUpdateCita = async () => {
        const { id, fecha,ciudad,direccion,centroMedico, motivo } = this.state
        const payload = { fecha,ciudad,direccion,centroMedico, motivo }

        await api.editarCita(id, payload).then(res => {
           console.log(`Cita updated successfully`)
            this.setState({
                fecha: '',
                ciudad:'',
                direccion:'',
                centroMedico:'',
                motivo: '',
            })
            this.props.history.push('/');
        })
    }

    componentWillMount = async () => {
        const { id } = this.state
        const {idUser} =this.state
        console.log(idUser)
        const cita = await api.getCitaById(id)
        if(idUser != cita.data.data.medico){
            this.props.history.push('/error');
        }
        this.setState({
            fecha: cita.data.data.fecha,
            ciudad: cita.data.data.ciudad,
            direccion: cita.data.data.direccion,
            centroMedico: cita.data.data.centroMedico,
            motivo: cita.data.data.motivo,
        })
    }

    render() {
        const {fecha,ciudad,direccion,centroMedico, motivo,id } = this.state
        return (
            <Wrapper>
                <Title>Editar cita</Title>

                <Label>Fecha: </Label>
                <InputText
                    type="text"
                    value={fecha}
                    onChange={this.handleChangeInputFecha}
                />

                <Label>Ciudad: </Label>
                <InputText
                    type="text"
                    value={ciudad}
                    onChange={this.handleChangeInputCiudad}
                />

                <Label>Dirección: </Label>
                <InputText
                    type="text"
                    value={direccion}
                    onChange={this.handleChangeInputDireccion}
                />

                <Label>Centro Médico: </Label>
                <InputText
                    type="text"
                    value={centroMedico}
                    onChange={this.handleChangeInputCentroMedico}
                />

                <Label>Motivo: </Label>
                <InputText
                    type="text"
                    value={motivo}
                    onChange={this.handleChangeInputMotivo}
                />

                <Button onClick={this.handleUpdateCita}>Editar cita</Button>
                <CancelButton href={id+'/citas'}>Cancelar</CancelButton>
            </Wrapper>
        )
}
}

export default EditarCita