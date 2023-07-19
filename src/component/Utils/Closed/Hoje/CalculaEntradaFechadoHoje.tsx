import { Box, Text } from "@chakra-ui/react";
import { useEffect, useState } from 'react';

import axios from "axios";
import { format } from "date-fns";


const CalculaEntradaFechadoHoje = () => {

    let [list, setList] = useState([]);

    useEffect(() => {

        const hoje = new Date()
        const hojeFormatado = format(hoje, 'dd/MM/yyyy')
        let lista: any = []
        axios.get(`https://easycaixa.onrender.com/serviceorderended`)
            .then((response) => {
                response.data.map((e: any) => {
                    if (dataEntradaFormatada(e.createdAt) === hojeFormatado) {

                        lista.push(e)
                    }
                })
                setList(lista);
            })
    }, [])

    const dataEntradaFormatada = (data) => {
        const dataConvertida = format(new Date(data), 'dd/MM/yyyy');
        return dataConvertida
    }

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
export default CalculaEntradaFechadoHoje;
