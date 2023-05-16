import React, { useState, useEffect } from 'react'
import { Box, Text } from "@chakra-ui/react";

import axios from "axios"

const CalculaTotalAberto = () => {

    let [list, setList] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3333/serviceorder`)
            .then((response) => {
                setList(response.data);
                // console.log(response.data);
            })
    }, [])

    var functionSeparaPositivo = list.map(function (data: any) {
        var valores = data.value
        return valores
    })

    function SomaPositivo(Array: any) {
        var Numeros = Array
        var separa = Numeros.splice(',')

        const soma = separa.reduce((accumulator: any, currentValue: any) => {
            return accumulator + currentValue;
        }, 0)

        return soma
    }

    var functionSeparaNegativo = list.map(function (data: any) {
        var valores = data.negativeValue
        return valores
    })

    function SomaNegativos(Array: any) {
        var Numeros = Array
        var separa = Numeros.splice(',')

        const somaNegativos = separa.reduce((accumulator: any, currentValue: any) => {
            return accumulator + currentValue;
        }, 0)

        return somaNegativos
    }



    var total = SomaPositivo(functionSeparaPositivo) - SomaNegativos(functionSeparaNegativo)


    return (
        <Box>
            <Text>Total: {total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</Text>
        </Box>
    )


}
export default CalculaTotalAberto;
