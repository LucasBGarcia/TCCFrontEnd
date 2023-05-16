import { Box, Text } from "@chakra-ui/react";
import { useEffect, useState } from 'react';

import axios from "axios";


const CalculaEntradaFechado = () => {

    let [list, setList] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3333/serviceorderended`)
            .then((response) => {
                setList(response.data);
            })
    }, [])

    var functionSepara = list.map(function (data: any) {
        var valores = data.ordemServico.value
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
export default CalculaEntradaFechado;
