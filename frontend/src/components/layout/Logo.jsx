import React, { Component } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom';
import logo from '../logo/logoTFG.png'

const Wrapper = styled.a.attrs({
    className: 'navbar-brand',
})``


class Logo extends Component {
    render() {
        return (
            <Wrapper>
                <img class="logo" src={logo} width="50" height="50"/>
            </Wrapper>
        )
    }
}

export default Logo