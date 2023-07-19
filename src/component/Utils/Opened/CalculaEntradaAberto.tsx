import React, { useState, useEffect } from 'react'
import { Box, Text } from "@chakra-ui/react";

import axios from "axios"


const CalculaEntradaAberto = () => {

    let [list, setList] = useState([]);

    useEffect(() => {
        axios.get(`https://easycaixa.onrender.com/serviceorder`)
            .then((response) => {
                setList(response.data);
            })
    }, [])

    var functionSepara = list.map(function (data: any) {
        var valores = data.value
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

    var total = Soma(functionSepara)


    return (
        <Box>
            <Text>Entrada: {total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</Text>
        </Box>
    )


}
export default CalculaEntradaAberto;
