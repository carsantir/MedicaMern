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


class EditarInformeSangre extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            // idUser: this.props.match.params.idUser,
            idUser: this.props.userData.id,
            fecha : '',
            observaciones  : '',
            hematies : '',
            hemoglobina : '',
            hematocrito : '',
            vcm : '',
            hcm : '',
            linfocitos : '',
            neutrofilos : '',
            eosinofilos : '',
            plaquetas : '',
            vsg : '',
            glucosa : '',
            urea : '',
            acidoUrico : '',
            creatinina : '',
            colesterol : '',
            trigliceridos : '',
            transaminasas : '',
            fosfatasaAlcalina : '',
            calcio : '',
            hierro : '',
            potasio : '',
            sodio : '',
            bilirrubina : '',
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

    handleChangeInputHematies = async event => {
        const hematies = event.target.validity.valid
            ? event.target.value
            : this.state.hematies

        this.setState({ hematies })
    }

    handleChangeInputHemoglobina = async event => {
        const hemoglobina = event.target.validity.valid
            ? event.target.value
            : this.state.hemoglobina

        this.setState({ hemoglobina })
    }

    handleChangeInputHematocrito = async event => {
        const hematocrito = event.target.validity.valid
            ? event.target.value
            : this.state.hematocrito

        this.setState({ hematocrito })
    }

    handleChangeInputVcm = async event => {
        const vcm = event.target.validity.valid
            ? event.target.value
            : this.state.vcm

        this.setState({ vcm })
    }

    handleChangeInputHcm = async event => {
        const hcm = event.target.validity.valid
            ? event.target.value
            : this.state.hcm

        this.setState({ hcm })
    }

    handleChangeInputLinfocitos = async event => {
        const linfocitos = event.target.validity.valid
            ? event.target.value
            : this.state.linfocitos

        this.setState({ linfocitos })
    }

    handleChangeInputNeutrofilos = async event => {
        const neutrofilos = event.target.validity.valid
            ? event.target.value
            : this.state.neutrofilos

        this.setState({ neutrofilos })
    }

    handleChangeInputEosinofilos = async event => {
        const eosinofilos = event.target.validity.valid
            ? event.target.value
            : this.state.eosinofilos

        this.setState({ eosinofilos })
    }

    handleChangeInputPlaquetas = async event => {
        const plaquetas = event.target.validity.valid
            ? event.target.value
            : this.state.plaquetas

        this.setState({ plaquetas })
    }

    handleChangeInputVsg = async event => {
        const vsg = event.target.validity.valid
            ? event.target.value
            : this.state.vsg

        this.setState({ vsg })
    }

    handleChangeInputGlucosa = async event => {
        const glucosa = event.target.validity.valid
            ? event.target.value
            : this.state.glucosa

        this.setState({ glucosa })
    }

    handleChangeInputUrea = async event => {
        const urea = event.target.validity.valid
            ? event.target.value
            : this.state.urea

        this.setState({ urea })
    }

    handleChangeInputAcidoUrico = async event => {
        const acidoUrico = event.target.validity.valid
            ? event.target.value
            : this.state.acidoUrico

        this.setState({ acidoUrico })
    }

    handleChangeInputCreatinina = async event => {
        const creatinina = event.target.validity.valid
            ? event.target.value
            : this.state.creatinina

        this.setState({ creatinina })
    }
    
    handleChangeInputColesterol = async event => {
        const colesterol = event.target.validity.valid
            ? event.target.value
            : this.state.colesterol

        this.setState({ colesterol })
    }

    handleChangeInputTrigliceridos = async event => {
        const trigliceridos = event.target.validity.valid
            ? event.target.value
            : this.state.trigliceridos

        this.setState({ trigliceridos })
    }

    handleChangeInputTransaminasas = async event => {
        const transaminasas = event.target.validity.valid
            ? event.target.value
            : this.state.transaminasas

        this.setState({ transaminasas })
    }

    handleChangeInputFosfatasaAlcalina = async event => {
        const fosfatasaAlcalina = event.target.validity.valid
            ? event.target.value
            : this.state.fosfatasaAlcalina

        this.setState({ fosfatasaAlcalina })
    }

    handleChangeInputCalcio = async event => {
        const calcio = event.target.validity.valid
            ? event.target.value
            : this.state.calcio

        this.setState({ calcio })
    }

    handleChangeInputHierro = async event => {
        const hierro = event.target.validity.valid
            ? event.target.value
            : this.state.hierro

        this.setState({ hierro })
    }

    handleChangeInputPotasio = async event => {
        const potasio = event.target.validity.valid
            ? event.target.value
            : this.state.potasio

        this.setState({ potasio })
    }
    
    handleChangeInputSodio = async event => {
        const sodio = event.target.validity.valid
            ? event.target.value
            : this.state.sodio

        this.setState({ sodio })
    }

    handleChangeInputBilirrubina = async event => {
        const bilirrubina = event.target.validity.valid
            ? event.target.value
            : this.state.bilirrubina

        this.setState({ bilirrubina })
    }


    handleUpdateInformeSangre = async () => {
        const { id, fecha,observaciones, hematies, hemoglobina, hematocrito,vcm,hcm,linfocitos,neutrofilos,
            eosinofilos, plaquetas, vsg,glucosa,urea,acidoUrico,creatinina,colesterol,trigliceridos,transaminasas, fosfatasaAlcalina,calcio,
            hierro,potasio,sodio,bilirrubina } = this.state
        const payload = { fecha,observaciones, hematies, hemoglobina, hematocrito,vcm,hcm,linfocitos,neutrofilos,
            eosinofilos, plaquetas, vsg,glucosa,urea,acidoUrico,creatinina,colesterol,trigliceridos,transaminasas, fosfatasaAlcalina,calcio,
            hierro,potasio,sodio,bilirrubina }

        await api.editarInformeSangre(id, payload).then(res => {
           console.log(`Informe updated successfully`)
            this.setState({
                fecha : '',
                observaciones  : '',
                hematies : '',
                hemoglobina : '',
                hematocrito : '',
                vcm : '',
                hcm : '',
                linfocitos : '',
                neutrofilos : '',
                eosinofilos : '',
                plaquetas : '',
                vsg : '',
                glucosa : '',
                urea : '',
                acidoUrico : '',
                creatinina : '',
                colesterol : '',
                trigliceridos : '',
                transaminasas : '',
                fosfatasaAlcalina : '',
                calcio : '',
                hierro : '',
                potasio : '',
                sodio : '',
                bilirrubina : '',
            })
            this.props.history.push('/');
        })
    }

    componentWillMount = async () => {
        const { id } = this.state
        const {idUser} =this.state
        console.log(idUser)
        const informeSangre = await api.getInformeSangre(id)
        if(idUser != informeSangre.data.data.medico){
            this.props.history.push('/error');
        }
        this.setState({
            fecha : informeSangre.data.data.fecha,
            observaciones  : informeSangre.data.data.observaciones,
            hematies : informeSangre.data.data.hematies,
            hemoglobina : informeSangre.data.data.hemoglobina,
            hematocrito : informeSangre.data.data.hematocrito,
            vcm : informeSangre.data.data.vcm,
            hcm : informeSangre.data.data.hcm,
            linfocitos : informeSangre.data.data.linfocitos,
            neutrofilos : informeSangre.data.data.neutrofilos,
            eosinofilos : informeSangre.data.data.eosinofilos,
            plaquetas : informeSangre.data.data.plaquetas,
            vsg : informeSangre.data.data.vsg,
            glucosa : informeSangre.data.data.glucosa,
            urea : informeSangre.data.data.urea,
            acidoUrico : informeSangre.data.data.acidoUrico,
            creatinina : informeSangre.data.data.creatinina,
            colesterol : informeSangre.data.data.colesterol,
            trigliceridos : informeSangre.data.data.trigliceridos,
            transaminasas : informeSangre.data.data.transaminasas,
            fosfatasaAlcalina : informeSangre.data.data.fosfatasaAlcalina,
            calcio : informeSangre.data.data.calcio,
            hierro : informeSangre.data.data.hierro,
            potasio : informeSangre.data.data.potasio,
            sodio : informeSangre.data.data.sodio,
            bilirrubina : informeSangre.data.data.bilirrubina,
        })
    }

    render() {
        const {id, fecha,observaciones, hematies, hemoglobina, hematocrito,vcm,hcm,linfocitos,neutrofilos,
            eosinofilos, plaquetas, vsg,glucosa,urea,acidoUrico,creatinina,colesterol,trigliceridos,transaminasas, fosfatasaAlcalina,calcio,
            hierro,potasio,sodio,bilirrubina } = this.state
        return (
            <Wrapper>
                <Title>Editar informe de sangre</Title>

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

                <Label>Hematies: </Label>
                <InputText
                    type="number"
                    step="0.01"
                    value={hematies}
                    onChange={this.handleChangeInputHematies}
                />

                
                <Label>Hemoglobina: </Label>
                <InputText
                    type="number"
                    step="0.01"
                    value={hemoglobina}
                    onChange={this.handleChangeInputHemoglobina}
                />

                <Label>Hematocrito: </Label>
                <InputText
                    type="number"
                    step="0.01"
                    value={hematocrito}
                    onChange={this.handleChangeInputHematocrito}
                />

                <Label>VCM: </Label>
                <InputText
                    type="number"
                    step="0.01"
                    value={vcm}
                    onChange={this.handleChangeInputVcm}
                />

                <Label>HCM: </Label>
                <InputText
                    type="number"
                    step="0.01"
                    value={hcm}
                    onChange={this.handleChangeInputHcm}
                />

                <Label>Linfocitos: </Label>
                <InputText
                    type="number"
                    step="0.01"
                    value={linfocitos}
                    onChange={this.handleChangeInputLinfocitos}
                />

                <Label>Neutrófilos: </Label>
                <InputText
                    type="number"
                    step="0.01"
                    value={neutrofilos}
                    onChange={this.handleChangeInputNeutrofilos}
                />

                <Label>Eosinófilos: </Label>
                <InputText
                    type="number"
                    step="0.01"
                    value={eosinofilos}
                    onChange={this.handleChangeInputEosinofilos}
                />  

                <Label>Eosinófilos: </Label>
                <InputText
                    type="number"
                    step="0.01"
                    value={eosinofilos}
                    onChange={this.handleChangeInputEosinofilos}
                />

                <Label>Plaquetas: </Label>
                <InputText
                    type="number"
                    step="0.01"
                    value={plaquetas}
                    onChange={this.handleChangeInputPlaquetas}
                />

                <Label>VSG: </Label>
                <InputText
                    type="number"
                    step="0.01"
                    value={vsg}
                    onChange={this.handleChangeInputVsg}
                />

                <Label>Glucosa: </Label>
                <InputText
                    type="number"
                    step="0.01"
                    value={glucosa}
                    onChange={this.handleChangeInputGlucosa}
                />

                <Label>Urea: </Label>
                <InputText
                    type="number"
                    step="0.01"
                    value={urea}
                    onChange={this.handleChangeInputUrea}
                />      

                <Label>Ácido úrico: </Label>
                <InputText
                    type="number"
                    step="0.01"
                    value={acidoUrico}
                    onChange={this.handleChangeInputAcidoUrico}
                />  

                <Label>Creatinina: </Label>
                <InputText
                    type="number"
                    step="0.01"
                    value={creatinina}
                    onChange={this.handleChangeInputCreatinina}
                />  

                <Label>Colesterol: </Label>
                <InputText
                    type="number"
                    step="0.01"
                    value={colesterol}
                    onChange={this.handleChangeInputColesterol}
                />  

                <Label>Triglicerados: </Label>
                <InputText
                    type="number"
                    step="0.01"
                    value={trigliceridos}
                    onChange={this.handleChangeInputTrigliceridos}
                />  

                <Label>Transaminasas: </Label>
                <InputText
                    type="number"
                    step="0.01"
                    value={transaminasas}
                    onChange={this.handleChangeInputTransaminasas}
                />  

                <Label>Fosfatasa Alcalina: </Label>
                <InputText
                    type="number"
                    step="0.01"
                    value={fosfatasaAlcalina}
                    onChange={this.handleChangeInputFosfatasaAlcalina}
                />

                <Label>Calcio: </Label>
                <InputText
                    type="number"
                    step="0.01"
                    value={calcio}
                    onChange={this.handleChangeInputCalcio}
                />    

                <Label>Hierro: </Label>
                <InputText
                    type="number"
                    step="0.01"
                    value={hierro}
                    onChange={this.handleChangeInputHierro}
                />  

                <Label>Potasio: </Label>
                <InputText
                    type="number"
                    step="0.01"
                    value={potasio}
                    onChange={this.handleChangeInputPotasio}
                />   

                <Label>Sodio: </Label>
                <InputText
                    type="number"
                    step="0.01"
                    value={sodio}
                    onChange={this.handleChangeInputSodio}
                />            

                <Label>Bilirrubina: </Label>
                <InputText
                    type="number"
                    step="0.01"
                    value={bilirrubina}
                    onChange={this.handleChangeInputBilirrubina}
                />  

                <Button onClick={this.handleUpdateInformeSangre}>Editar informe</Button>
                <CancelButton href={'/'}>Cancelar</CancelButton>
            </Wrapper>
        )
}
}

export default EditarInformeSangre