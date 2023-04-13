import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import api from '../../api'
import { Table } from 'semantic-ui-react'
import { IoEyeOutline } from "react-icons/io5";
import { BsCheckLg, BsTrash, BsBrush, BsSearch } from "react-icons/bs";
import axios from "axios"
import "./OrdenService.css"
import ViewModal from '../ViewModal/ViewModal';
import UpdateModal from '../UpdateModal/UpdateModal';
import FinishModal from '../FinishModal/FinishModal'
import CalculaTotalAberto from '../Utils/Opened/CalculaTotalAberto';
import CalculaEntradaAberto from '../Utils/Opened/CalculaEntradaAberto';
import CalculaSaidaAberto from '../Utils/Opened/CalculaSaidaAberto';
import CalculaTotalFechado from '../Utils/Closed/CalculaTotalFechado';
import CalculaEntradaFechado from '../Utils/Closed/CalculaEntradaFechado';
import CalculaSaidaFechado from '../Utils/Closed/CalculaSaidaFechado';


const Home = () => {

    // let navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    let [list, setList] = useState([]);
    let [listClosedOrders, setListClosedOrders] = useState([]);
    let [listBrands, setListBrands] = useState([]);
    let [listModels, setListModels] = useState([]);
    let [listServices, setListServices] = useState([]);

    const [modal, setModal] = useState(false);
    const [ModalUpdate, setModalUpdate] = useState(false);
    const [ModalFinish, setModalFinish] = useState(false);
    const [tempdata, setTempdata] = useState([]);
    const [tempdataUpdate, setTempdataUpdate] = useState([]);
    const [tempdataFinish, setTempdataFinish] = useState([]);

    const [FiltroID, setFiltroID] = useState(false)
    const [DadosFiltroID, setDadosFiltroID] = useState('')

    const getData = (id, observation, withdrawal, value, negativeValue, name, number, CPF,
        email, address, devicebrand, devicemodel, createdAt) => {
        let tempData = [id, observation, withdrawal, value, negativeValue, name, number, CPF,
            email, address, devicebrand, devicemodel, createdAt];
        setTempdata(data => [1, ...tempData])
        return setModal(true)
    }
    const getDataUpdate = (id, observation, withdrawal, value, negativeValue, name, number, CPF,
        email, address, devicebrand, devicemodel) => {
        let tempDataUpdate = [id, observation, withdrawal, value, negativeValue, name, number, CPF,
            email, address, devicebrand, devicemodel];
        setTempdataUpdate(data => [1, ...tempDataUpdate])
        return setModalUpdate(true)
    }

    const onSubmit = async (data) => {
        try {
            await api.post("serviceorder", data)
            console.log(data)
            alert("Cadastrado com sucesso")
            window.location.reload();
        } catch (error) {
            console.log(error.response.data);
            alert(error.response.data)
        }
    };

    useEffect(() => {
        axios.get(`http://localhost:3333/serviceorder`)
            .then((response) => {
                setList(response.data);

            })
    }, [])
    useEffect(() => {
        axios.get(`http://localhost:3333/serviceorderended`)
            .then((response) => {
                setListClosedOrders(response.data);
            })
    }, [])

    useEffect(() => {
        axios.get(`http://localhost:3333/devicebrands`)
            .then((response) => {
                setListBrands(response.data);
            })
    }, [])

    useEffect(() => {
        axios.get(`http://localhost:3333/services`)
            .then((response) => {
                setListServices(response.data);
            })
    }, [])

    const onDelete = (id, name) => {
        var result = window.confirm(`Deseja deletar OS ${name}?`)
        if (result === true) {
            axios.delete(`http://localhost:3333/${id}/serviceorder`)
            window.location.reload();
        }
    }

    const getDataFinish = (id, observation, withdrawal, value, negativeValue, name, number, CPF,
        email, address, devicebrand, devicemodel) => {
        let tempDataFinish = [id, observation, withdrawal, value, negativeValue, name, number, CPF,
            email, address, devicebrand, devicemodel];
        setTempdataFinish(data => [1, ...tempDataFinish])
        return setModalFinish(true)
    }


    const selectModels = (id) => {
        console.log(id);
        axios.get(`http://localhost:3333/${id}/devicebrands`).then((response) => {
            setListModels(response.data);
        })
    }

    useEffect(() => {
        if (FiltroID == false) {
            setDadosFiltroID('')
        }
    }, [FiltroID])


    const filtroID = () => {
        if (FiltroID) {
            return (
                <input
                    type="text"
                    style={{ backgroundColor: "white", opacity: "0.7", width: '50px', height: '20px' }}
                    className="form-control"
                    placeholder="Nº ID"
                    onChange={(e) => setDadosFiltroID(e.target.value)}
                />
            )
        } else {

            return (
                <>
                    Nº OS
                </>
            )
        }
    }

    const handlePhone = (event) => {
        let input = event.target;
        input.value = phoneMask(input.value);

    };

    const phoneMask = (value) => {
        if (!value) return "";
        value = value.replace(/\D/g, "");
        value = value.replace(/(\d{2})(\d)/, "($1) $2");
        value = value.replace(/(\d)(\d{4})$/, "$1-$2");
        return value;
    };

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
                            </div>
                            <div className="form-group col-sm-2">

                                <label>Numero:</label>
                                <input
                                    maxLength={15}
                                    type="integer"
                                    style={{ backgroundColor: "white", opacity: "0.7" }}
                                    className="form-control"
                                    id='number'
                                    placeholder="Número"
                                    pattern="\(\d{2}\) \d{4,5}-\d{4}"
                                    {...register("number")}
                                />
                            </div>
                            <div className="form-group col-sm-1" >
                                <label >Marca:</label>
                                <select onChange={(e) => selectModels(e.target.value)}>
                                    <option value="" disabled selected>Selecione...</option>
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
                                    <option value="" disabled selected>Marca Primeiro...</option>
                                    onChange = {(e) => setListModels(e.target.value)}
                                    {listModels.map((listModel, index) => (
                                        <option key={listModel.DeviceModel_id}
                                            value={listModel.id}>
                                            {listModel.devicemodel}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group servico col-sm-2" id='serv'>
                                <label id='servico'>Serviço:</label>
                                <select id='servico' {...register("service_id")}>
                                    <option value="" disabled selected>Selecione...</option>
                                    onChange = {(e) => setListServices(e.target.value)}
                                    {listServices.map((listService, index) => (
                                        <option key={listService.service_id}
                                            value={listService.id}>
                                            {listService.service}</option>
                                    ))}
                                </select>
                            </div>
                            <div id='valor' className="form-group col-md-1">
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

                                <div className="form-group col-sm-2">
                                    <button type="submit" className="btn btn-success btn-lm mt-4" style={{}}>Cadastrar</button>
                                </div>
                                <div className="form-group col-sm-2">
                                    <button type="cancel" className="btn btn-danger btn-lm mt-4" style={{}}>Cancelar</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div >

            <div id='tabelas' className="row" >
                <div className=''>
                    <h3 className="text-center mt-2">
                        <Link to="/finances" className='finances' href="#">
                            Caixa Aberto
                        </Link>
                    </h3>
                    <Table singleLine className="table-round-corner" >
                        <Table.Header id="table">
                            <Table.Row>
                                <Table.HeaderCell id='th' className="th">
                                    <button onClick={() => setFiltroID(!FiltroID)}
                                    >
                                        <BsSearch />
                                    </button>{filtroID()}</Table.HeaderCell>
                                <Table.HeaderCell id='th' className="th">Marca</Table.HeaderCell>
                                <Table.HeaderCell id='th' className="th">Modelo</Table.HeaderCell>
                                <Table.HeaderCell id='th' className="th">Serviço</Table.HeaderCell>
                                <Table.HeaderCell id='th' className="th">Valor</Table.HeaderCell>
                                <Table.HeaderCell id='th' className="th">Saida Caixa</Table.HeaderCell>
                                <Table.HeaderCell id='th' className="th">Ações</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {list.map((data) => {
                                return (
                                    <Table.Row id="trTable">
                                        <Table.Cell id='th' className="td">{data.id}</Table.Cell>
                                        <Table.Cell id='th' className="td">{data.DeviceModel.DeviceBrand.devicebrand}</Table.Cell>
                                        <Table.Cell id='th' className="td">{data.DeviceModel.devicemodel}</Table.Cell>
                                        <Table.Cell id='th' className="td">{data.service.service}</Table.Cell>
                                        <Table.Cell id='th' className="td">{data.value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</Table.Cell>
                                        <Table.Cell id='th' className="td">{data.negativeValue.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</Table.Cell>
                                        <Table.Cell id='th' className="td">
                                            <button onClick={() => getDataFinish(data.id, data.observation,
                                                data.withdrawal, data.value, data.negativeValue,
                                                data.client.name, data.client.number, data.client.CPF, data.client.email,
                                                data.client.address, data.DeviceModel.DeviceBrand.devicebrand, data.DeviceModel.devicemodel)}
                                                className="btnFinish">
                                                <BsCheckLg />
                                            </button>
                                            <button onClick={() => getDataUpdate(data.id, data.observation,
                                                data.withdrawal, data.value, data.negativeValue,
                                                data.client.name, data.client.number, data.client.CPF, data.client.email,
                                                data.client.address, data.DeviceModel.DeviceBrand.devicebrand, data.DeviceModel.devicemodel)}>
                                                <BsBrush />
                                            </button>
                                            <button onClick={() => getData(data.id, data.observation,
                                                data.withdrawal, data.value, data.negativeValue,
                                                data.client.name, data.client.number, data.client.CPF, data.client.email,
                                                data.client.address, data.DeviceModel.DeviceBrand.devicebrand, data.DeviceModel.devicemodel, data.createdAt)}>
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
                                <Table.HeaderCell id='entrada' colSpan='2'><CalculaEntradaAberto /></Table.HeaderCell>
                                <Table.HeaderCell id='saida' colSpan='2'><CalculaSaidaAberto /></Table.HeaderCell>
                                <Table.HeaderCell id='total' colSpan="3"><CalculaTotalAberto /></Table.HeaderCell>
                            </Table.Row>
                        </Table.Footer>
                    </Table>
                </div>
                <div className='col-sm-5'>
                    <h3 className="text-center mt-2">
                        <Link to="/finances" className='finances' href="#">
                            Caixa Fechado
                        </Link>
                    </h3>
                    <Table singleLine className="table-round-corner" >
                        <Table.Header id="table">
                            <Table.Row>
                                <Table.HeaderCell id='th' className="th">Nº OS</Table.HeaderCell>
                                <Table.HeaderCell id='th' className="th">Cliente</Table.HeaderCell>
                                <Table.HeaderCell id='th' className="th">Modelo</Table.HeaderCell>
                                <Table.HeaderCell id='th' className="th">Valor</Table.HeaderCell>
                                <Table.HeaderCell id='th' className="th">Saida Caixa</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {listClosedOrders.map((data) => {
                                return (
                                    <Table.Row id="trTable">
                                        <Table.Cell id='th' className="td">{data.id}</Table.Cell>
                                        <Table.Cell id='th' className="td">{data.ordemServico.client.name}</Table.Cell>
                                        <Table.Cell id='th' className="td">{data.ordemServico.value}</Table.Cell>
                                        <Table.Cell id='th' className="td">{data.ordemServico.value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</Table.Cell>
                                        <Table.Cell id='th' className="td">{data.ordemServico.negativeValue.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</Table.Cell>
                                    </Table.Row>
                                )
                            })}

                        </Table.Body>
                        <Table.Footer>
                            <Table.Row id="tfTable">
                                <Table.HeaderCell id='entrada' colSpan='2'><CalculaEntradaFechado /></Table.HeaderCell>
                                <Table.HeaderCell id='saida' colSpan='2'><CalculaSaidaFechado /></Table.HeaderCell>
                                <Table.HeaderCell id='total' colSpan="3"><CalculaTotalFechado /></Table.HeaderCell>
                            </Table.Row>
                        </Table.Footer>
                    </Table>
                </div>
            </div>
            {
                modal === true ? <ViewModal id={tempdata[1]} observation={tempdata[2]} withdrawal={tempdata[3]}
                    value={tempdata[4]} negativeValue={tempdata[5]} name={tempdata[6]} number={tempdata[7]}
                    CPF={tempdata[8]} email={tempdata[9]} address={tempdata[10]}
                    devicemodel={tempdata[11]} devicebrand={tempdata[12]} createdAt={tempdata[13]}
                    hide={() => setModal(false)} /> : ''
            }
            {
                ModalUpdate === true ? <UpdateModal id={tempdataUpdate[1]} observation={tempdataUpdate[2]} withdrawal={tempdataUpdate[3]}
                    value={tempdataUpdate[4]} negativeValue={tempdataUpdate[5]} name={tempdataUpdate[6]} number={tempdataUpdate[7]}
                    CPF={tempdataUpdate[8]} email={tempdataUpdate[9]} address={tempdataUpdate[10]}
                    devicemodel={tempdataUpdate[11]} devicebrand={tempdataUpdate[12]}
                    hide={() => setModalUpdate(false)} /> : ''
            }
            {
                ModalFinish === true ? <FinishModal id={tempdataFinish[1]} observation={tempdataFinish[2]} withdrawal={tempdataFinish[3]}
                    value={tempdataFinish[4]} negativeValue={tempdataFinish[5]} name={tempdataFinish[6]} number={tempdataFinish[7]}
                    CPF={tempdataFinish[8]} email={tempdataFinish[9]} address={tempdataFinish[10]}
                    devicemodel={tempdataFinish[11]} devicebrand={tempdataFinish[12]} hide={() => setModalFinish(false)} /> : ''
            }
        </div >

    )
}
export default Home
