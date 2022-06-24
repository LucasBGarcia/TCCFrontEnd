import React, { Component } from 'react'
import './ViewModal.css'

export default class ViewModal extends Component {


    render() {

        var data = new Date(this.props.withdrawal)
        var dataFormatada = data.toLocaleString('pt-BR', { timeZone: 'UTC' })

        return (
            <div className="modal show fade">
                <div className="modal-dialog modal-xl" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Visualização Orden de serviso nº {this.props.id}</h5>
                        </div>
                        <div className="modal-body">
                            <div class="card">
                                <ul class="list-group list-group-flush">
                                    <div className="row">
                                        <button type="button" className="list-group-item list-group-item-action col-sm-3">
                                            <span>Nome: </span>{this.props.name}
                                        </button>
                                        <button type="button" className="list-group-item list-group-item-action col-sm-5">
                                            <span>Marca: </span>{this.props.devicemodel}
                                        </button>
                                        <button type="button" className="list-group-item list-group-item-action col-sm-4">
                                            <span>Modelo: </span>{this.props.devicebrand}
                                        </button>
                                    </div>
                                    <div className="row">
                                        <button type="button" className="list-group-item list-group-item-action col-sm-3">
                                            <span>Número: </span>{this.props.number}
                                        </button>
                                        <button type="button" className="list-group-item list-group-item-action col-sm-3">
                                            <span>CPF: </span>{this.props.CPF}
                                        </button>
                                        <button type="button" className="list-group-item list-group-item-action col-sm-3">
                                            <span>Email: </span>{this.props.email}
                                        </button>
                                        <button type="button" className="list-group-item list-group-item-action col-sm-3">
                                            <span>Endereço: </span>{this.props.address}
                                        </button>
                                    </div>
                                    <div className="row">
                                        <button type="button" className="list-group-item list-group-item-action col-sm-2">
                                            <span>Valor: </span>R$ {this.props.value}
                                        </button>
                                        <button type="button" className="list-group-item list-group-item-action col-sm-2">
                                            <span>Valor saida: </span>{this.props.negativeValue}
                                        </button>
                                        <button type="button" className="list-group-item list-group-item-action col-sm-4">
                                            <span>Observação: </span>{this.props.observation}
                                        </button>
                                        <button type="button" className="list-group-item list-group-item-action col-sm-4">
                                            <span>Horário saida: </span>{dataFormatada}
                                        </button>
                                    </div>
                                </ul>
                            </div>
                            <button type="button" className="btn btn-success btn-lm col-sm-2 mt-4" onClick={this.props.hide}>Ok!</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}