import React, { useState, useContext } from 'react';
import { useHistory,Redirect } from "react-router-dom";
import axios from "axios";
import UserContext from "../../context/userContext";
import ErrorNotice from "../../components/misc/ErrorNotice";
function Login () {
const [email, setEmail] = useState();
const [password, setPassword] = useState();
const [error, setError] = useState();
const { userData,setUserData } = useContext(UserContext);
const history = useHistory();
const submit = async (e) => {
e.preventDefault();
try{
const loginUser = {email, password};
const loginResponse = await axios.post("http://localhost:5000/users/login", loginUser);
setUserData({
token: loginResponse.data.token,
user: loginResponse.data.user
});
localStorage.setItem("auth-token", loginResponse.data.token);
history.push("/");
} catch(err) {
err.response.data.msg && setError(err.response.data.msg)
}
};
return (
    <div class="form">
        <h2 class="loginh2">Iniciar sesión</h2>
        {error && <ErrorNotice message={error} clearError={() => setError(undefined)} />}
        <form onSubmit={submit}>
        <div class="input">
            <div class="inputBox">
                <label>Email</label>
                <input type="email" id="email" onChange={e => setEmail(e.target.value)}/>
            </div>
            <div class="inputBox">
            <label>Contraseña</label>
            <input type="password" id="password" onChange={e => setPassword(e.target.value)}/>
            </div>
            <div class="inputBox">
            <input type="submit" value="Iniciar sesión" className="btn btn-primary" />
            </div>
        </div>
        </form>
    </div>

        
    /* <div className="login">
    <h2>Login</h2>
    {error && <ErrorNotice message={error} clearError={() => setError(undefined)} />}
    <form onSubmit={submit}>
    <label>Email: </label>
    <input type="email" id="email" onChange={e => setEmail(e.target.value)}/>
    <label>Password: </label>
    <input type="password" id="password" onChange={e => setPassword(e.target.value)}/>
    <input type="submit" value="Login" className="btn btn-primary" />
    </form>
    </div> */
    );
}
export default Login;