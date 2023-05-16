import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import api from '../../api'
import { Table } from 'semantic-ui-react'
import { IoEyeOutline } from "react-icons/io5";
import { BsCheckLg, BsTrash, BsBrush } from "react-icons/bs";
import axios from "axios"
import ViewModal from '../ViewModal/ViewModal';
import UpdateModal from '../UpdateModal/UpdateModal';
import FinishModal from '../FinishModal/FinishModal'
import CalculaTotalAberto from '../Utils/Opened/CalculaTotalAberto';
import CalculaEntradaAberto from '../Utils/Opened/CalculaEntradaAberto';
import CalculaSaidaAberto from '../Utils/Opened/CalculaSaidaAberto';
import CalculaTotalFechado from '../Utils/Closed/CalculaTotalFechado';
import CalculaEntradaFechado from '../Utils/Closed/CalculaEntradaFechado';
import CalculaSaidaFechado from '../Utils/Closed/CalculaSaidaFechado';


const Finances = () => {

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

    const getData = (id, observation, withdrawal, value, negativeValue, name, number, CPF,
        email, address, devicebrand, devicemodel) => {
        let tempData = [id, observation, withdrawal, value, negativeValue, name, number, CPF,
            email, address, devicebrand, devicemodel];
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
    // const onFinish = (id, name) => {
    //     console.log(id)
    //         axios.delete(`http://localhost:3333/${id}/serviceorder`)

    // }


    const selectModels = (id) => {
        console.log(id);
        axios.get(`http://localhost:3333/${id}/devicebrands`).then((response) => {
            setListModels(response.data);
        })
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
            <div id='tabelas' className="row" >
                <div className=''>
                    <h3 className="text-center mt-2">
                        Caixa Aberto
                    </h3>
                    <Table singleLine className="table-round-corner" >
                        <Table.Header id="table">
                            <Table.Row>
                                <Table.HeaderCell id='th' className="th">Nº OS</Table.HeaderCell>
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
                                                data.client.address, data.DeviceModel.DeviceBrand.devicebrand, data.DeviceModel.devicemodel)}>
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
                        Caixa Fechado
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
                    devicemodel={tempdata[11]} devicebrand={tempdata[12]}
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
export default Finances
