import React, { Component,useContext,useEffect } from 'react'
import api from '../../api'
import { useHistory,Redirect } from "react-router-dom";
import UserContext from "../../context/userContext";
import { useOktaAuth } from "@okta/okta-react";
import firebase from "firebase/app";
import moment from 'moment';
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


class EditarEnfermedad extends Component {
    constructor(props) {
        super(props)
        this.state = {
            idEnfermedad: this.props.match.params.idEnfermedad,
            idUser: this.props.userData.id,
            nombre: '',
            descripcion: '',
        }
    }

    handleChangeInputNombre = async event => {
        const nombre = event.target.validity.valid
            ? event.target.value
            : this.state.nombre

        this.setState({ nombre })
    }

    handleChangeInputDescripcion = async event => {
        const descripcion = event.target.validity.valid
            ? event.target.value
            : this.state.descripcion

        this.setState({ descripcion })
    }


    handleUpdateEnfermedad = async () => {
        const { idEnfermedad, nombre, descripcion } = this.state
        const payload = { nombre, descripcion }

        await api.editEnfermedad(idEnfermedad, payload).then(res => {
           console.log(`Consulta updated successfully`)
            this.setState({
                nombre: '',
                descripcion: '',
            })
            this.props.history.push('/');
        })
    }

    componentWillMount = async () => {
        const { idEnfermedad } = this.state
        const {idUser} =this.state
        console.log(idUser)
        const enfermedad = await api.getEnfermedad(idEnfermedad)
        if(idUser != enfermedad.data.data.medico){
            this.props.history.push('/error');
        }
        this.setState({
            nombre: enfermedad.data.data.nombre,
            descripcion: enfermedad.data.data.descripcion,
        })
    }

    render() {
        const { nombre, descripcion,idEnfermedad } = this.state
        return (
            <div className="form">
            <Wrapper>
                <Title>Editar enfermedad</Title>
                <div class="input">
                <div class="inputBox">
                <Label>Nombre: </Label>
                <InputText
                    type="text"
                    value={nombre}
                    onChange={this.handleChangeInputNombre}
                />
                </div>
                <div class="inputBox">
                <Label>Descripción: </Label>
                <InputText
                    type="text"
                    value={descripcion}
                    onChange={this.handleChangeInputDescripcion}
                />
                </div>
                <div class="inputBox">
                <Button onClick={this.handleUpdateEnfermedad}>Editar enfermedad</Button>
                </div>
                <div class="inputBox">
                <CancelButton href={'/'}>Cancelar</CancelButton>
                </div>
                </div>
            </Wrapper>
            </div>
        )
}
}

export default EditarEnfermedad