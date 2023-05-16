/* eslint-disable array-callback-return */
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
import { BsBrush, BsCheckLg, BsSearch, BsTrash } from "react-icons/bs";
import { IoEyeOutline } from "react-icons/io5";
import CalculaEntradaAberto from "../Utils/Opened/CalculaEntradaAberto";
import CalculaSaidaAberto from "../Utils/Opened/CalculaSaidaAberto";
import CalculaTotalAberto from "../Utils/Opened/CalculaTotalAberto";
import api from "../../api";
//import { Button } from "semantic-ui-react";


function ListaOrdensAbertas() {
    const altura = "100%";
    const largura = "100%";

    const [Dados, setDados] = useState(false)
    const [DadosVisualiza, setDadosVisualiza] = useState(false)
    const [DadosEdita, setDadosEdita] = useState(false)
    let [listClosedOrders, setListClosedOrders] = useState([]);
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

    let [list, setList] = useState([]);
    const [FiltroID, setFiltroID] = useState(false)
    const [ListByIDSituacao, setListByIDSituacao] = useState(false)
    let [DadosFiltroID, setDadosFiltroID] = useState<number>(0)
    let [ListFiltroID, setListFiltroID] = useState<Object>([])

    const [FiltroMarca, setFiltroMarca] = useState(false)
    const [ListByMarcaSituacao, setListByMarcaSituacao] = useState(false)
    let [DadosFiltroMarca, setDadosFiltroMarca] = useState<string>('')
    let [ListFiltroMarca, setListFiltroMarca] = useState<any>([])

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
        axios.get(`http://localhost:3333/serviceorder`)
            .then((response) => {
                setList(response.data);
            })
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
        axios.get(`http://localhost:3333/serviceorderended`)
            .then((response) => {
                setListClosedOrders(response.data);
            })
    }, [])

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
    const handleChangeFiltroId = (e: any) => {
        setDadosFiltroID(e.target.value)
        //setBuscaId(e.target.value)
    }
    const handleChangeFiltroMarca = (e: any) => {
        setDadosFiltroMarca(e.target.value)
        //setBuscaId(e.target.value)
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


    const filtroID = () => {
        if (FiltroID) {
            return (
                <Input
                    type="text"
                    p='0px'
                    textAlign='center'
                    style={{ backgroundColor: "white", opacity: "0.7", width: '50px', height: '20px' }}
                    className="form-control"
                    placeholder="Nº ID"
                    onChange={handleChangeFiltroId}
                />
            )
        } else {

            return (
                <>
                    Nº OS
                </>
            )
        }
    }
    const filtroMarca = () => {
        if (FiltroMarca) {
            return (
                <Input
                    type="text"
                    p='0px'
                    textAlign='center'
                    style={{ backgroundColor: "white", opacity: "0.7", width: '50px', height: '20px' }}
                    className="form-control"
                    placeholder="Marca"
                    onChange={handleChangeFiltroMarca}
                />
            )
        } else {
            return (
                <>
                    Marca
                </>
            )
        }
    }
    const ListByID = () => {
        if (ListByIDSituacao) {
            return (
                ListagemPesquisa(ListFiltroID)
            )
        } else {
            return (
                Listagem()
            )
        }
    }

    useEffect(() => {
        if (FiltroID == false) {
            setDadosFiltroID(0)
            setListByIDSituacao(false)
        }
    }, [FiltroID])

    useEffect(() => {
        if (DadosFiltroID !== 0) {
            list.map((e: any) => {
                if (DadosFiltroID == e.id) {
                    try {
                        axios.get(`http://localhost:3333/${DadosFiltroID}/getbyid`)
                            .then((response) => {
                                setListFiltroID([response.data]);
                                setListByIDSituacao(true)
                            })
                        return
                    } catch {
                        setListFiltroID([]);
                    }
                } else {
                    setListByIDSituacao(false)
                    setListFiltroID([]);
                }
            })
        } else {
            setListFiltroID([]);
        }
    }, [DadosFiltroID])

    const ListByMarca = () => {
        console.log('ListFiltroMarca', ListFiltroMarca)
        if (ListByMarcaSituacao) {
            return (
                ListagemPesquisa(ListFiltroMarca)
            )
        } else {
            return (
                Listagem()
            )
        }
    }

    useEffect(() => {
        if (FiltroMarca == false) {
            setDadosFiltroMarca('')
            setListByMarcaSituacao(false)
        }
    }, [FiltroMarca])

    useEffect(() => {
        if (DadosFiltroMarca !== '') {
            list.map((e: any) => {
                if (DadosFiltroMarca == e.DeviceModel.DeviceBrand.devicebrand) {
                    setListFiltroMarca((arr) => [...arr, e]);

                    setListByMarcaSituacao(true)
                }
            })
            console.log('DadosFiltroMarca', DadosFiltroMarca)
            console.log('ListFiltroMarca', ListFiltroMarca)
        } else {
            setListFiltroMarca([]);
            setListByMarcaSituacao(false)
        }
    }, [DadosFiltroMarca])

    // const [buscaId, setBuscaId] = useState('')
    // const [ListaMarca, setListaMarca] = useState<any>([])

    // useEffect(() => {
    //     let IdFiltrado = list.filter((lis: any) => lis.DeviceModel.DeviceBrand.devicebrand.startsWith(buscaId))
    //     setListaMarca(IdFiltrado)
    //     console.log(IdFiltrado)
    //     setListByMarcaSituacao(true)
    //     // setListFiltroID(IdFiltrado)
    //     // console.log(IdFiltrado)
    // }, [buscaId])

    const ViewListagem = () => {
        if (ListByIDSituacao) {
            return (
                ListagemPesquisa(ListFiltroID)
            )
        } else if (ListByMarcaSituacao) {
            return (
                ListagemPesquisa(ListFiltroMarca)
            )
        } else {
            console.log('else')
            return (
                Listagem()
            )
        }
    }

    const Listagem = () => {
        console.log(list)
        return (
            <TableContainer>
                <Table variant='striped' colorScheme='teal'>
                    <Thead>
                        <Tr>
                            <Th textAlign='center' w='35px' p='5px 0 5px 0'>
                                <Button onClick={() => setFiltroID(!FiltroID)}
                                    colorScheme='green' variant='link'
                                >
                                    <BsSearch />
                                </Button>{filtroID()}</Th>

                            <Th textAlign='center' w='35px' p='5px 0 5px 0'>
                                <Button onClick={() => setFiltroMarca(!FiltroMarca)}
                                    colorScheme='green' variant='link'
                                >
                                    <BsSearch />
                                </Button>{filtroMarca()}</Th>
                            <Th textAlign='center' w='35px' p='5px 0 5px 0'>Modelo</Th>
                            <Th textAlign='center' w='35px' p='5px 0 5px 0'>Serviço</Th>
                            <Th textAlign='center' w='35px' p='5px 0 5px 0'>Valor</Th>
                            <Th textAlign='center' w='35px' p='5px 0 5px 0'>Saida caixa</Th>
                            <Th textAlign='center' w='35px' p='5px 0 5px 0'>Ações</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {list.map((data: any) => {
                            return (
                                <Tr>
                                    <Td textAlign='center' p='5px 0 5px 0' w='35px'>
                                        {data.id}
                                    </Td>
                                    <Td textAlign='center' p='5px 0 5px 0' w='35px'>
                                        {data.DeviceModel.DeviceBrand.devicebrand}
                                    </Td>
                                    <Td textAlign='center' p='5px 0 5px 0' w='35px'>
                                        {data.DeviceModel.devicemodel}
                                    </Td>
                                    <Td textAlign='center' p='5px 0 5px 0' w='35px'>
                                        {data.service.service}
                                    </Td>
                                    <Td textAlign='center' p='5px 0 5px 0' w='35px'>
                                        {data.value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                                    </Td>
                                    <Td textAlign='center' p='5px 0 5px 0' w='35px'>
                                        {data.negativeValue.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                                    </Td>
                                    <Td textAlign='center' p='5px 0 5px 0'>
                                        <HStack>
                                            <Button
                                                colorScheme='green' variant='link'
                                                onClick={() => {
                                                    setDados(!Dados)
                                                    setDadosConclusao(data)
                                                    onOpen()
                                                }
                                                }
                                            >
                                                <BsCheckLg />
                                            </Button>

                                            <Button
                                                colorScheme='black' variant='link'
                                                onClick={(e) => {
                                                    setDadosEdita(!DadosEdita)
                                                    setDadosEditar(data)
                                                    onOpenEdita()
                                                }}>
                                                <BsBrush />
                                            </Button>
                                        </HStack>
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
                                            <Button
                                                colorScheme='red' variant='link'
                                                onClick={(e) => onDelete(data.id, data.client.name)}>
                                                <BsTrash />
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
        )
    }



    const ListagemPesquisa = (dados) => {
        console.log(dados)
        return (

            <TableContainer>
                <Table variant='striped' colorScheme='teal'>
                    <Thead>
                        <Tr>
                            <Th textAlign='center' w='35px' p='5px 0 5px 0'>
                                <Button onClick={() => setFiltroID(!FiltroID)}
                                    colorScheme='green' variant='link'
                                >
                                    <BsSearch />
                                </Button>{filtroID()}</Th>


                            <Th textAlign='center' w='35px' p='5px 0 5px 0'>
                                <Button onClick={() => setFiltroMarca(!FiltroMarca)}
                                    colorScheme='green' variant='link'
                                >
                                    <BsSearch />
                                </Button>{filtroMarca()}</Th>


                            <Th textAlign='center' w='35px' p='5px 0 5px 0'>Modelo</Th>
                            <Th textAlign='center' w='35px' p='5px 0 5px 0'>Serviço</Th>
                            <Th textAlign='center' w='35px' p='5px 0 5px 0'>Valor</Th>
                            <Th textAlign='center' w='35px' p='5px 0 5px 0'>Saida caixa</Th>
                            <Th textAlign='center' w='35px' p='5px 0 5px 0'>Ações</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {dados.map((dado: any) => {
                            return (
                                <Tr>
                                    <Td textAlign='center' p='5px 0 5px 0' w='35px'>
                                        {dado.id}
                                    </Td>
                                    <Td textAlign='center' p='5px 0 5px 0' w='35px'>
                                        {dado.DeviceModel.DeviceBrand.devicebrand}
                                    </Td>
                                    <Td textAlign='center' p='5px 0 5px 0' w='35px'>
                                        {dado.DeviceModel.devicemodel}
                                    </Td>
                                    <Td textAlign='center' p='5px 0 5px 0' w='35px'>
                                        {dado.service.service}
                                    </Td>
                                    <Td textAlign='center' p='5px 0 5px 0' w='35px'>
                                        {dado.value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                                    </Td>
                                    <Td textAlign='center' p='5px 0 5px 0' w='35px'>
                                        {dado.negativeValue.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                                    </Td>
                                    <Td textAlign='center' p='5px 0 5px 0'>
                                        <HStack>
                                            <Button
                                                colorScheme='green' variant='link'
                                                onClick={() => {
                                                    setDados(!Dados)
                                                    setDadosConclusao(dado)
                                                    onOpen()
                                                }
                                                }
                                            >
                                                <BsCheckLg />
                                            </Button>

                                            <Button
                                                colorScheme='black' variant='link'
                                                onClick={(e) => {
                                                    setDadosEdita(!DadosEdita)
                                                    setDadosEditar(dado)
                                                    onOpenEdita()
                                                }}>
                                                <BsBrush />
                                            </Button>
                                        </HStack>
                                        <HStack>
                                            <Button
                                                colorScheme='black' variant='link'
                                                onClick={(e) => {
                                                    setDadosVisualiza(!DadosVisualiza)
                                                    setDadosVisualizar(dado)
                                                    onOpenVisualiza()
                                                }}>
                                                <IoEyeOutline />
                                            </Button>
                                            <Button
                                                colorScheme='red' variant='link'
                                                onClick={(e) => onDelete(dado.id, dado.client.name)}>
                                                <BsTrash />
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
        )
    }


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
                {ViewListagem()}
                {/* <TableContainer>
                    <Table variant='striped' colorScheme='teal'>
                        <Thead>
                            <Tr>
                                <Th textAlign='center' w='35px' p='5px 0 5px 0'>
                                    <Button onClick={() => setFiltroID(!FiltroID)}
                                        colorScheme='green' variant='link'
                                    >
                                        <BsSearch />
                                    </Button>{filtroID()}</Th>

                                <Th textAlign='center' w='35px' p='5px 0 5px 0'>Marca</Th>
                                <Th textAlign='center' w='35px' p='5px 0 5px 0'>Modelo</Th>
                                <Th textAlign='center' w='35px' p='5px 0 5px 0'>Serviço</Th>
                                <Th textAlign='center' w='35px' p='5px 0 5px 0'>Valor</Th>
                                <Th textAlign='center' w='35px' p='5px 0 5px 0'>Saida caixa</Th>
                                <Th textAlign='center' w='35px' p='5px 0 5px 0'>Ações</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {list.map((data: any) => {
                                return (
                                    <Tr>
                                        <Td textAlign='center' p='5px 0 5px 0' w='35px'>
                                            {data.id}
                                        </Td>
                                        <Td textAlign='center' p='5px 0 5px 0' w='35px'>
                                            {data.DeviceModel.DeviceBrand.devicebrand}
                                        </Td>
                                        <Td textAlign='center' p='5px 0 5px 0' w='35px'>
                                            {data.DeviceModel.devicemodel}
                                        </Td>
                                        <Td textAlign='center' p='5px 0 5px 0' w='35px'>
                                            {data.service.service}
                                        </Td>
                                        <Td textAlign='center' p='5px 0 5px 0' w='35px'>
                                            {data.value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                                        </Td>
                                        <Td textAlign='center' p='5px 0 5px 0' w='35px'>
                                            {data.negativeValue.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                                        </Td>
                                        <Td textAlign='center' p='5px 0 5px 0'>
                                            <HStack>
                                                <Button
                                                    colorScheme='green' variant='link'
                                                    onClick={() => {
                                                        setDados(!Dados)
                                                        setDadosConclusao(data)
                                                        onOpen()
                                                    }
                                                    }
                                                >
                                                    <BsCheckLg />
                                                </Button>

                                                <Button
                                                    colorScheme='black' variant='link'
                                                    onClick={(e) => {
                                                        setDadosEdita(!DadosEdita)
                                                        setDadosEditar(data)
                                                        onOpenEdita()
                                                    }}>
                                                    <BsBrush />
                                                </Button>
                                            </HStack>
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
                                                <Button
                                                    colorScheme='red' variant='link'
                                                    onClick={(e) => onDelete(data.id, data.client.name)}>
                                                    <BsTrash />
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
                </TableContainer > */}

            </Box >
            <Modal size='xl' isOpen={isOpen} onClose={onClose}>

                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Finalizar OS nº {DadosConclusao.id}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack>
                            <Box p='5px' gap='10px' border='1px' borderRadius='8px' display='flex' flexWrap='wrap'>
                                <Box >
                                    Nome: {Dados ? DadosConclusao.client.name : ''}
                                </Box>
                                <Box >
                                    Marca: {Dados ? DadosConclusao.DeviceModel.DeviceBrand.devicebrand : ''}
                                </Box>
                                <Box >
                                    Modelo: {Dados ? DadosConclusao.DeviceModel.devicemodel : ''}
                                </Box>
                                <Box >
                                    Número: {Dados ? DadosConclusao.client.number : ''}
                                </Box>
                                <Box >
                                    CPF: {Dados ? DadosConclusao.client.CPF : ''}
                                </Box>
                                <Box >
                                    E-mail: {Dados ? DadosConclusao.client.email : ''}
                                </Box>
                                <Box >
                                    Endereço: {Dados ? DadosConclusao.client.address : ''}
                                </Box>
                                <Box >
                                    Valor: {Dados ? DadosConclusao.value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) : ''}
                                </Box>
                                <Box >
                                    Valor saída: {Dados ? DadosConclusao.negativeValue.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) : ''}
                                </Box>
                                <Box >
                                    Observações: {Dados ? DadosConclusao.observation : ''}
                                </Box>
                                <Box >
                                    Horário de saída: {Dados ? DadosConclusao.withdrawal : ''}
                                </Box>

                            </Box>
                            <Box p='5px' gap='10px' border='1px' borderRadius='8px' display='flex' flexWrap='wrap'>
                                <Box >
                                    Método de pagamento: <Select onChange={(e) => handlePaymentMethod(e)}>
                                        <option value="" disabled selected>...</option>


                                        {listPaymentsMethods.map((listPaymentMethod: any) => (
                                            <option
                                                key={listPaymentMethod.PaymentMethod_id}
                                                value={listPaymentMethod.id}>
                                                {listPaymentMethod.PaymentMethod}
                                            </option>
                                        ))}
                                    </Select>
                                </Box>
                                {RenderizaMaquinas &&
                                    <>
                                        <Box>
                                            Máquina:   <Select onChange={(e) => handleMachine(e)}>
                                                <option value="" disabled selected>Selecione...</option>

                                                {listMachines.map((listMachine: any) => (
                                                    <option
                                                        key={listMachine.machine_id}
                                                        value={listMachine.id}>
                                                        {listMachine.machine}
                                                    </option>
                                                ))}
                                            </Select>
                                        </Box>
                                        <Box>
                                            Parcelas:   <Select onChange={(e) => handleParcelas(e)}>
                                                <option value="" disabled selected>Selecione</option>
                                                <option value="1" >1x S/ Juros {DadosConclusao.value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</option>
                                                <option value="2" >2x S/ Juros {divisao2(DadosConclusao.value)}</option>
                                                <option value="3" >3x S/ Juros {divisao3(DadosConclusao.value)}</option>
                                                <option value="4" >4x S/ Juros {divisao4(DadosConclusao.value)}</option>
                                                <option value="5" >5x S/ Juros {divisao5(DadosConclusao.value)}</option>
                                                <option value="6" >6x S/ Juros {divisao6(DadosConclusao.value)}</option>
                                            </Select>
                                        </Box>
                                    </>
                                }
                            </Box>
                        </Stack>

                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={() => {
                            setDados(!Dados)
                            onClose()
                        }}>
                            Cancelar
                        </Button>
                        <Button colorScheme='green' onClick={() => {
                            setDados(!Dados)
                            ConcluiOS(DadosConclusao.id)
                        }}>Concluir OS</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Modal size='xl' isOpen={isOpenVisualiza} onClose={onCloseVisualiza}>

                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Visualizar OS nº {DadosConclusao.id}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack>
                            <Box p='5px' gap='10px' border='1px' borderRadius='8px' display='flex' flexWrap='wrap'>
                                <Box >
                                    Nome: {DadosVisualiza ? DadosVisualizar.client.name : ''}
                                </Box>
                                <Box >
                                    Marca: {DadosVisualiza ? DadosVisualizar.DeviceModel.DeviceBrand.devicebrand : ''}
                                </Box>
                                <Box >
                                    Modelo: {DadosVisualiza ? DadosVisualizar.DeviceModel.devicemodel : ''}
                                </Box>
                                <Box >
                                    Serviço: {DadosVisualiza ? DadosVisualizar.service.service : ''}
                                </Box>
                                <Box >
                                    Número: {DadosVisualiza ? DadosVisualizar.client.number : ''}
                                </Box>
                                <Box >
                                    CPF: {DadosVisualiza ? DadosVisualizar.client.CPF : ''}
                                </Box>
                                <Box >
                                    E-mail: {DadosVisualiza ? DadosVisualizar.client.email : ''}
                                </Box>
                                <Box >
                                    Endereço: {DadosVisualiza ? DadosVisualizar.client.address : ''}
                                </Box>
                                <Box >
                                    Valor: {DadosVisualiza ? DadosVisualizar.value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) : ''}
                                </Box>
                                <Box >
                                    Valor saída: {DadosVisualiza ? DadosVisualizar.negativeValue.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) : ''}
                                </Box>
                                <Box >
                                    Observações: {DadosVisualiza ? DadosVisualizar.observation : ''}
                                </Box>
                                <Box >
                                    Horário de saída: {DadosVisualiza ? DadosVisualizar.withdrawal : ''}
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
            <Modal size='xl' isOpen={isOpenEdita} onClose={onCloseEdita}>

                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Editar OS nº {DadosEditar.id}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box p='5px' gap='10px' border='1px' borderRadius='8px' display='flex' flexWrap='wrap'>
                            <Stack>
                                <Text color="#1A202C"
                                    fontWeight="bold"
                                    m='0'>*Nome:</Text>
                                <Input
                                    p='0'
                                    w='150px'
                                    textAlign='center'
                                    defaultValue={DadosEdita ? DadosEditar.client.name : ''}
                                    onChange={(e) => setNome(e.target.value)}
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
                                    {/* <option defaultValue={DadosEdita ? DadosConclusao.DeviceModel.devicebrand.devicebrand : ''} selected>{DadosEdita ? DadosConclusao.DeviceModel.DeviceBrand.devicebrand : ''}</option> */}

                                    {ListBrands.map((listBrand: any) => (
                                        <option
                                            key={listBrand.DeviceBrand_id}
                                            value={listBrand.id}>
                                            {listBrand.devicebrand}
                                        </option>
                                    ))}
                                </Select>eorders_
                            </Stack>
                            <Stack>
                                <Text
                                    color="#1A202C"
                                    fontWeight="bold"
                                    m='0'>
                                    *Modelo:
                                </Text>
                                <Select onChange={(e) => handleChangeModelo(e)}>
                                    <option defaultValue={DadosEdita ? DadosEditar.DeviceModel.devicemodel : ''} selected>{DadosEdita ? DadosEditar.DeviceModel.devicemodel : ''}</option>

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
                                    *Serviço:
                                </Text>
                                <Select onChange={(e) => handleChangeModelo(e)}>
                                    <option defaultValue={DadosEdita ? DadosEditar.service.service : ''} value="" disabled selected>{DadosEdita ? DadosEditar.service.service : ''}</option>

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
                                    *Telefone:
                                </Text>
                                <Input
                                    defaultValue={DadosEdita ? DadosEditar.client.number : ''}
                                    onChange={(e) => {
                                        handlePhone(e)
                                        setTelefone(e.target.value)
                                    }}
                                    m='0'
                                    w='150px'
                                    p='0px'
                                    textAlign='center'
                                    maxLength={15}
                                />
                            </Stack>
                            <Stack>
                                <Text
                                    color="#1A202C"
                                    fontWeight="bold"
                                    m='0'>
                                    *CPF:
                                </Text>
                                <Input
                                    maxLength={13}
                                    defaultValue={DadosEdita ? DadosEditar.client.CPF : ''}
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
                                    *E-mail:
                                </Text>
                                <Input
                                    defaultValue={DadosEdita ? DadosEditar.client.email : ''}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Stack>
                            <Stack>
                                <Text
                                    color="#1A202C"
                                    fontWeight="bold"
                                    m='0'>
                                    *Endereço:
                                </Text>
                                <Input
                                    defaultValue={DadosEdita ? DadosEditar.client.address : ''}
                                    onChange={(e) => setEndereco(e.target.value)}
                                />
                            </Stack>
                            <Stack>
                                <Text
                                    color="#1A202C"
                                    fontWeight="bold"
                                    m='0'>
                                    *Valor:
                                </Text>
                                <Input
                                    defaultValue={DadosEdita ? DadosEditar.value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) : ''}
                                    onChange={(e) => {
                                        handleChange(e)
                                    }}
                                />
                            </Stack>
                            <Stack>
                                <Text
                                    color="#1A202C"
                                    fontWeight="bold"
                                    m='0'>
                                    *Valor de saida:
                                </Text>
                                <Input
                                    placeholder={DadosEdita ? DadosEditar.negativeValue.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) : ''}
                                    onChange={(e) => {
                                        handleChangeSaida(e)
                                    }}
                                />
                            </Stack>
                            <Stack>
                                <Text
                                    color="#1A202C"
                                    fontWeight="bold"
                                    m='0'>
                                    *Observação:
                                </Text>
                                <Input
                                    defaultValue={DadosEdita ? DadosEditar.observation : ''}
                                    onChange={(e) => setObservacao(e.target.value)}
                                />
                            </Stack>
                            <Stack>
                                <Text
                                    color="#1A202C"
                                    fontWeight="bold"
                                    m='0'>
                                    *Horário de saida:
                                </Text>
                                <Input
                                    size="md"
                                    type="datetime-local"
                                    defaultValue={DadosEdita ? DadosEditar.withdrawal : ''}
                                    placeholder={DadosEdita ? DadosEditar.withdrawal : ''}
                                />
                            </Stack>


                        </Box>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={() => {
                            setDadosEdita(!DadosEdita)
                            onCloseEdita()
                        }}>
                            Fechar
                        </Button>
                        <Button colorScheme='blue' mr={3} onClick={() => {
                            setData()
                            // setDadosEdita(!DadosEdita)
                        }}>
                            Editar OS
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ListaOrdensAbertas