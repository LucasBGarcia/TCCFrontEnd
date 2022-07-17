/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable jsx-a11y/alt-text */
import './login.css'
import { useState } from 'react';
import axios from 'axios';
import { Navigate } from "react-router-dom";

export default props => {

    const [usuario, setUsuario] = useState('')
    const [password, setPassword] = useState('')

    async function login() {
        axios
            .post('http://localhost:3333/login', {
                email: usuario.target.value,
                password: password.target.value,
            }).then((response) => {
                if (response.status === 200) {
                    localStorage.setItem("sipToken", response.data.token);
                    localStorage.setItem("sipUser", response.data.name);
                    alert(response.data.name + ", Bem-vindo!")
                    console.log(usuario)
                    Navigate("/home");
                }
            }).catch((e) => {
                alert(e.response.data.erro)
            })
    }


    return (
        <div className="container d-flex justify-content-center">
            <div className="card mt-5 w-50">
                <div className="card-body">
                    <form>
                        <div className="form-group">
                            <label htmlFor="nickName">E-mail</label>
                            <input
                                type="text"
                                style={{ backgroundColor: "white", opacity: "0.7" }}
                                className="form-control"
                                id='email'
                                placeholder="e-mail"
                                onChange={setUsuario}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Senha</label>
                            <input
                                type="password"
                                style={{ backgroundColor: "white", opacity: "0.7" }}
                                className="form-control"
                                id='password'
                                placeholder="Password"
                                onChange={setPassword}
                            >
                            </input>

                        </div>
                        <button onClick={() => login()}>Login</button>
                    </form>
                </div>
            </div>
        </div>
    )

}


// import React, { useContext } from 'react'
// import { useForm } from "react-hook-form";
// import { Link } from "react-router-dom";
// import { NotificationContainer } from 'react-notifications';
// import GoogleLogin from 'react-google-login';
// import Connect from '../../Connect'
// import { ClientContext } from '../../ClientContext';
// import { useNavigate } from "react-router-dom";
// import 'react-notifications/lib/notifications.css';
// import NotificationsAlert from "../NotificationsAlert.js"


// import "./login.css"

// const Login = () => {

//     const { register, handleSubmit } = useForm();
//     const client = useContext(ClientContext);
//     let navigate = useNavigate();


//     const onSubmit = async (data) => {

//         try {

//             const auth = {
//                 headers: { Authorization: `Bearer ${client.dados.token}` }
//             }
//             await Connect.post("login", data, auth).then((e) => {
//                 console.log(e);

//                 if (e.data.users_id) {
//                     client.setDados({
//                         id: e.data.users_id,
//                         name: e.data.users_name,
//                         token: e.data.token,
//                     })
//                     localStorage.setItem("sipToken", e.data.token);
//                     localStorage.setItem("sipid", e.data.users_id);
//                     localStorage.setItem("sipUser", e.data.users_name);
//                     navigate("/");
//                 }

//             })

//         } catch (erro) {
//             NotificationsAlert("warning", "Atenção!", "Cadastre-se para usar a plataforma ou seus dados estão incorretos");

//         }
//     }

//     return (

//         <div className="login">
//             <div className="container mt-5" >
//                 <div className="card" style={{ width: "50%", height: "50%" }} >
//                     <div className="card-body text-center" >
//                         <img class="card-img-top  " src='logobranco.png' alt='logo' style={{ width: "40%" }} ></img>
//                         <p className="mt-3">
//                             < GoogleLogin
//                                 clientId='928846329466-suvh251ojmpl0lo3pfspb7asipmn46nb.apps.googleusercontent.com'
//                                 onSuccess={credentialResponse => {
//                                     console.log(credentialResponse);
//                                 }}
//                                 onError={() => {
//                                     console.log('Falha no Login');
//                                 }}
//                             />
//                         </p>
//                         <div className="cardlogin">
//                             <p class="card-title text-white mt-2">Entre com seus dados</p>
//                             <form className='formCard' onSubmit={handleSubmit(onSubmit)} style={{ width: "60%" }}>
//                                 <div className="form-label-group" >
//                                     <input
//                                         type="email"
//                                         id="email"
//                                         className="form-control"
//                                         placeholder="E-mail do Cliente"
//                                         required
//                                         autoFocus
//                                         {...register("email")}
//                                     />

//                                 </div>

//                                 <div className="form-label-group mt-2">
//                                     <input
//                                         type="password"
//                                         id="senha"
//                                         className="form-control"
//                                         placeholder="Senha de Acesso"
//                                         required
//                                         {...register("password")}
//                                     />

//                                 </div>
//                                 <button className="btn btn-lg btn-danger btn-block mt-2 mb-2" style={{ width: "100%" }} type="submit">
//                                     Entrar
//                                 </button>
//                             </form>
//                             <NotificationContainer />
//                         </div>

//                         <Link to="/register" className=" btn btn-primary btn-lg mt-2" style={{ width: "100%" }} href="#">
//                             CADASTRE-SE
//                         </Link>

//                     </div>
//                 </div>

//             </div>
//         </div>
//     )
// }



// export default Login