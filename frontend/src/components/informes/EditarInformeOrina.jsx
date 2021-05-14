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


class EditarInformeOrina extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            // idUser: this.props.match.params.idUser,
            idUser: this.props.userData.id,
            fecha : '',
            observaciones  : '',
            densidad : '',
            ph : '',
            glucosa : '',
            proteina : '',
            hematies : '',
            leufocitos : '',
            cetonas : '',
            bilirrubina : '',
            nitritos : false,
            cristales : false,
            celulasEpiteliales : false,
            cilindros : false,
            bacterias : false,
        }
    }

    handleChangeInputFecha = async event => {
        const fecha = event.target.value
        this.setState({ fecha })
    }
    
    handleChangeInputObservaciones = async event => {
        const observaciones = event.target.validity.valid
            ? event.target.value
            : this.state.observaciones

        this.setState({ observaciones })
    }

    handleChangeInputDensidad = async event => {
        const densidad = event.target.validity.valid
            ? event.target.value
            : this.state.densidad

        this.setState({ densidad })
    }

    handleChangeInputPh = async event => {
        const ph = event.target.validity.valid
            ? event.target.value
            : this.state.ph

        this.setState({ ph })
    }

    handleChangeInputGlucosa = async event => {
        const glucosa = event.target.validity.valid
            ? event.target.value
            : this.state.glucosa

        this.setState({ glucosa })
    }

    handleChangeInputProteina = async event => {
        const proteina = event.target.validity.valid
            ? event.target.value
            : this.state.proteina

        this.setState({ proteina })
    }

    handleChangeInputHematies = async event => {
        const hematies = event.target.validity.valid
            ? event.target.value
            : this.state.hematies

        this.setState({ hematies })
    }

    handleChangeInputLeufocitos = async event => {
        const leufocitos = event.target.validity.valid
            ? event.target.value
            : this.state.leufocitos

        this.setState({ leufocitos })
    }

    handleChangeInputCetonas = async event => {
        const cetonas = event.target.validity.valid
            ? event.target.value
            : this.state.cetonas

        this.setState({ cetonas })
    }

    handleChangeInputBilirrubina = async event => {
        const bilirrubina = event.target.validity.valid
            ? event.target.value
            : this.state.bilirrubina

        this.setState({ bilirrubina })
    }

    handleChangeInputNitritos = async event => {
        const nitritos = event.target.validity.valid
            ? event.target.value
            : this.state.nitritos

        this.setState({ nitritos })
    }

    handleChangeInputCristales = async event => {
        const cristales = event.target.validity.valid
            ? event.target.value
            : this.state.cristales

        this.setState({ cristales })
    }

    handleChangeInputCelulasEpiteliales = async event => {
        const celulasEpiteliales = event.target.validity.valid
            ? event.target.value
            : this.state.celulasEpiteliales

        this.setState({ celulasEpiteliales })
    }

    handleChangeInputCilindros = async event => {
        const cilindros = event.target.validity.valid
            ? event.target.value
            : this.state.cilindros

        this.setState({ cilindros })
    }

    handleChangeInputBacterias = async event => {
        const bacterias = event.target.validity.valid
            ? event.target.value
            : this.state.bacterias

        this.setState({ bacterias })
    }


    handleUpdateInformeOrina = async () => {
        const { id, fecha,observaciones, densidad, ph, glucosa,proteina,hematies,leufocitos,cetonas,
            bilirrubina, nitritos, cristales,celulasEpiteliales,cilindros,bacterias } = this.state
        const payload = { fecha,observaciones, densidad, ph, glucosa,proteina,hematies,leufocitos,cetonas,
            bilirrubina, nitritos, cristales,celulasEpiteliales,cilindros,bacterias }

        await api.editarInformeOrina(id, payload).then(res => {
           console.log(`Informe updated successfully`)
            this.setState({
                fecha : '',
                observaciones  : '',
                densidad : '',
                ph : '',
                glucosa : '',
                proteina : '',
                hematies : '',
                leufocitos : '',
                cetonas : '',
                bilirrubina : '',
                nitritos : false,
                cristales : false,
                celulasEpiteliales : false,
                cilindros : false,
                bacterias : false,
            })
            this.props.history.push('/');
        })
    }

    componentWillMount = async () => {
        const { id } = this.state
        const {idUser} =this.state
        console.log(idUser)
        const informeOrina = await api.getInformeOrina(id)
        if(idUser != informeOrina.data.data.medico){
            this.props.history.push('/error');
        }
        this.setState({
            fecha : informeOrina.data.data.fecha,
            observaciones  : informeOrina.data.data.observaciones,
            densidad : informeOrina.data.data.densidad,
            ph : informeOrina.data.data.ph,
            glucosa : informeOrina.data.data.glucosa,
            proteina : informeOrina.data.data.proteina,
            hematies : informeOrina.data.data.hematies,
            leufocitos : informeOrina.data.data.leufocitos,
            cetonas : informeOrina.data.data.cetonas,
            bilirrubina : informeOrina.data.data.bilirrubina,
            nitritos : informeOrina.data.data.nitritos,
            cristales : informeOrina.data.data.cristales,
            celulasEpiteliales : informeOrina.data.data.celulasEpiteliales,
            cilindros : informeOrina.data.data.cilindros,
            bacterias : informeOrina.data.data.bacterias,
        })
    }

    render() {
        const {fecha,observaciones, densidad, ph, glucosa,proteina,hematies,leufocitos,cetonas,
            bilirrubina, nitritos, cristales,celulasEpiteliales,cilindros,bacterias } = this.state
        return (
            <Wrapper>
                <Title>Editar informe de orina</Title>

                <Label>Fecha: </Label>
                <InputText
                    type="text"
                    value={fecha}
                    onChange={this.handleChangeInputFecha}
                />

                <Label>Observaciones: </Label>
                <InputText
                    type="text"
                    value={observaciones}
                    onChange={this.handleChangeInputObservaciones}
                />

                <Label>Densidad: </Label>
                <InputText
                    type="number"
                    step="0.01"
                    value={densidad}
                    onChange={this.handleChangeInputDensidad}
                />

                <Label>PH: </Label>
                <InputText
                    type="number"
                    step="0.01"
                    value={ph}
                    onChange={this.handleChangeInputPh}
                />

                <Label>Glucosa: </Label>
                <InputText
                    type="number"
                    step="0.01"
                    value={glucosa}
                    onChange={this.handleChangeInputGlucosa}
                />

                <Label>Proteina: </Label>
                <InputText
                    type="number"
                    step="0.01"
                    value={proteina}
                    onChange={this.handleChangeInputProteina}
                />

                <Label>Hematies: </Label>
                <InputText
                    type="number"
                    step="0.01"
                    value={hematies}
                    onChange={this.handleChangeInputHematies}
                />

                <Label>Leufocitos: </Label>
                <InputText
                    type="number"
                    step="0.01"
                    value={leufocitos}
                    onChange={this.handleChangeInputLeufocitos}
                />

                <Label>Cetonas: </Label>
                <InputText
                    type="number"
                    step="0.01"
                    value={cetonas}
                    onChange={this.handleChangeInputCetonas}
                />  

                <Label>Bilirrubina: </Label>
                <InputText
                    type="number"
                    step="0.01"
                    value={bilirrubina}
                    onChange={this.handleChangeInputBilirrubina}
                />
            
                <Label>Nitritos: </Label>
                <Checkbox
                    id="nitritos"
                    defaultChecked={nitritos}
                    onChange={this.handleChangeInputNitritos}
                />

                <Label>Cristales: </Label>
                <Checkbox
                    id="cristales"
                    defaultChecked={cristales}
                    value={cristales}
                    onChange={this.handleChangeInputCristales}
                />

                <Label>Células epiteliales: </Label>
                <Checkbox
                    id="celulasEpiteliales"
                    defaultChecked={celulasEpiteliales}
                    value={celulasEpiteliales}
                    onChange={this.handleChangeInputCelulasEpiteliales}
                />

                <Label>Cilindros: </Label>
                <Checkbox
                    id="cilindros"
                    defaultChecked={cilindros}
                    value={cilindros}
                    onChange={this.handleChangeInputCilindros}
                />

                <Label>Bacterias: </Label>
                <Checkbox
                    id="bacterias"
                    defaultChecked={bacterias}
                    onChange={this.handleChangeInputBacterias}
                />  

                

                <Button onClick={this.handleUpdateInformeOrina}>Editar informe</Button>
                <CancelButton href={'/'}>Cancelar</CancelButton>
            </Wrapper>
        )
}
}


// function EsChecked(valor,funcion){
//     let final;
//     if(valor==true){
//         final= <Checkbox
//         checked
//         value={valor}
//         onChange={funcion}
//     />;
//     }else if(valor==false){
//         final= <Checkbox
//         value={valor}
//         onChange={funcion}
//     />;
//     }
//     return final;
// }

export default EditarInformeOrina