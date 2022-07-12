/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable jsx-a11y/alt-text */
import './login.css'
import { useState } from 'react';
import axios from 'axios';

export default props => {

    const [usuario, setUsuario] = useState('')
    const [password, setPassword] = useState('')

    async function login() {
        axios
            .post('http://localhost:3333/login', {
                email: usuario.target.value,
                password: password.target.value
            }).then((response) => {
                if (response.status === 200) {
                    localStorage.setItem("sipToken", response.data.token);
                    localStorage.setItem("sipUser", response.data.name);
                    alert(response.data.name + ", Bem-vindo!")
                    window.location.href = "/home";
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
                            <label htmlFor="nickName">Usuário</label>
                            <input
                                type="text"
                                style={{ backgroundColor: "white", opacity: "0.7" }}
                                className="form-control"
                                id='email'
                                placeholder="Nome"
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

    // return (
    //     <div style={{
    //         backgroundImage: `url("/background_login.png")`,
    //         display: "table",
    //         width: "100%",
    //         height: "100vh",
    //         backgroundSize: "cover",
    //     }}>

    //         <div className="Card">
    //             <h2>Sistema de Ordem de Serviço</h2>
    //             <input
    //                 type="text"
    //                 style={{ backgroundColor: "white", opacity: "0.7" }}
    //                 className="form-control"
    //                 id='email'
    //                 placeholder="Nome"
    //                 onChange={setUsuario}
    //             >
    //             </input>
    //             <input
    //                 type="password"
    //                 style={{ backgroundColor: "white", opacity: "0.7" }}
    //                 className="form-control"
    //                 id='password'
    //                 placeholder="Password"
    //                 onChange={setPassword}
    //             >
    //             </input>

    //             <button onClick={() => login()}>Login</button>

    //         </div>

    //     </div>
    // )
}
