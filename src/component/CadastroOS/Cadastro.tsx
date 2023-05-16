import { Box, Button, HStack, Input, Select, Stack, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

import api from "../../api";


function CadastroOS() {
    const altura = "100%";
    const largura = "100%";

    let [list, setList] = useState([]);
    const [Nome, setNome] = useState('')
    const [Telefone, setTelefone] = useState('')
    const [Marca, setMarca] = useState<number>(0)
    const [Modelo, setModelo] = useState<number>(0)
    const [Servico, setServico] = useState('')
    const [Valor, setValor] = useState<number>(0)
    const [Retirada, setRetirada] = useState<any>(new Date());
    const [CPF, setCPF] = useState('')
    const [Observacao, setObservacao] = useState('')
    const [Email, setEmail] = useState('')
    const [Endereco, setEndereco] = useState('')
    let [idModelo, setIdModelo] = useState<number>(0)
    let [ListBrands, setListBrands] = useState([]);
    let [ListModels, setListModels] = useState([]);
    let [ListServices, setListServices] = useState([]);

    type data = {
        name: string,
        number: string,
        DeviceModel_id: number,
        service_id: string,
        value: number,
        withdrawal: Date,
        email: string
        CPF: string,
        address: string,
        observation: string,
    }

    const setData = async () => {
        const Cliente: data = {
            name: Nome,
            number: Telefone,
            DeviceModel_id: idModelo,
            service_id: Servico,
            value: Valor,
            withdrawal: Retirada,
            email: Email,
            CPF: CPF,
            address: Endereco,
            observation: Observacao,
        }

        try {
            console.log(Cliente)
            await api.post("serviceorder", Cliente)
            window.location.reload()
        } catch (error: any) {
            console.log(error.response.data);
            alert(error.response.data)
        }
    }

    const handleChange = (e: any) => {
        let valor = e.target.value.replace(",", ".")
        setValor(valor)
    }
    const handleChangeModelo = (e: any) => {
        setIdModelo(e.target.value)
    }
    const handleChangeService = (e: any) => {
        setServico(e.target.value)
    }

    useEffect(() => {
        axios.get(`http://localhost:3333/services`)
            .then((response) => {
                setListServices(response.data);
            })
    }, [])

    useEffect(() => {
        axios.get(`http://localhost:3333/devicebrands`)
            .then((response) => {
                setListBrands(response.data);
            })
    }, [])


    const selectModels = (id: any) => {
        console.log(id);
        setMarca(id)
        axios.get(`http://localhost:3333/${id}/devicebrands`).then((response) => {
            setListModels(response.data);
        })
    }
    useEffect(() => {
        axios.get(`http://localhost:3333/serviceorder`)
            .then((response) => {
                setList(response.data);

            })
    }, [])

    const Cancelar = () => {
        setNome('')
        setTelefone('')
        setMarca(0)
        setModelo(0)
        setServico('')
        setValor(0)
        setRetirada('')
        setCPF('')
        setObservacao('')
        setEmail('')
    }

    const handlePhone = (e: { target: any; }) => {
        let input = e.target;
        input.value = phoneMask(input.value);
    };

    const phoneMask = (value: string) => {
        if (!value) return "";
        value = value.replace(/\D/g, "");
        value = value.replace(/(\d{2})(\d)/, "($1) $2");
        value = value.replace(/(\d)(\d{4})$/, "$1-$2");
        return value;
    };

    const handleCPF = (e: { target: any; }) => {
        let input = e.target;
        input.value = CPFMask(input.value);
    };

    const CPFMask = (value: string) => {
        if (!value) return "";
        value = value.replace(/\D/g, "");
        value = value.replace(/(\d{3})(\d)/, "$1.$2");
        value = value.replace(/(\d{3})(\d)/, "$1.$2");
        value = value.replace(/(\d{3})(\d{2})$/, "$1-$2");
        return value;
    };

    const handleValor = (e: { target: any; }) => {
        let input = e.target;
        input.value = ValorMask(input.value);
    };

    const ValorMask = (ValorMask: string) => {
        if (!ValorMask) return "";
        ValorMask = ValorMask.replace(/\D/g, "");
        ValorMask = ValorMask.replace(/(\d+)(\d{2})$/, "$1,$2"); // adiciona a vírgula nos últimos dois dígitos
        const milharRegex = /(\d)(?=(\d{3})+(?!\d))/g;
        ValorMask = ValorMask.replace(milharRegex, "$1.");
        return ValorMask;
    };

    return (
        <Box
            bg="rgba(165, 165, 165, 1)"
            w={largura}
            h={altura}
            bgPosition="center"
            bgRepeat="no-repeat"
            borderRadius="10.85px"
            boxShadow="md"
            padding="5px 15px 15px 15px"
            mt='10px'
        >
            <Box display="flex" flexWrap='wrap' gap='10px'>
                <Stack>
                    <Text
                        color="#1A202C"
                        fontWeight="bold"
                        m='0'>
                        *Nome
                    </Text>
                    <Input
                        value={Nome}
                        m='0'
                        w='150px'
                        p='0px'
                        textAlign='center'
                        onChange={(e) => setNome(e.target.value)}
                    />
                </Stack>
                <Stack>
                    <Text
                        color="#1A202C"
                        fontWeight="bold"
                        m='0'>
                        *Telefone:
                    </Text>
                    <Input
                        maxLength={15}
                        value={Telefone}
                        m='0'
                        w='150px'
                        p='0px'
                        textAlign='center'
                        onChange={(e) => {
                            handlePhone(e)
                            setTelefone(e.target.value)
                        }}
                    />
                </Stack>
                <Stack>
                    <Text
                        color="#1A202C"
                        fontWeight="bold"
                        m='0'>
                        *Marca:
                    </Text>
                    <Select
                        onChange={(e) => selectModels(e.target.value)}
                    >
                        <option value="" disabled selected>
                            Selecione
                        </option>
                        {ListBrands.map((listBrand: any) => (
                            <option
                                key={listBrand.DeviceBrand_id}
                                value={listBrand.id}>
                                {listBrand.devicebrand}
                            </option>
                        ))}
                    </Select>
                </Stack>
                <Stack>
                    <Text
                        color="#1A202C"
                        fontWeight="bold"
                        m='0'>
                        *Modelo:
                    </Text>
                    <Select onChange={(e) => handleChangeModelo(e)}>
                        <option value="" disabled selected>Marca Primeiro...</option>

                        {ListModels.map((listModel: any, index) => (
                            <option key={listModel.DeviceModel_id}
                                value={listModel.id}>
                                {listModel.devicemodel}</option>
                        ))}
                    </Select>
                </Stack>
                <Stack>
                    <Text
                        color="#1A202C"
                        fontWeight="bold"
                        m='0'>
                        *Servico:
                    </Text>
                    <Select
                        value={Servico}
                        onChange={(e) => handleChangeService(e)}
                    >

                        <option value="" disabled selected>Selecione...</option>

                        {ListServices.map((ListService: any, index) => (
                            <option key={ListService.service_id}
                                value={ListService.id}>
                                {ListService.service}</option>
                        ))}
                    </Select>
                </Stack>
                <Stack>
                    <Text
                        color="#1A202C"
                        fontWeight="bold"
                        m='0'>
                        *Valor:
                    </Text>
                    <HStack >
                        <Text color="#1A202C"
                            fontWeight="bold">R$</Text>
                        <Input
                            value={Valor}
                            onChange={(e) => {
                                handleChange(e)
                            }}
                            m='0'
                            w='100px'
                            p='0px'
                            textAlign='center'

                        />
                    </HStack>
                </Stack>
                <Stack>
                    <Text
                        color="#1A202C"
                        fontWeight="bold"
                        m='0'>
                        Previsão de retirada:
                    </Text>
                    <Input
                        placeholder=""
                        size="md"
                        type="datetime-local"
                        onChange={(e) => setRetirada(e.target.value)}
                    />
                </Stack>
                <Stack>
                    <Text
                        color="#1A202C"
                        fontWeight="bold"
                        m='0'>
                        CPF:
                    </Text>
                    <Input
                        maxLength={13}
                        value={CPF}
                        onChange={(e) => {
                            handleCPF(e)
                            setCPF(e.target.value)
                        }}
                        m='0'
                        w='150px'
                        p='0px'
                        textAlign='center'
                    />
                </Stack>
                <Stack>
                    <Text
                        color="#1A202C"
                        fontWeight="bold"
                        m='0'>
                        Observações:
                    </Text>
                    <Input
                        value={Observacao}
                        onChange={(e) => setObservacao(e.target.value)}
                        m='0'
                        w='150px'
                        p='0px'
                        textAlign='center'
                    />
                </Stack>
                <Stack>
                    <Text
                        color="#1A202C"
                        fontWeight="bold"
                        m='0'>
                        E-mail:
                    </Text>
                    <Input
                        value={Email}
                        onChange={(e) => setEmail(e.target.value)}
                        m='0'
                        w='150px'
                        p='0px'
                        textAlign='center'
                    />
                </Stack>
                <Stack>
                    <Text
                        color="#1A202C"
                        fontWeight="bold"
                        m='0'>
                        Endereço:
                    </Text>
                    <Input
                        value={Endereco}
                        onChange={(e) => setEndereco(e.target.value)}
                        m='0'
                        w='150px'
                        p='0px'
                        textAlign='center'
                    />
                </Stack>

                <HStack mt='25px'>
                    <Button colorScheme='green' onClick={() => setData()}>Cadastrar</Button>
                    <Button colorScheme='red' onClick={() => Cancelar()}>Cancelar</Button>
                </HStack>
            </Box>
        </Box >
    )
}

export default CadastroOS