/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Spacer, Stack, Text, Textarea, useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

import api from "../../api";
import Cliente from "../modal/Cliente";
import { BsSearch } from "react-icons/bs";

import { ToastContainer, toast } from 'react-toastify';


function CadastroOS() {
    const altura = "100%";
    const largura = "100%";

    let [list, setList] = useState([]);
    const [Nome, setNome] = useState('')
    const [Telefone, setTelefone] = useState('')
    // let [Marca, setMarca] = useState<any>('')
    const [marca, setMarca] = useState<any>(null);
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
    // let [ListModels, setListModels] = useState([]);
    const [ListModels, setListModels] = useState<any[]>([]);
    let [ListServices, setListServices] = useState([]);

    let [Clientes, setClientes] = useState([]);

    let [BuscaClientesNome, setBuscaClientesNome] = useState('');
    let [ResultadoBuscaClientesNome, setResultadoBuscaClientesNome] = useState([]);

    let [BuscaClientesCPF, setBuscaClientesCPF] = useState(0);
    let [ResultadoBuscaClientesCPF, setResultadoBuscaClientesCPF] = useState([]);

    let [ClienteSelecionado, setClienteSelecionado] = useState<any>();

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

        const emailBody = {
            email: Email,
            ordem: `<h2>Ordem de serviço</h2> \n Cliente: ${Nome}, Telefone: ${Telefone}, Valor: ${Valor}`
        }
        try {
            await api.post("serviceorder", Cliente)
            await api.post("sendMail", emailBody)
            toast.success('Email ou senha inválidos.')
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

    const handleChangeBuscaCPF = (e: any) => {
        setBuscaClientesCPF(e)
    }

    const handleChangeCliente = (e: any) => {
        Clientes.map((cliente: any, key: any) => {
            if (cliente.id === Number(e.target.value)) {
                setClienteSelecionado(cliente)
                setNome(cliente.name)
                setTelefone(cliente.number)
                setEmail(cliente.email)
                setEndereco(cliente.address)
            }
        })
    }


    useEffect(() => {
        RenderizaClienteFiltrado()
    }, [ClienteSelecionado])


    const RenderizaClienteFiltrado = () => {
        return (
            <>
                <Box gap='5px' display='flex' flexWrap='wrap' borderBottom='2px' borderColor='orange'>
                    <Stack>
                        <Text
                            color="#1A202C"
                            fontWeight="bold"
                            m='0'>
                            Nome: {ClienteSelecionado ? ClienteSelecionado.name : '---'}
                        </Text>

                    </Stack>
                    <Stack>
                        <Text
                            color="#1A202C"
                            fontWeight="bold"
                            m='0'>
                            Telefone: {ClienteSelecionado ? ClienteSelecionado.number : '---'}
                        </Text>

                    </Stack>
                    <Stack>
                        <Text
                            color="#1A202C"
                            fontWeight="bold"
                            m='0'>
                            CPF: {ClienteSelecionado ? ClienteSelecionado.CPF : '---'}
                        </Text>

                    </Stack>
                    <Stack>
                        <Text
                            color="#1A202C"
                            fontWeight="bold"
                            m='0'>
                            E-mail: {ClienteSelecionado ? ClienteSelecionado.email : '---'}
                        </Text>

                    </Stack>
                    <Stack mb='5px'>
                        <Text
                            color="#1A202C"
                            fontWeight="bold"
                            m='0'>
                            Endereço: {ClienteSelecionado ? ClienteSelecionado.address : '---'}
                        </Text>

                    </Stack>
                </Box>
            </>
        )
    }

    useEffect(() => {
        axios.get(`http://localhost:3333/services`)
            .then((response) => {
                setListServices(response.data);
            })
    }, [])
    useEffect(() => {
        axios.get(`http://localhost:3333/clients`)
            .then((response) => {
                setClientes(response.data);
            })
    }, [])

    useEffect(() => {
        axios.get(`http://localhost:3333/devicebrands`)
            .then((response) => {
                setListBrands(response.data);
            })
    }, [])


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

    const { isOpen, onOpen, onClose } = useDisclosure()

    useEffect(() => {
        if (BuscaClientesNome !== '') {
            let filtro = Clientes.filter((lis: any) => lis.name.toLowerCase().includes(BuscaClientesNome))
            setResultadoBuscaClientesNome(filtro);
        } else {
            setResultadoBuscaClientesNome([]);
        }
    }, [BuscaClientesNome])


    useEffect(() => {
        if (BuscaClientesCPF !== 0) {
            let ValorFiltrado = Clientes.filter((lis: any) => lis.CPF.toString().includes(BuscaClientesCPF))
            setResultadoBuscaClientesCPF(ValorFiltrado);
        } else {
            setResultadoBuscaClientesCPF([]);
        }
    }, [BuscaClientesCPF])

    let selectModels = async (id: any) => {
        try {
            setMarca(id);
            const response = await fetch(`http://localhost:3333/${id}/devicebrands`);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const data = await response.json();
            setListModels(data);
        } catch (error: any) {
            console.log(error.message);
            //alert(error.message);
        }
    };

    return (
        <>
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
                    <Button mt='32px' colorScheme='orange' onClick={() => onOpen()}>Cliente</Button>
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
                            {ListBrands.map((listBrand: any, key: any) => (
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

                            {ListModels.map((listModel: any, key: any) => (
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

                            {ListServices.map((ListService: any, key) => (
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
                            <Text
                                justifyContent='center'
                                margin='auto'
                                color="#1A202C"
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
                    <Stack backgroundColor="rgba(165, 165, 165, 1)">
                        <Text
                            color="#1A202C"
                            fontWeight="bold"
                            m='0'>
                            Observações:
                        </Text>
                        <Textarea
                            backgroundColor="rgba(165, 165, 165, 1)"
                            value={Observacao}
                            onChange={(e) => setObservacao(e.target.value)}
                            m='0'
                            minHeight='38px'
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
            <Modal size='xl' isOpen={isOpen} onClose={onClose}>

                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text
                            mt='4px'
                            fontSize='xl'
                            color="#1A202C"
                            fontWeight="bold">
                            Novo cliente
                        </Text >
                        <Box gap='5px' display='flex' flexWrap='wrap' borderBottom='2px' borderColor='orange'>
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
                            <Stack mb='5px'>
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
                        </Box>
                        <Text
                            mt='4px'
                            fontSize='xl'
                            color="#1A202C"
                            fontWeight="bold">
                            Pesquisar cliente
                        </Text >
                        <Stack>
                            <HStack gap='25px'>
                                <Stack>
                                    <Text
                                        color="#1A202C"
                                        fontWeight="bold"
                                        m='0'>
                                        <HStack> <BsSearch />Nome:</HStack>
                                    </Text>
                                    <Input
                                        value={BuscaClientesNome}
                                        m='0'
                                        w='150px'
                                        p='0px'
                                        textAlign='center'
                                        onChange={(e) => setBuscaClientesNome(e.target.value)}
                                    />
                                    <Select
                                        p='0'
                                        textAlign='center'
                                        value={ClienteSelecionado}
                                        maxWidth='150px'
                                        onChange={(e) => handleChangeCliente(e)}
                                    >
                                        <option value="" disabled selected>Selecione...</option>
                                        {ResultadoBuscaClientesNome.map((cliente: any, key: any) => (
                                            <option
                                                value={cliente.id}>
                                                {cliente.name}</option>
                                        ))}
                                    </Select>
                                </Stack>
                                <Stack>
                                    <Text
                                        color="#1A202C"
                                        fontWeight="bold"
                                        m='0'>
                                        <HStack> <BsSearch />CPF:</HStack>
                                    </Text>
                                    <Input
                                        maxLength={13}
                                        value={BuscaClientesCPF}
                                        onChange={(e) => {
                                            handleCPF(e)
                                            handleChangeBuscaCPF(e.target.value)
                                        }}
                                        m='0'
                                        w='150px'
                                        p='0px'
                                        textAlign='center'
                                    />
                                    <Select
                                        p='0'
                                        textAlign='center'
                                        maxWidth='150px'
                                        onChange={(e) => handleChangeCliente(e)}
                                    >

                                        <option value="" disabled selected>Selecione...</option>

                                        {ResultadoBuscaClientesCPF.map((cliente: any, key: any) => (
                                            <option
                                                value={cliente.id}>
                                                {cliente.CPF}</option>
                                        ))}
                                    </Select>
                                </Stack>

                            </HStack>
                            <>
                                {RenderizaClienteFiltrado()}
                            </>
                        </Stack>

                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={() => {
                            setNome('')
                            setTelefone('')
                            setCPF('')
                            setEmail('')
                            setEndereco('')
                            onClose()
                            setBuscaClientesNome('')
                            setClienteSelecionado('')
                            setBuscaClientesCPF(0)
                        }}>
                            Cancelar
                        </Button>
                        <Button colorScheme='green' onClick={() => {
                            onClose()
                        }}>Cadastrar cliente</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <ToastContainer />
        </>
    )
}

export default CadastroOS