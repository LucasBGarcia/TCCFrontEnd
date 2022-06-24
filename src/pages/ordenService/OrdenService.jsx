import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import api from '../../api'
// import { useNavigate } from "react-router-dom";
import { Table } from 'semantic-ui-react'
import { IoEyeOutline } from "react-icons/io5";
import { BsTrash } from "react-icons/bs";
import axios from "axios"
import "./OrdenService.css"
import ViewModal from '../ViewModal/ViewModal';
import Calcula from '../Utils/Calcula';


const Home = () => {

    // let navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    let [list, setList] = useState([]);
    let [listBrands, setListBrands] = useState([]);
    let [listModels, setListModels] = useState([]);
    let [listServices, setListServices] = useState([]);

    const [modal, setModal] = useState(false);
    const [tempdata, setTempdata] = useState([]);

    const getData = (id, observation, withdrawal, value, negativeValue, name, number, CPF,
        email, address, devicebrand, devicemodel) => {
        let tempData = [id, observation, withdrawal, value, negativeValue, name, number, CPF,
            email, address, devicebrand, devicemodel];
        setTempdata(data => [1, ...tempData])
        return setModal(true)
    }

    const onSubmit = async (data) => {
        try {
            await api.post("serviceorder", data)
            // console.log(data)
            alert("Cadastrado com sucesso")
            window.location.reload();
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
                // console.log(response.data);
            })
    }, [])

    useEffect(() => {
        axios.get(`http://localhost:3333/devicebrands`)
            .then((response) => {
                setListBrands(response.data);
                // console.log(response.data);
            })
    }, [])

    useEffect(() => {
        axios.get(`http://localhost:3333/devicemodels`)
            .then((response) => {
                setListModels(response.data);
                // console.log(response.data);
            })
    }, [])

    useEffect(() => {
        axios.get(`http://localhost:3333/services`)
            .then((response) => {
                setListServices(response.data);
                // console.log(response.data);
            })
    }, [])

    const onDelete = (id, name) => {
        var result = window.confirm(`Deseja deletar OS ${name}?`)
        if (result === true) {
            axios.delete(`http://localhost:3333/${id}/serviceorder`)
            window.location.reload();
        }
    }

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
                                <label >Marca:</label>
                                <select {...register("DeviceBrand_id")}>
                                    onChange = {(e) => setListBrands(e.target.value)}
                                    {listBrands.map((listBrand) => (
                                        <option
                                            key={listBrand.DeviceBrand_id}
                                            value={listBrand.id}>
                                            {listBrand.devicebrand}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group col-sm-1">
                                <label>Modelo:</label>
                                <select {...register("DeviceModel_id")}>
                                    onChange = {(e) => setListModels(e.target.value)}
                                    {listModels.map((listModel, index) => (
                                        <option key={listModel.DeviceModel_id}
                                            value={listModel.id}>
                                            {listModel.devicemodel}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group col-sm-2">
                                <label>Serviço:</label>
                                <select {...register("service_id")}>
                                    onChange = {(e) => setListServices(e.target.value)}
                                    {listServices.map((listService, index) => (
                                        <option key={listService.service_id}
                                            value={listService.id}>
                                            {listService.service}</option>
                                    ))}
                                </select>
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
            <div className="row">
                <div>
                    <Table singleLine>
                        <Table.Header id="table">
                            <Table.Row>
                                <Table.HeaderCell id="th">Nº OS</Table.HeaderCell>
                                <Table.HeaderCell id="th">Marca</Table.HeaderCell>
                                <Table.HeaderCell id="th">Modelo</Table.HeaderCell>
                                <Table.HeaderCell id="th">Serviço</Table.HeaderCell>
                                <Table.HeaderCell id="th">Valor</Table.HeaderCell>
                                <Table.HeaderCell id="th">Saida Caixa</Table.HeaderCell>
                                <Table.HeaderCell id="th">Ações</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {list.map((data) => {
                                return (
                                    <Table.Row id="trTable">
                                        <Table.Cell>{data.id}</Table.Cell>
                                        <Table.Cell>{data.DeviceBrand.devicebrand}</Table.Cell>
                                        <Table.Cell>{data.DeviceModel.devicemodel}</Table.Cell>
                                        <Table.Cell>{data.service.service}</Table.Cell>
                                        <Table.Cell>R${data.value}</Table.Cell>
                                        <Table.Cell>R${data.negativeValue}</Table.Cell>
                                        <Table.Cell>
                                            <button onClick={() => getData(data.id, data.observation,
                                                data.withdrawal, data.value, data.negativeValue,
                                                data.client.name, data.client.number, data.client.CPF, data.client.email,
                                                data.client.address, data.DeviceBrand.devicebrand, data.DeviceModel.devicemodel)}>
                                                <IoEyeOutline />
                                            </button>
                                            <button onClick={() => onDelete(data.id, data.client.name)}
                                                className="btnTrash">
                                                <BsTrash />
                                            </button>
                                        </Table.Cell>
                                    </Table.Row>
                                )
                            })}

                        </Table.Body>
                        <Table.Footer>
                            <Table.Row id="tfTable">
                                <Table.HeaderCell id='entrada' colSpan='2'>Entrada: $$</Table.HeaderCell>
                                <Table.HeaderCell id='saida' colSpan='2'>Saída: $$</Table.HeaderCell>
                                <Table.HeaderCell id='total' colSpan="3"><Calcula id={tempdata[1]} /></Table.HeaderCell>
                            </Table.Row>
                        </Table.Footer>
                    </Table>
                </div>
            </div>
            {
                modal === true ? <ViewModal id={tempdata[1]} observation={tempdata[2]} withdrawal={tempdata[3]}
                    value={tempdata[4]} negativeValue={tempdata[5]} name={tempdata[6]} number={tempdata[7]}
                    CPF={tempdata[8]} email={tempdata[9]} address={tempdata[10]}
                    devicemodel={tempdata[11]} devicebrand={tempdata[12]}
                    hide={() => setModal(false)} /> : ''
            }
        </div >
    )
}

export default Home
