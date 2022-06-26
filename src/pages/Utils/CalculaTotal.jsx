import React, { useState, useEffect } from 'react'

import axios from "axios"

const CalculaTotal = () => {

    let [list, setList] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3333/serviceorder`)
            .then((response) => {
                setList(response.data);
                // console.log(response.data);
            })
    }, [])

    var functionSeparaPositivo = list.map(function (data) {
        var valores = data.value
        return valores
    })

    function SomaPositivo(Array) {
        var Numeros = Array
        var separa = Numeros.splice(',')

        const soma = separa.reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
        }, 0)

        return soma
    }

    var functionSeparaNegativo = list.map(function (data) {
        var valores = data.negativeValue
        return valores
    })

    function SomaNegativos(Array) {
        var Numeros = Array
        var separa = Numeros.splice(',')

        const somaNegativos = separa.reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
        }, 0)

        return somaNegativos
    }



    var total = SomaPositivo(functionSeparaPositivo) - SomaNegativos(functionSeparaNegativo)


    return (
        <div>
            <span>Total:{total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span>
        </div>
    )


}
export default CalculaTotal;
