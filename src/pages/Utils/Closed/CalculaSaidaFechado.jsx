import React, { useState, useEffect } from 'react'

import axios from "axios"

const CalculaSaidaFechado = () => {

    let [list, setList] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3333/serviceorderended`)
            .then((response) => {
                setList(response.data);
                // console.log(response.data);
            })
    }, [])

    var functionSepara = list.map(function (data) {
        var valores = data.ordemServico.negativeValue
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

    var saida = Soma(functionSepara)


    return (
        <div>
            <span>Saida: {saida.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span>
        </div>
    )


}
export default CalculaSaidaFechado;
