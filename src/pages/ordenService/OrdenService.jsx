import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import api from '../../api'
import { useNavigate } from "react-router-dom";
import { Table } from 'semantic-ui-react'
import { IoEyeOutline } from "react-icons/io5";
import { BsTrash } from "react-icons/bs";
import axios from "axios"
import "./OrdenService.css"


const Register = () => {

    const { register, handleSubmit } = useForm();
    let [list, setList] = useState([]);
    let [listBrands, setListBrands] = useState([]);
    let navigate = useNavigate();

    // const getList = async () => {
    //     try {
    //         Clientlist = await api.get("serviceorder")
    //         setList(Clientlist.data)
    //         console.log(Clientlist.data)
    //     } catch (error) {
    //         console.log(error.response.data);
    //         alert(error.response.data)
    //     }
    // };
    const getListBrands = async () => {
        try {
            const BrandList = await api.get("devicebrands")
            setListBrands(BrandList.data)
            console.log(BrandList.data)
        } catch (error) {
            console.log(error.response.data);
            alert(error.response.data)
        }
    };

    const onSubmit = async (data) => {
        try {
            await api.post("serviceorder", data)
            console.log(data)
            alert("Cadastrado com sucesso")
            navigate('/')
        } catch (error) {
            console.log(error.response.data);
            alert(error.response.data)

        }
    };
    // const onCancel = () => {
    //     "input".val = ("");
    // }

    useEffect(() => {
        axios.get(`http://localhost:3333/serviceorder`)
            .then((response) => {
                setList(response.data);
                console.log(response.data);
            })
    }, [])

    // useEffect(() => {
    //     getList();
    //     getListBrands();
    // }, []);

    return (
        <div className="list">
            <div className="card">
                <div className="card-body" >
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="form-group col-sm-2">
                                <label>*Nome:</label>
                                <input
                                    type="text"
                                    style={{ backgroundColor: "white", opacity: "0.7" }}
                                    className="form-control"
                                    id='name'
                                    placeholder="Nome"
                                    {...register("name")}
                                />
                                <div className="invalid-feedback">
                                    Por favor, informe uma cidade válida.
                                </div>
                            </div>
                            <div className="form-group col-sm-2">
                                <label>Numero:</label>
                                <input
                                    type="integer"
                                    style={{ backgroundColor: "white", opacity: "0.7" }}
                                    className="form-control"
                                    id='number'
                                    placeholder="Número"
                                    {...register("number")}
                                />
                            </div>
                            <div className="form-group col-sm-1">
                                <label>*Marca:</label>
                                <input
                                    type="integer"
                                    style={{ backgroundColor: "white", opacity: "0.7" }}
                                    className="form-control"
                                    id='DeviceBrand_id'
                                    placeholder="Marca"
                                    {...register("DeviceBrand_id")}
                                />
                            </div>
                            {/* <div className="form-group col-sm-1">
                                <label >Marca:</label>
                                <select>
                                    onChange = {(e) => setListBrands(e.target.value)}
                                </select>
                                {listBrands.map((listBrands, index) => (
                                    <option key={listBrands.devicebrand} value={listBrands.devicebrand}>{listBrands.devicebrand}</option>
                                ))}

                            </div> */}
                            {/* <div class="form-group col-sm-1">
                            <label for="DeviceBrand_id">Marca:</label>
                                <select id="DeviceBrand_id" class="form-control" required>
                                </select>
                            </div> */}
                            <div className="form-group col-sm-1">
                                <label>*Modelo:</label>
                                <input
                                    type="integer"
                                    style={{ backgroundColor: "white", opacity: "0.7" }}
                                    className="form-control"
                                    id='DeviceModel_id'
                                    placeholder="Modelo"
                                    {...register("DeviceModel_id")}
                                />

                            </div>
                            <div className="form-group col-sm-2">
                                <label>*Serviço:</label>
                                <input
                                    type="integer"
                                    style={{ backgroundColor: "white", opacity: "0.7" }}
                                    className="form-control"
                                    id='service_id'
                                    placeholder="Serviço"
                                    {...register("service_id")}
                                />
                            </div>
                            <div className="form-group col-md-2">
                                <label>*Valor:</label>
                                <input
                                    type="integer"
                                    style={{ backgroundColor: "white", opacity: "0.7" }}
                                    className="form-control"
                                    id='value'
                                    placeholder="Coloque o Valor"
                                    {...register("value")}
                                />
                            </div>
                            <div className="form-group col-sm-2">
                                <label>Horario de saida:</label>
                                <input
                                    type="datetime-local"
                                    style={{ backgroundColor: "white", opacity: "0.7" }}
                                    className="form-control"
                                    id='withdrawal'
                                    placeholder="Coloque o Horario de saida"
                                    {...register("withdrawal")}
                                />
                            </div>
                        </div>
                        <div className="container">
                            <div className="row">
                                <div className="form-group col-sm-2">
                                    <label>E-mail:</label>
                                    <input
                                        type="text"
                                        style={{ backgroundColor: "", opacity: "0.7" }}
                                        className="form-control"
                                        id='email'
                                        placeholder="E-mail"
                                        {...register("email")}
                                    />
                                </div>
                                <div className="form-group col-sm-2">
                                    <label>CPF:</label>
                                    <input
                                        type="text"
                                        style={{ backgroundColor: "white", opacity: "0.7" }}
                                        className="form-control"
                                        id='CPF'
                                        placeholder="CPF"
                                        {...register("CPF")}
                                    />
                                </div>

                                <div className="form-group col-sm-2">
                                    <label>Endereço:</label>
                                    <input
                                        type="text"
                                        style={{ backgroundColor: "white", opacity: "0.7" }}
                                        className="form-control"
                                        id='address'
                                        placeholder="Endereço"
                                        {...register("address")}
                                    />
                                </div>
                                <div className="form-group col-sm-2">
                                    <label>Observação:</label>
                                    <input
                                        type="text"
                                        style={{ backgroundColor: "white", opacity: "0.7" }}
                                        className="form-control"
                                        id='observation'
                                        placeholder="Observação"
                                        {...register("observation")}
                                    />
                                </div>
                                <button type="submit" className="btn btn-success btn-lm col-sm-2 mt-4" style={{}}>Cadastrar</button>
                                <button type="cancel" className="btn btn-danger btn-lm col-sm-1 mt-4" style={{}}>Cancelar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div >

            <h3 className="text-center col-sm-6 mt-2">
                Caixa Aberto
            </h3>
            {/* <div className="row">
                <div id="bordas" className="table">
                    <div id="table" className="col-sm-6">
                        <Table
                            keys={[
                                'id',
                                'observation',
                                'value',
                                'withdrawal'
                            ]}
                            data={this.state.orders}
                        ></Table>
                    </div>
                </div >
            </div> */}
            <div className="row">
                <div>
                    <Table singleLine>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Nº OS</Table.HeaderCell>
                                <Table.HeaderCell>Modelo</Table.HeaderCell>
                                <Table.HeaderCell>Serviço</Table.HeaderCell>
                                <Table.HeaderCell>Valor</Table.HeaderCell>
                                <Table.HeaderCell>Saida Caixa</Table.HeaderCell>
                                <Table.HeaderCell>Ações</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {list.map((data) => {
                                return (
                                    <Table.Row>
                                        <Table.Cell>{data.id}</Table.Cell>
                                        <Table.Cell>{data.DeviceModel.devicemodel}</Table.Cell>
                                        <Table.Cell>{data.service.service}</Table.Cell>
                                        <Table.Cell>R${data.value}</Table.Cell>
                                        <Table.Cell>R${data.value}</Table.Cell>
                                        <Table.Cell><button><IoEyeOutline /></button> <button><BsTrash /></button></Table.Cell>
                                    </Table.Row>
                                )
                            })}
                        </Table.Body>
                    </Table>
                </div>
                {/* <div id="bordas" className="table">
                    <table id="table" className="col-sm-6">
                        <thead>
                            <tr id='thead'>
                                <th>OS</th>
                                <th>Modelo</th>
                                <th>Serviço</th>
                                <th>Valor</th>
                                <th>Saída Caixa</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>

                            {Clientlist && Clientlist.map((line) => {
                                return <tr>
                                    {
                                        Clientlist.map((h) => {
                                            return (<td>{line[h]}</td>)
                                        })
                                    }</tr>
                            })}
                            <tr>
                                <td colSpan={2} id="entrada">Entrada: $$</td>
                                <td colSpan={2} id="saida">Saída: $$</td>
                                <td colSpan={2} id="total">Total: $$</td>
                            </tr>
                        </tbody>
                    </table>
                </div > */}
            </div>
            {/* <div className="row">
                <div id="bordas" className="table">
                    <table id="table" className="col-sm-6">
                        <thead>
                            <tr id='thead'>
                                <th>OS</th>
                                <th>Modelo</th>
                                <th>Serviço</th>
                                <th>Valor</th>
                                <th>Saída Caixa</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td colSpan={2} id="entrada">Entrada: $$</td>
                                <td colSpan={2} id="saida">Saída: $$</td>
                                <td colSpan={2} id="total">Total: $$</td>
                            </tr>
                        </tbody>
                    </table>
                </div >
            </div> */}
        </div >
    )
}

export default Register
