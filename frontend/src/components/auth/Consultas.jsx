import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import axios from "axios";
import UserContext from "../../context/userContext";
import ErrorNotice from "../../components/misc/ErrorNotice";
function Consultas(){
const history = useHistory();
const crearConsulta = () => history.push("/crearConsulta");
return(
    <div>
    <button className="btn btn-primary mr-2" onClick={crearConsulta}>Crear consulta</button>
    </div>
);
}

export default Consultas;