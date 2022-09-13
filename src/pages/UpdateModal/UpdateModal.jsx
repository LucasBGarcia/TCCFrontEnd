import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import './UpdateModal.css'
import api from '../../api'
import axios from "axios"
const UpdateModal = (props) => {
    const { register, handleSubmit } = useForm();
    let [listBrands, setListBrands] = useState([]);
    let [listModels, setListModels] = useState([]);

    var date = new Date(props.withdrawal)
    var dataFormatada = date.toLocaleString('pt-BR', { timeZone: 'UTC' })

    const id = props.id
    const onSubmit = async (info) => {
        console.log(info)
        try {
            //axios.put(`http://localhost:3333/${id}/serviceorder`)
            await api.put(`${id}/serviceorder`, info)

            alert("atualizado com sucesso")
            window.location.reload();
        } catch (error) {
            console.log(error.response.data);
            alert(error.response.data)
        }
    };

    useEffect(() => {
        axios.get(`http://localhost:3333/devicebrands`)
            .then((response) => {
                setListBrands(response.data);
                // console.log(response.data);
            })
    }, [])
    const selectModels = (id) => {
        console.log(id);
        axios.get(`http://localhost:3333/${id}/devicebrands`).then((response) => {
            setListModels(response.data);
            // console.log(response.data);
        })
    }


    return (
        <div className="modal show fade" >
            <div className="modal-dialog modal-xl" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Atualzação Ordem de serviso nº {props.id}
                        </h5>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="card">
                                <ul className="list-group list-group-flush">
                                    <div className="row">
                                        <button type="button" className="list-group-item list-group-item-action col-sm-3">
                                            <span>nome:  </span>{props.name}
                                            <input
                                                type="text"
                                                style={{ backgroundColor: "white", opacity: "0.7" }}
                                                className="form-control"
                                                id='name'
                                                placeholder='Nome'
                                                {...register("name")}
                                            />
                                        </button>
                                        <button type="button" className="list-group-item list-group-item-action col-sm-5">
                                            <span>Marca: </span>{`${props.devicemodel}   `}
                                            <select {...register("DeviceBrand_id")} onChange={(e) => selectModels(e.target.value)}>
                                                <option value="" disabled selected>Selecione...</option>

                                                {listBrands.map((listBrand) => (
                                                    <option
                                                        key={listBrand.DeviceBrand_id}
                                                        value={listBrand.id}>
                                                        {listBrand.devicebrand}
                                                    </option>
                                                ))}
                                            </select>
                                        </button>
                                        <button type="button" className="list-group-item list-group-item-action col-sm-4">
                                            <span>Modelo: </span>{`${props.devicebrand}  `}
                                            <select {...register("DeviceModel_id")}>
                                                <option value="" disabled selected>Marca Primeiro...</option>
                                                onChange = {(e) => setListModels(e.target.value)}
                                                {listModels.map((listModel, index) => (
                                                    <option key={listModel.DeviceModel_id}
                                                        value={listModel.id}>
                                                        {listModel.devicemodel}</option>
                                                ))}
                                            </select>
                                        </button>
                                    </div>
                                    <div className="row">
                                        <button type="button" className="list-group-item list-group-item-action col-sm-3">
                                            <span>Número: </span>{props.number}
                                            <input
                                                type="integer"
                                                style={{ backgroundColor: "white", opacity: "0.7" }}
                                                className="form-control"
                                                id='number'
                                                placeholder="Número"
                                                {...register("number")}
                                            />
                                        </button>
                                        <button type="button" className="list-group-item list-group-item-action col-sm-3">
                                            <span>CPF: </span>{props.CPF}
                                            <input
                                                type="text"
                                                style={{ backgroundColor: "white", opacity: "0.7" }}
                                                className="form-control"
                                                id='CPF'
                                                placeholder="CPF"
                                                {...register("CPF")}
                                            />
                                        </button>
                                        <button type="button" className="list-group-item list-group-item-action col-sm-3">
                                            <span>E-mail: </span>{props.email}
                                            <input
                                                type="text"
                                                style={{ backgroundColor: "", opacity: "0.7" }}
                                                className="form-control"
                                                id='email'
                                                placeholder="E-mail"
                                                {...register("email")}
                                            />
                                        </button>
                                        <button type="button" className="list-group-item list-group-item-action col-sm-3">
                                            <span>Endereço: </span>{props.address}
                                            <input
                                                type="text"
                                                style={{ backgroundColor: "white", opacity: "0.7" }}
                                                className="form-control"
                                                id='address'
                                                placeholder="Endereço"
                                                {...register("address")}
                                            />
                                        </button>
                                    </div>
                                    <div className="row">
                                        <button type="button" className="list-group-item list-group-item-action col-sm-2">
                                            <span>Valor: </span>{props.value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                                            <input
                                                type="integer"
                                                style={{ backgroundColor: "white", opacity: "0.7" }}
                                                className="form-control"
                                                id='value'
                                                placeholder="Coloque o Valor"
                                                {...register("value")}
                                            />
                                        </button>
                                        <button type="button" className="list-group-item list-group-item-action col-sm-2">
                                            <span>Valor saida: </span>{props.negativeValue.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                                            <input
                                                type="integer"
                                                style={{ backgroundColor: "white", opacity: "0.7" }}
                                                className="form-control"
                                                id='negativeValue'
                                                placeholder='Valor para baixa'
                                                {...register("negativeValue")}
                                            />
                                        </button>
                                        <button type="button" className="list-group-item list-group-item-action col-sm-4">
                                            <span>Observação: </span>{props.observation}
                                            <input
                                                type="text"
                                                style={{ backgroundColor: "white", opacity: "0.7" }}
                                                className="form-control"
                                                id='observation'
                                                placeholder="Observação"
                                                {...register("observation")}
                                            />
                                        </button>
                                        <button type="button" className="list-group-item list-group-item-action col-sm-4">
                                            <span>Horário saida: </span>{dataFormatada}
                                            <input
                                                type="datetime-local"
                                                style={{ backgroundColor: "white", opacity: "0.7" }}
                                                className="form-control"
                                                id='withdrawal'
                                                placeholder="Coloque o Horario de saida"
                                                {...register("withdrawal")}
                                            />
                                        </button>
                                    </div>
                                </ul>
                            </div>
                            <button type="submit" className="btn btn-success btn-lm col-sm-2 mt-4" style={{}}>Cadastrar</button>
                            <button type="button" className="btn btn-danger btn-lm col-sm-2 mt-4 ml-5" onClick={props.hide}>Fechar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    )
}
export default UpdateModal
