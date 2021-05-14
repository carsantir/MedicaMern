import React, { Component,useContext,useEffect } from 'react'
import api from '../../api'
import Checkbox from '@material-ui/core/Checkbox';
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


class EditarInformePrueba extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            // idUser: this.props.match.params.idUser,
            idUser: this.props.userData.id,
            fecha : '',
            nombre : '',
            descripcion: '',
            resultado: '',
        }
    }

    handleChangeInputFecha = async event => {
        const fecha = event.target.value
        this.setState({ fecha })
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

    handleChangeInputResultado = async event => {
        const resultado = event.target.validity.valid
            ? event.target.value
            : this.state.resultado

        this.setState({ resultado })
    }


    handleUpdateInformePrueba = async () => {
        const { id, fecha,resultado,nombre,descripcion } = this.state
        const payload = { fecha,resultado,nombre,descripcion }

        await api.editarInformePrueba(id, payload).then(res => {
           console.log(`Informe updated successfully`)
            this.setState({
                fecha : '',
                nombre : '',
                descripcion: '',
                resultado: '',
            })
            this.props.history.push('/');
        })
    }

    componentWillMount = async () => {
        const { id } = this.state
        const {idUser} =this.state
        console.log(idUser)
        const informePrueba = await api.getInformePrueba(id)
        if(idUser != informePrueba.data.data.medico){
            this.props.history.push('/error');
        }
        this.setState({
            fecha : informePrueba.data.data.fecha,
            nombre : informePrueba.data.data.nombre,
            descripcion: informePrueba.data.data.descripcion,
            resultado: informePrueba.data.data.resultado,
        })
    }

    render() {
        const {id, fecha,resultado,nombre,descripcion } = this.state
        return (
            <Wrapper>
                <Title>Editar informe de prueba médica</Title>

                <Label>Fecha: </Label>
                <InputText
                    type="text"
                    value={fecha}
                    onChange={this.handleChangeInputFecha}
                />

                <Label>Nombre de prueba: </Label>
                <InputText
                    type="text"
                    value={nombre}
                    onChange={this.handleChangeInputNombre}
                />

                <Label>Descripción: </Label>
                <InputText
                    type="text"
                    value={descripcion}
                    onChange={this.handleChangeInputDescripcion}
                />

                <Label>Resultado: </Label>
                <InputText
                    type="text"
                    value={resultado}
                    onChange={this.handleChangeInputResultado}
                />

                <Button onClick={this.handleUpdateInformePrueba}>Editar informe</Button>
                <CancelButton href={'/'}>Cancelar</CancelButton>
            </Wrapper>
        )
}
}

export default EditarInformePrueba