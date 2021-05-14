import React, { Component } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom';
import NoPermisos from '../logo/NoPermisos.png'

const Wrapper = styled.a.attrs({
    className: 'navbar-brand',
})``

class NoPerm extends Component {
    render() {
        return (
            <Wrapper>
                <img class="NoPermisos" src={NoPermisos}/>
            </Wrapper>
        )
    }
}

export default NoPerm