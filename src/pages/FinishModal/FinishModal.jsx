import React, { useState, useEffect, useDebugValue } from 'react'
import { useForm } from 'react-hook-form';
import './FinishModal.css'
import api from '../../api'
import axios from "axios"

const FinishModal = (props) => {

    const { register, handleSubmit } = useForm();
    let [listBrands, setListBrands] = useState([]);
    let [PaymentMethod, setPaymentMethod] = useState('');
    let [listPaymentsMethods, setListPaymentsMethods] = useState([]);
    let [listMachines, setListMachines] = useState([]);
    const [RenderizaMaquinas, setRenderizaMaquinas] = useState(false);

    var date = new Date(props.withdrawal)
    var dataFormatada = date.toLocaleString('pt-BR', { timeZone: 'UTC' })

    const id = props.id

    const onSubmit = async (data) => {
        try {
            await api.post(`/${id}/finishServiceOrder`, data)
            console.log(data)
            alert("finalizada com sucesso")
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

    useEffect(() => {
        axios.get(`http://localhost:3333/paymentmethods`)
            .then((response) => {
                setListPaymentsMethods(response.data);
                // console.log(response.data);
            })
    }, [])
    useEffect(() => {
        axios.get(`http://localhost:3333/machines`)
            .then((response) => {
                setListMachines(response.data);
                // console.log(response.data);
            })
    }, [])


    useEffect(() => {
        const paymentMethodsToRender = ['2', '3', '5'];
        setRenderizaMaquinas(paymentMethodsToRender.includes(PaymentMethod));
    }, [PaymentMethod]);

    const divisao2 = (value) => {
        let divisao = (value / 2).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
        return divisao
    }
    const divisao3 = (value) => {
        let divisao = (value / 3).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
        return divisao
    }
    const divisao4 = (value) => {
        let divisao = (value / 4).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
        return divisao
    }
    const divisao5 = (value) => {
        let divisao = (value / 5).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
        return divisao
    }
    const divisao6 = (value) => {
        let divisao = (value / 6).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
        return divisao
    }
    return (
        <div className="modal show fade">
            <div className="modal-dialog modal-xl" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Conclusão Ordem de serviso nº {props.id}</h5>
                    </div>

                    <div className="modal-body" >
                        <div className="card finish">
                            <ul className="list-group list-group-flush">
                                <div className="row">
                                    <button type="button" className="list-group-item list-group-item-action col-sm-3">
                                        <span>Nome: </span>{props.name}
                                    </button>
                                    <button type="button" className="list-group-item list-group-item-action col-sm-5">
                                        <span>Marca: </span>{props.devicemodel}
                                    </button>
                                    <button type="button" className="list-group-item list-group-item-action col-sm-4">
                                        <span>Modelo: </span>{props.devicebrand}
                                    </button>
                                </div>
                                <div className="row">
                                    <button type="button" className="list-group-item list-group-item-action col-sm-3">
                                        <span>Número: </span>{props.number}
                                    </button>
                                    <button type="button" className="list-group-item list-group-item-action col-sm-3">
                                        <span>CPF: </span>{props.CPF}
                                    </button>
                                    <button type="button" className="list-group-item list-group-item-action col-sm-3">
                                        <span>E-mail: </span>{props.email}
                                    </button>
                                    <button type="button" className="list-group-item list-group-item-action col-sm-3">
                                        <span>Endereço: </span>{props.address}
                                    </button>
                                </div>
                                <div className="row">
                                    <button type="button" className="list-group-item list-group-item-action col-sm-2">
                                        <span>Valor: </span>{props.value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                                    </button>
                                    <button type="button" className="list-group-item list-group-item-action col-sm-2">
                                        <span>Valor saida: </span>{props.negativeValue.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                                    </button>
                                    <button type="button" className="list-group-item list-group-item-action col-sm-4">
                                        <span>Observação: </span>{props.observation}
                                    </button>
                                    <button type="button" className="list-group-item list-group-item-action col-sm-4">
                                        <span>Horário saida: </span>{dataFormatada}
                                    </button>
                                </div>
                            </ul>
                            <ul className="list-group list-group-flush">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="row">
                                        <button type="button" className="list-group-item list-group-item-action col-sm-4">
                                            <span>Método de pagamento: </span>
                                            <select
                                                {...register("PaymentMethod_id")}
                                                onChange={(e) => setPaymentMethod(e.target.value)}
                                            >
                                                <option value="" disabled selected>Selecione...</option>

                                                {listPaymentsMethods.map((listPaymentMethod) => (
                                                    <option
                                                        key={listPaymentMethod.PaymentMethod_id}
                                                        value={listPaymentMethod.id}>
                                                        {listPaymentMethod.PaymentMethod}
                                                    </option>
                                                ))}
                                            </select>
                                        </button>
                                        {RenderizaMaquinas &&
                                            < >
                                                <button type="button" className="list-group-item list-group-item-action col-sm-4">
                                                    <span>Máquina: </span>
                                                    <select {...register("machine_id")}>
                                                        <option value="" disabled selected>Selecione...</option>

                                                        {listMachines.map((listMachine) => (
                                                            <option
                                                                key={listMachine.machine_id}
                                                                value={listMachine.id}>
                                                                {listMachine.machine}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </button>
                                                <button type="button" className="list-group-item list-group-item-action col-sm-4">
                                                    <span>Parcelas: </span>
                                                    <select {...register("value")}>
                                                        <option value="" disabled selected>Selecione</option>
                                                        <option value="1" >1x S/ Juros {props.value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</option>
                                                        <option value="2" >2x S/ Juros {divisao2(props.value)}</option>
                                                        <option value="3" >3x S/ Juros {divisao3(props.value)}</option>
                                                        <option value="4" >4x S/ Juros {divisao4(props.value)}</option>
                                                        <option value="5" >5x S/ Juros {divisao5(props.value)}</option>
                                                        <option value="6" >6x S/ Juros {divisao6(props.value)}</option>
                                                    </select>
                                                </button>
                                            </>
                                        }
                                    </div>
                                    <div className="row">
                                        <button type="button" className="list-group-item list-group-item-action col-sm-3">
                                            <span>Desconto %: </span>
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    style={{ backgroundColor: "white", opacity: "0.7" }}
                                                    className="form-control"
                                                    id='installments'
                                                    placeholder="Desconto"
                                                    {...register("installments")}
                                                />
                                            </div>
                                        </button>
                                        <button type="button" className="list-group-item list-group-item-action col-sm-3">
                                            <span>Valor : </span>{props.value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                                            {/* <input
                                            type="integer"
                                            style={{ backgroundColor: "white", opacity: "0.7" }}
                                            className="form-control"
                                            id='number'
                                            placeholder="Cliente vai pagar"
                                            {...register("number")}
                                        /> */}
                                        </button>

                                        <button type="button" className="btn btn-danger btn-lm col-sm-2 mt-4 col-sm-2 " onClick={props.hide}>Voltar!</button>
                                        <button type="submit" className="btn btn-success btn-lm col-sm-2 mt-4 col-sm-2" style={{}}>Fechar Os</button>

                                    </div>
                                </form>
                            </ul>

                        </div>
                    </div >
                </div >
            </div >
        </div >
    )
}
export default FinishModal
