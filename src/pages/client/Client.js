import React from 'react'
import { useForm } from 'react-hook-form';
import api from '../../api'
import { useNavigate } from "react-router-dom";


const Register = () => {

    const { register, handleSubmit } = useForm();
    let navigate = useNavigate();


    const onSubmit = async (data) => {

        try {
            await api.post("clients", data)
            console.log(data)
            alert("Cadastrado com sucesso")
            navigate("/");
        } catch (error) {
            console.log(error.response.data);
            alert(error.response.data)

        }


    };


    return (
        <div class="login">
            <div class="container mt-5" >
                <div class="card ">
                    <img class="card-img-top " src='logo.png' alt='logo' style={{ width: "30%", marginLeft: "40%" }} ></img>
                    <div class="card-body text-center" >
                        <form style={{ textAlign: "left" }} onSubmit={handleSubmit(onSubmit)}>
                            <div class="form-group">
                                <label style={{ color: "white" }}>Nome:</label>
                                <input
                                    type="text"
                                    style={{ backgroundColor: "white", opacity: "0.7" }}
                                    class="form-control"
                                    id='name'
                                    placeholder="Coloque seu nome"
                                    {...register("name")}
                                />
                            </div>
                            <div class="form-group">
                                <label style={{ color: "white" }}>E-mail:</label>
                                <input
                                    type="text"
                                    style={{ backgroundColor: "white", opacity: "0.7" }}
                                    class="form-control"
                                    id='email'
                                    placeholder="Coloque seu E-mail"
                                    {...register("email")}
                                />
                            </div>
                            <div class="form-group">
                                <label style={{ color: "white" }}>CPF:</label>
                                <input
                                    type="text"
                                    style={{ backgroundColor: "white", opacity: "0.7" }}
                                    class="form-control"
                                    id='CPF'
                                    placeholder="Coloque seu cpf"
                                    {...register("CPF")}
                                />
                            </div>
                            <div class="form-group">
                                <label style={{ color: "white" }}>Numero:</label>
                                <input
                                    type="integer"
                                    style={{ backgroundColor: "white", opacity: "0.7" }}
                                    class="form-control"
                                    id='number'
                                    placeholder="Coloque o numero"
                                    {...register("number")}
                                />
                            </div>
                            <div class="form-group">
                                <label style={{ color: "white" }}>endereço:</label>
                                <input
                                    type="text"
                                    style={{ backgroundColor: "white", opacity: "0.7" }}
                                    class="form-control"
                                    id='address'
                                    placeholder="Coloque o endereço"
                                    {...register("address")}
                                />
                            </div>
                            <button type="submit" class="btn btn-primary btn-lg mt-2" style={{ width: "50%" }}>Cadastrar</button>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Register
