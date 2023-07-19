import React, { useState, useEffect } from 'react'
import { Box, Text } from "@chakra-ui/react";

import axios from "axios"
import { format } from 'date-fns';

const CalculaTotalFechadoAlelo = () => {

    let [list, setList] = useState([]);

    useEffect(() => {

        const hoje = new Date()
        const hojeFormatado = format(hoje, 'dd/MM/yyyy')
        let lista: any = []
        axios.get(`https://easycaixa.onrender.com/serviceorderended`)
            .then((response) => {
                response.data.map((e: any) => {
                    lista.push(e)

                })
                setList(lista);
            })
    }, [])

    const dataEntradaFormatada = (data) => {
        const dataConvertida = format(new Date(data), 'dd/MM/yyyy');
        return dataConvertida
    }

    var functionSeparaPositivo = list.map(function (data: any) {
        if (data.pagamento.machine_id === 2) {
            var valores = data.ordemServico.value
            return valores
        } else {
            return 0
        }
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
        var valores = data.ordemServico.negativeValue
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
            <Text>Total Alelo: {total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</Text>
        </Box>
    )


}
export default CalculaTotalFechadoAlelo;
