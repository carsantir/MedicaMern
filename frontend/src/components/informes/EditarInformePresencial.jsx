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


class EditarInformePresencial extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            // idUser: this.props.match.params.idUser,
            idUser: this.props.userData.id,
            fecha : '',
            motivo : '',
            descripcion: '',
            diagnostico: '',
        }
    }

    handleChangeInputFecha = async event => {
        const fecha = event.target.value
        this.setState({ fecha })
    }
    
    handleChangeInputMotivo = async event => {
        const motivo = event.target.validity.valid
            ? event.target.value
            : this.state.motivo

        this.setState({ motivo })
    }

    handleChangeInputDescripcion = async event => {
        const descripcion = event.target.validity.valid
            ? event.target.value
            : this.state.descripcion

        this.setState({ descripcion })
    }

    handleChangeInputDiagnostico = async event => {
        const diagnostico = event.target.validity.valid
            ? event.target.value
            : this.state.diagnostico

        this.setState({ diagnostico })
    }


    handleUpdateInformePresencial = async () => {
        const { id, fecha,motivo,diagnostico,descripcion } = this.state
        const payload = { fecha,motivo,diagnostico,descripcion }

        await api.editarInformePresencial(id, payload).then(res => {
           console.log(`Informe updated successfully`)
            this.setState({
                fecha : '',
                motivo : '',
                descripcion: '',
                diagnostico: '',
            })
            this.props.history.push('/');
        })
    }

    componentWillMount = async () => {
        const { id } = this.state
        const {idUser} =this.state
        console.log(idUser)
        const informePresencial = await api.getInformePresencial(id)
        if(idUser != informePresencial.data.data.medico){
            this.props.history.push('/error');
        }
        this.setState({
            fecha : informePresencial.data.data.fecha,
            motivo : informePresencial.data.data.motivo,
            descripcion: informePresencial.data.data.descripcion,
            diagnostico: informePresencial.data.data.diagnostico,
        })
    }

    render() {
        const {id, fecha,motivo,diagnostico,descripcion } = this.state
        return (
            <Wrapper>
                <Title>Editar informe de consulta</Title>

                <Label>Fecha: </Label>
                <InputText
                    type="text"
                    value={fecha}
                    onChange={this.handleChangeInputFecha}
                />

                <Label> Motivo: </Label>
                <InputText
                    type="text"
                    value={motivo}
                    onChange={this.handleChangeInputMotivo}
                />

                <Label>Descripción: </Label>
                <InputText
                    type="text"
                    value={descripcion}
                    onChange={this.handleChangeInputDescripcion}
                />

                <Label>Diagnostico: </Label>
                <InputText
                    type="text"
                    value={diagnostico}
                    onChange={this.handleChangeInputDiagnostico}
                />

                <Button onClick={this.handleUpdateInformePresencial}>Editar informe</Button>
                <CancelButton href={'/'}>Cancelar</CancelButton>
            </Wrapper>
        )
}
}

export default EditarInformePresencial