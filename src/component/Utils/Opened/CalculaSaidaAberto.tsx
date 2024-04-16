import React, { useState, useEffect } from 'react'
import { Box, Text } from "@chakra-ui/react";

import axios from "axios"

const CalculaSaidaAberto = () => {

    let [list, setList] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3333/serviceorder`)
            .then((response) => {
                setList(response.data);
                // console.log(response.data);
            })
    }, [])

    var functionSepara = list.map(function (data: any) {
        var valores = data.negativeValue
        return valores
    })

    function Soma(Array: any) {
        var Numeros = Array
        var separa = Numeros.splice(',')

        const soma = separa.reduce((accumulator: any, currentValue: any) => {
            return accumulator + currentValue;
        }, 0)

        return soma
    }

    var saida = Soma(functionSepara)


    return (
        <Box>
            <Text>Saida: {saida.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</Text>
        </Box>
    )


}
export default CalculaSaidaAberto;
