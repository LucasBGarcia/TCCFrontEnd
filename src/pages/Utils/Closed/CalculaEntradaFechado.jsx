import React, { useState, useEffect } from 'react'


import axios from "axios"


const CalculaEntradaFechado = () => {

    let [list, setList] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3333/serviceorderended`)
            .then((response) => {
                setList(response.data);
            })
    }, [])

    var functionSepara = list.map(function (data) {
        var valores = data.ordemServico.value
        return valores
    })

    function Soma(Array) {
        var Numeros = Array
        var separa = Numeros.splice(',')

        const soma = separa.reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
        }, 0)

        return soma
    }

    var total = Soma(functionSepara)


    return (
        <div>
            <span>Entrada: {total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span>
        </div>
    )


}
export default CalculaEntradaFechado;
