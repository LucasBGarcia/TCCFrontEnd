/* eslint-disable react-hooks/exhaustive-deps */
import {
    Box,
    HStack,
    ModalBody,
    ModalCloseButton,
    ModalFooter,
    ModalOverlay,
    Table,
    TableContainer,
    Tbody,
    Td,
    Tfoot,
    Th,
    Thead,
    Tr,
    useDisclosure,
    Modal, ModalContent, ModalHeader,
    Button,
    Text,
    Select,
    Stack,
    Input
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { BsBrush, BsCheckLg, BsTrash } from "react-icons/bs";
import { IoEyeOutline } from "react-icons/io5";
import CalculaEntradaAberto from "../Utils/Opened/CalculaEntradaAberto";
import CalculaSaidaAberto from "../Utils/Opened/CalculaSaidaAberto";
import CalculaTotalAberto from "../Utils/Opened/CalculaTotalAberto";
import api from "../../api";
//import { Button } from "semantic-ui-react";


function ListaOrdensFechadas() {
    const altura = "100%";
    const largura = "100%";

    let [list, setList] = useState([]);
    let [ListClosedOrders, setListClosedOrders] = useState([]);
    const [Dados, setDados] = useState(false)
    const [DadosVisualiza, setDadosVisualiza] = useState(false)
    const [DadosEdita, setDadosEdita] = useState(false)
    let [DadosConclusao, setDadosConclusao] = useState<any>([])
    let [DadosEditar, setDadosEditar] = useState<any>([]);
    let [DadosVisualizar, setDadosVisualizar] = useState<any>([]);
    let [listPaymentsMethods, setListPaymentsMethods] = useState([]);
    let [listMachines, setListMachines] = useState([]);
    let [PaymentMethod, setPaymentMethod] = useState<any>('');
    let [MaquinaID, setMaquinaID] = useState<any>('')
    let [Parcelas, setParcelas] = useState<any>('')
    const [Marca, setMarca] = useState<number>(0)
    const [Nome, setNome] = useState<any>('')

    const [Telefone, setTelefone] = useState('')
    const [Servico, setServico] = useState('')
    const [Valor, setValor] = useState<number>(0)
    const [ValorSaida, setValorSaida] = useState<number>(0)
    const [Retirada, setRetirada] = useState<any>(new Date());
    const [CPF, setCPF] = useState('')
    const [Observacao, setObservacao] = useState('')
    const [Email, setEmail] = useState('')
    const [Endereco, setEndereco] = useState('')

    let [ListServices, setListServices] = useState([]);
    let [ListBrands, setListBrands] = useState([]);
    let [ListModels, setListModels] = useState([]);
    let [idModelo, setIdModelo] = useState<number>(0)

    useEffect(() => {
        if (DadosEdita) {
            setTelefone(DadosEditar.client.number)
            setServico(DadosEditar.service.id)
            setValor(DadosEditar.value)
            setValorSaida(DadosEditar.negativeValue)
            setRetirada(DadosEditar.withdrawal)
            setCPF(DadosEditar.client.CPF)
            setObservacao(DadosEditar.observation)
            setEmail(DadosEditar.client.email)
            setEndereco(DadosEditar.client.address)
            setNome(DadosEditar.client.name)
            setIdModelo(DadosEditar.DeviceModel.id)
        }
    }, [DadosEdita])

    const [RenderizaMaquinas, setRenderizaMaquinas] = useState(false);

    const handlePaymentMethod = (e: any) => {
        setPaymentMethod(e.target.value)
    }
    const handleMachine = (e: any) => {
        setMaquinaID(e.target.value)
    }
    const handleParcelas = (e: any) => {
        setParcelas(e.target.value)
    }

    const { isOpen, onOpen, onClose } = useDisclosure()

    const { isOpen: isOpenVisualiza
        , onOpen: onOpenVisualiza
        , onClose: onCloseVisualiza } = useDisclosure()

    const { isOpen: isOpenEdita
        , onOpen: onOpenEdita
        , onClose: onCloseEdita } = useDisclosure()

    type data = {
        PaymentMethod_id: number,
        machine_id: number,
        installments: number,
    }
    type dataEdit = {
        name: string,
        number: string,
        DeviceModel_id: number,
        service_id: string,
        value: number,
        negativeValue: number,
        withdrawal: Date,
        email: string
        CPF: string,
        address: string,
        observation: string,
    }

    const setData = async () => {
        const Cliente: dataEdit = {
            name: Nome,
            number: Telefone,
            DeviceModel_id: idModelo,
            service_id: Servico,
            value: Valor,
            negativeValue: ValorSaida,
            withdrawal: Retirada,
            email: Email,
            CPF: CPF,
            address: Endereco,
            observation: Observacao,
        }

        try {
            console.log('DadosEdita', DadosEdita)
            console.log(Cliente)
            await api.put(`${DadosEditar.id}/serviceorder`, Cliente)

            alert("atualizado com sucesso")
            window.location.reload();
        } catch (error: any) {
            console.log(error.response.data);
            alert(error.response.data)
        }

    }

    useEffect(() => {
        const paymentMethodsToRender = ['2', '3', '5'];
        setRenderizaMaquinas(paymentMethodsToRender.includes(PaymentMethod));
    }, [PaymentMethod]);

    useEffect(() => {
        axios.get(`http://localhost:3333/services`)
            .then((response) => {
                setListServices(response.data);
            })
    }, [])

    useEffect(() => {
        axios.get(`http://localhost:3333/serviceorderended`)
            .then((response) => {
                setListClosedOrders(response.data);
                console.log(response.data);
            })
        console.log(ListClosedOrders)
    }, [])
    useEffect(() => {
        axios.get(`http://localhost:3333/serviceorder`)
            .then((response) => {
                setList(response.data);
                console.log(response.data)
            })
        console.log(list)
    }, [])

    const onDelete = (id: any, name: any) => {
        var result = window.confirm(`Deseja deletar OS ${name}?`)
        if (result === true) {
            axios.delete(`http://localhost:3333/${id}/serviceorder`)
            window.location.reload();
        }
    }

    useEffect(() => {
        axios.get(`http://localhost:3333/paymentmethods`)
            .then((response) => {
                setListPaymentsMethods(response.data);
                // console.log(response.data);
            })
    }, [])
    useEffect(() => {
        axios.get(`http://localhost:3333/machines`)
            .then((response) => {
                setListMachines(response.data);
                // console.log(response.data);
            })
    }, [])

    useEffect(() => {
        console.log(ListClosedOrders)
        console.log(list)
    }, [DadosVisualiza])

    const handleChange = (e: any) => {
        setValor(e.target.value)
    }
    const handleChangeSaida = (e: any) => {
        setValorSaida(e.target.value)
    }
    const handleChangeModelo = (e: any) => {
        setIdModelo(e.target.value)
    }
    const handleChangeService = (e: any) => {
        setServico(e.target.value)
    }

    const ConcluiOS = async (id: any) => {
        const Data: data = {
            PaymentMethod_id: PaymentMethod,
            machine_id: MaquinaID,
            installments: Parcelas,
        }
        try {
            await api.post(`/${id}/finishServiceOrder`, Data)

            alert("finalizada com sucesso")
            window.location.reload();
        } catch (error: any) {
            console.log(error.response.data);
            alert(error.response.data)
        }
    }

    const divisao2 = (value: any) => {
        let divisao = (value / 2).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
        return divisao
    }
    const divisao3 = (value: any) => {
        let divisao = (value / 3).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
        return divisao
    }
    const divisao4 = (value: any) => {
        let divisao = (value / 4).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
        return divisao
    }
    const divisao5 = (value: any) => {
        let divisao = (value / 5).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
        return divisao
    }
    const divisao6 = (value: any) => {
        let divisao = (value / 6).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
        return divisao
    }

    useEffect(() => {
        axios.get(`http://localhost:3333/devicebrands`)
            .then((response) => {
                setListBrands(response.data);
            })
    }, [])
    const selectModels = (id: any) => {
        setMarca(id)
        axios.get(`http://localhost:3333/${id}/devicebrands`).then((response) => {
            setListModels(response.data);
        })
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
        return "R$ " + ValorMask;
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
                <TableContainer>
                    <Table variant='striped' colorScheme='teal'>
                        <Thead>
                            <Tr>
                                <Th textAlign='center' w='35px' p='5px 0 5px 0'>Nº OS</Th>
                                <Th textAlign='center' w='35px' p='5px 0 5px 0'>Marca</Th>
                                <Th textAlign='center' w='35px' p='5px 0 5px 0'>Modelo</Th>
                                <Th textAlign='center' w='35px' p='5px 0 5px 0'>Serviço</Th>
                                <Th textAlign='center' w='35px' p='5px 0 5px 0'>Valor</Th>
                                <Th textAlign='center' w='35px' p='5px 0 5px 0'>Saida caixa</Th>
                                <Th textAlign='center' w='35px' p='5px 0 5px 0'>Ações</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {ListClosedOrders.map((data: any) => {
                                return (
                                    <Tr>
                                        <Td textAlign='center' p='5px 0 5px 0' w='35px'>
                                            {data.id}
                                        </Td>
                                        <Td textAlign='center' p='5px 0 5px 0' w='35px'>
                                            {data.ordemServico.DeviceModel.DeviceBrand.devicebrand}
                                        </Td>
                                        <Td textAlign='center' p='5px 0 5px 0' w='35px'>
                                            {data.ordemServico.DeviceModel.devicemodel}
                                        </Td>
                                        <Td textAlign='center' p='5px 0 5px 0' w='35px'>
                                            {data.ordemServico.service.service}
                                        </Td>
                                        <Td textAlign='center' p='5px 0 5px 0' w='35px'>
                                            {data.ordemServico.value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                                        </Td>
                                        <Td textAlign='center' p='5px 0 5px 0' w='35px'>
                                            {data.ordemServico.negativeValue.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                                        </Td>
                                        <Td textAlign='center' p='5px 0 5px 0'>

                                            <HStack>
                                                <Button
                                                    colorScheme='black' variant='link'
                                                    onClick={(e) => {
                                                        setDadosVisualiza(!DadosVisualiza)
                                                        setDadosVisualizar(data)
                                                        onOpenVisualiza()
                                                    }}>
                                                    <IoEyeOutline />
                                                </Button>
                                            </HStack>
                                        </Td>

                                    </Tr>
                                )
                            })}
                        </Tbody>
                        <Tfoot>
                            <Tr>
                                <Th colSpan={2} textColor='green' textAlign='center' p='5px 0 5px 0' w='35px'>{CalculaEntradaAberto()}</Th>
                                <Th colSpan={2} textColor='red' textAlign='center' p='5px 0 5px 0' w='35px'>{CalculaSaidaAberto()}</Th>
                                <Th colSpan={2} textAlign='center' p='5px 0 5px 0' w='35px'>{CalculaTotalAberto()}</Th>

                            </Tr>
                        </Tfoot>
                    </Table>
                </TableContainer >

            </Box >

            <Modal size='xl' isOpen={isOpenVisualiza} onClose={onCloseVisualiza}>

                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Visualizar OS nº {DadosConclusao.id}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack>
                            <Box p='5px' gap='10px' border='1px' borderRadius='8px' display='flex' flexWrap='wrap'>
                                <Box >
                                    Nome: {DadosVisualiza ? DadosVisualizar.ordemServico.client.name : ''}
                                </Box>
                                <Box >
                                    Marca: {DadosVisualiza ? DadosVisualizar.ordemServico.DeviceModel.DeviceBrand.devicebrand : ''}
                                </Box>
                                <Box >
                                    Modelo: {DadosVisualiza ? DadosVisualizar.ordemServico.DeviceModel.devicemodel : ''}
                                </Box>
                                <Box >
                                    Serviço: {DadosVisualiza ? DadosVisualizar.ordemServico.service.service : ''}
                                </Box>
                                <Box >
                                    Número: {DadosVisualiza ? DadosVisualizar.ordemServico.client.number : ''}
                                </Box>
                                <Box >
                                    CPF: {DadosVisualiza ? DadosVisualizar.ordemServico.client.CPF : ''}
                                </Box>
                                <Box >
                                    E-mail: {DadosVisualiza ? DadosVisualizar.ordemServico.client.email : ''}
                                </Box>
                                <Box >
                                    Endereço: {DadosVisualiza ? DadosVisualizar.ordemServico.client.address : ''}
                                </Box>
                                <Box >
                                    Valor: {DadosVisualiza ? DadosVisualizar.ordemServico.value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) : ''}
                                </Box>
                                <Box >
                                    Valor saída: {DadosVisualiza ? DadosVisualizar.ordemServico.negativeValue.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) : ''}
                                </Box>
                                <Box >
                                    Observações: {DadosVisualiza ? DadosVisualizar.ordemServico.observation : ''}
                                </Box>
                                <Box >
                                    Horário de saída: {DadosVisualiza ? DadosVisualizar.ordemServico.withdrawal : ''}
                                </Box>

                            </Box>
                        </Stack>

                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={() => {
                            setDadosVisualiza(!DadosVisualiza)
                            onCloseVisualiza()
                        }}>
                            Fechar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </>
    )
}

export default ListaOrdensFechadas