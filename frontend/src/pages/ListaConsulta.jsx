import React, { Component } from 'react'
import api from '../api'
import axios from 'axios'


class ListaConsulta extends Component {
    constructor(props) {
        super(props)
        this.state = {
            enquiries: [],
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.listaConsulta().then(enquiries => {
            this.setState({
                enquiries: enquiries.data.data,
                isLoading: false,
            })
        })
    }

    render() {
        let {enquiries}=this.props;
        return (
           <p>{enquiries}</p>
        )
    }
}

export default ListaConsulta;