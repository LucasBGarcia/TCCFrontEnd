/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import {
    Box,
    Button,
    HStack,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
    Table,
    TableContainer,
    Tbody,
    Td,
    Tfoot,
    Th,
    Thead,
    Tr,
    useDisclosure
} from "@chakra-ui/react";
import axios from "axios";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { FcPrint } from "react-icons/fc";
import { IoEyeOutline } from "react-icons/io5";
import ImprimiOSFechada from "../Relatórios/ImprimiOSFechada";
import CalculaEntradaFechado from "../Utils/Closed/CalculaEntradaFechado";
import CalculaSaidaFechado from "../Utils/Closed/CalculaSaidaFechado";
import CalculaTotalFechado from "../Utils/Closed/CalculaTotalFechado";
import CalculaEntradaFechadoHoje from "../Utils/Closed/Hoje/CalculaEntradaFechadoHoje";
import CalculaSaidaFechadoHoje from "../Utils/Closed/Hoje/CalculaSaidaFechadoHoje";
import CalculaTotalFechadoHoje from "../Utils/Closed/Hoje/CalculaTotalFechadoHoje";


function ListaOrdensFechadas() {
    const altura = "100%";
    const largura = "100%";

    let [ListClosedOrders, setListClosedOrders] = useState<any>([]);
    let [ListClosedOrdersHoje, setListClosedOrdersHoje] = useState<any>([]);

    const [DadosVisualiza, setDadosVisualiza] = useState(false)

    let [DadosVisualizar, setDadosVisualizar] = useState<any>([]);


    const [FiltroID, setFiltroID] = useState(false)
    const [ListByIDSituacao, setListByIDSituacao] = useState(false)
    let [DadosFiltroID, setDadosFiltroID] = useState<number>(0)
    let [ListFiltroID, setListFiltroID] = useState<Object>([])

    const [buscaMarca, setBuscaMarca] = useState('')
    const [FiltroMarca, setFiltroMarca] = useState(false)
    const [ListByMarcaSituacao, setListByMarcaSituacao] = useState(false)
    let [ListFiltroMarca, setListFiltroMarca] = useState<any>([])

    const [buscaModelo, setBuscaModelo] = useState('')
    const [FiltroModelo, setFiltroModelo] = useState(false)
    const [ListByModeloSituacao, setListByModeloSituacao] = useState(false)
    let [ListFiltroModelo, setListFiltroModelo] = useState<any>([])

    const [buscaServico, setBuscaServico] = useState('')
    const [FiltroServico, setFiltroServico] = useState(false)
    const [ListByServicoSituacao, setListByServicoSituacao] = useState(false)
    let [ListFiltroServico, setListFiltroServico] = useState<any>([])

    const [buscaValor, setBuscaValor] = useState(0)
    const [FiltroValor, setFiltroValor] = useState(false)
    const [ListByValorSituacao, setListByValorSituacao] = useState(false)
    let [ListFiltroValor, setListFiltroValor] = useState<any>([])

    const [buscaValorSaida, setBuscaValorSaida] = useState(0)
    const [FiltroValorSaida, setFiltroValorSaida] = useState(false)
    const [ListByValorSaidaSituacao, setListByValorSaidaSituacao] = useState(false)
    let [ListFiltroValorSaida, setListFiltroValorSaida] = useState<any>([])


    const { isOpen: isOpenVisualiza
        , onOpen: onOpenVisualiza
        , onClose: onCloseVisualiza } = useDisclosure()


    useEffect(() => {

        const hoje = new Date()
        const hojeFormatado = format(hoje, 'dd/MM/yyyy')
        let lista: any = []
        axios.get(`http://localhost:3333/serviceorderended`)
            .then((response) => {
                response.data.map((e: any) => {
                    if (dataEntradaFormatada(e.createdAt) === hojeFormatado) {

                        lista.push(e)
                    }
                })
                setListClosedOrders(lista);
            })
    }, [])

    const dataEntradaFormatada = (data) => {
        const dataConvertida = format(new Date(data), 'dd/MM/yyyy');
        return dataConvertida
    }

    useEffect(() => {
        console.log(ListClosedOrders)
    }, [DadosVisualiza])


    const handleChangeFiltroId = (e: any) => {
        setDadosFiltroID(e.target.value)
    }
    const handleChangeFiltroMarca = (e: any) => {
        setBuscaMarca(e.target.value)
    }
    const handleChangeFiltroModelo = (e: any) => {
        setBuscaModelo(e.target.value)
    }
    const handleChangeFiltroServico = (e: any) => {
        setBuscaServico(e.target.value)
    }
    const handleChangeFiltroValor = (e: any) => {
        setBuscaValor(Number(e.target.value))
    }
    const handleChangeFiltroValorSaida = (e: any) => {
        setBuscaValorSaida(Number(e.target.value))
    }




    const filtroID = () => {
        if (FiltroID) {
            return (
                <Input
                    ml='10px'
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
                    ml='17px'
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
    const filtroModelo = () => {
        if (FiltroModelo) {
            return (
                <Input
                    ml='32px'
                    type="text"
                    p='0px'
                    textAlign='center'
                    style={{ backgroundColor: "white", opacity: "0.7", width: '50px', height: '20px' }}
                    className="form-control"
                    placeholder="Modelo"
                    onChange={handleChangeFiltroModelo}
                />
            )
        } else {
            return (
                <>
                    Modelo
                </>
            )
        }
    }
    const filtroServico = () => {
        if (FiltroServico) {
            return (
                <Input
                    ml='32px'
                    type="text"
                    p='0px'
                    textAlign='center'
                    style={{ backgroundColor: "white", opacity: "0.7", width: '50px', height: '20px' }}
                    className="form-control"
                    placeholder="Servico"
                    onChange={handleChangeFiltroServico}
                />
            )
        } else {
            return (
                <>
                    Serviço
                </>
            )
        }
    }
    const filtroValor = () => {
        if (FiltroValor) {
            return (
                <Input
                    ml='15px'
                    type="number"
                    p='0px'
                    textAlign='center'
                    style={{ backgroundColor: "white", opacity: "0.7", width: '50px', height: '20px' }}
                    className="form-control"
                    placeholder="Valor"
                    onChange={handleChangeFiltroValor}
                />
            )
        } else {
            return (
                <>
                    valor
                </>
            )
        }
    }
    const filtroValorSaida = () => {
        if (FiltroValorSaida) {
            return (
                <Input
                    ml='15px'
                    type="number"
                    p='0px'
                    textAlign='center'
                    style={{ backgroundColor: "white", opacity: "0.7", width: '50px', height: '20px' }}
                    className="form-control"
                    placeholder="saida caixa"
                    onChange={handleChangeFiltroValorSaida}
                />
            )
        } else {
            return (
                <>
                    saida caixa
                </>
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
            ListClosedOrders.map((e: any) => {
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

    useEffect(() => {
        if (FiltroMarca == false) {
            setBuscaMarca('')
            setListByMarcaSituacao(false)
        }
    }, [FiltroMarca])

    useEffect(() => {
        if (buscaMarca !== '') {
            let MarcaFiltrada = ListClosedOrders.filter((lis: any) => lis.ordemServico.DeviceModel.DeviceBrand.devicebrand.toLowerCase().includes(buscaMarca))
            setListFiltroMarca(MarcaFiltrada);
            if (MarcaFiltrada) {
                setListByMarcaSituacao(true)

            } else {
                setListByMarcaSituacao(false)

            }
        } else {
            setListFiltroMarca([]);
            setListByMarcaSituacao(false)
        }
    }, [buscaMarca])

    useEffect(() => {
        if (FiltroModelo == false) {
            setBuscaModelo('')
            setListByModeloSituacao(false)
        }
    }, [FiltroModelo])

    useEffect(() => {
        if (buscaModelo !== '') {
            let ModeloFiltrado = ListClosedOrders.filter((lis: any) => lis.ordemServico.DeviceModel.devicemodel.toLowerCase().includes(buscaModelo))
            setListFiltroModelo(ModeloFiltrado);
            if (ModeloFiltrado) {
                setListByModeloSituacao(true)

            } else {
                setListByModeloSituacao(false)

            }
        } else {
            setListFiltroModelo([]);
            setListByModeloSituacao(false)
        }
    }, [buscaModelo])

    useEffect(() => {
        if (FiltroServico == false) {
            setBuscaServico('')
            setListByServicoSituacao(false)
        }
    }, [FiltroServico])

    useEffect(() => {
        if (buscaServico !== '') {
            let ServicoFiltrado = ListClosedOrders.filter((lis: any) => lis.ordemServico.service.service.toLowerCase().includes(buscaServico))
            setListFiltroServico(ServicoFiltrado);
            if (ServicoFiltrado) {
                setListByServicoSituacao(true)

            } else {
                setListByServicoSituacao(false)

            }
        } else {
            setListFiltroServico([]);
            setListByServicoSituacao(false)
        }
    }, [buscaServico])

    useEffect(() => {
        if (FiltroValor == false) {
            setBuscaValor(0)
            setListByValorSituacao(false)
        }
    }, [FiltroValor])

    useEffect(() => {
        console.log(buscaValor)
        if (buscaValor !== 0) {
            let ValorFiltrado = ListClosedOrders.filter((lis: any) => lis.ordemServico.value.toString().includes(buscaValor))

            setListFiltroValor(ValorFiltrado);
            if (ValorFiltrado) {
                setListByValorSituacao(true)

            } else {
                setListByValorSituacao(false)

            }
        } else {
            setListFiltroValor([]);
            setListByValorSituacao(false)
        }
    }, [buscaValor])

    useEffect(() => {
        if (FiltroValorSaida == false) {
            setBuscaValorSaida(0)
            setListByValorSaidaSituacao(false)
        }
    }, [FiltroValorSaida])

    useEffect(() => {
        console.log(buscaValorSaida)
        if (buscaValorSaida !== 0) {
            let ValorSaidaFiltrado = ListClosedOrders.filter((lis: any) => lis.ordemServico.negativeValue.toString().includes(buscaValorSaida))

            setListFiltroValorSaida(ValorSaidaFiltrado);
            if (ValorSaidaFiltrado) {
                setListByValorSaidaSituacao(true)

            } else {
                setListByValorSaidaSituacao(false)

            }
        } else {
            setListFiltroValorSaida([]);
            setListByValorSaidaSituacao(false)
        }
    }, [buscaValorSaida])


    const ViewListagem = () => {
        if (ListByIDSituacao) {
            return (
                ListagemPesquisa(ListFiltroID)
            )
        } else if (ListByMarcaSituacao) {
            return (
                ListagemPesquisa(ListFiltroMarca)
            )
        } else if (ListByModeloSituacao) {
            return (
                ListagemPesquisa(ListFiltroModelo)
            )
        } else if (ListByServicoSituacao) {
            return (
                ListagemPesquisa(ListFiltroServico)
            )
        } else if (ListByValorSituacao) {
            return (
                ListagemPesquisa(ListFiltroValor)
            )
        } else if (ListByValorSaidaSituacao) {
            return (
                ListagemPesquisa(ListFiltroValorSaida)
            )
        } else {
            return (
                Listagem()
            )
        }
    }


    const Listagem = () => {
        return (
            <TableContainer>
                <Table variant='striped' colorScheme='teal'>
                    <Thead>
                        <Tr>
                            <Th textAlign='center' p='5px 0 5px 0'>
                                <Button w='18px' minW='0' onClick={() => setFiltroID(!FiltroID)}
                                    colorScheme='green' variant='link'
                                >
                                    <BsSearch />
                                </Button>{filtroID()}</Th>

                            <Th textAlign='center' w='35px' p='5px 0 5px 0'>
                                <Button w='18px' minW='0' onClick={() => setFiltroMarca(!FiltroMarca)}
                                    colorScheme='green' variant='link'
                                >
                                    <BsSearch />
                                </Button>{filtroMarca()}</Th>
                            <Th textAlign='center' w='35px' p='5px 0 5px 0'>
                                <Button w='18px' minW='0' onClick={() => setFiltroModelo(!FiltroModelo)}
                                    colorScheme='green' variant='link'
                                >
                                    <BsSearch />
                                </Button>{filtroModelo()}</Th>
                            <Th textAlign='center' w='35px' p='5px 0 5px 0'>
                                <Button w='18px' minW='0' onClick={() => setFiltroServico(!FiltroServico)}
                                    colorScheme='green' variant='link'
                                >
                                    <BsSearch />
                                </Button>{filtroServico()}</Th>
                            <Th textAlign='center' w='35px' p='5px 0 5px 0'>
                                <Button w='18px' minW='0' onClick={() => setFiltroValor(!FiltroValor)}
                                    colorScheme='green' variant='link'
                                >
                                    <BsSearch />
                                </Button>{filtroValor()}</Th>
                            <Th textAlign='center' w='35px' p='5px 0 5px 0'>
                                <Button w='18px' minW='0' onClick={() => setFiltroValorSaida(!FiltroValorSaida)}
                                    colorScheme='green' variant='link'
                                >
                                    <BsSearch />
                                </Button>{filtroValorSaida()}</Th>
                            <Th textAlign='center' w='35px' p='5px 0 5px 0'>Ações</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {ListClosedOrders.map((data: any) => {
                            return (
                                <Tr>
                                    <Td textAlign='center' p='5px 0 5px 0' w='35px'>
                                        {data.ordemServico.id}
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
                                                w='18px' minW='0'
                                                colorScheme='green' variant='link'
                                                onClick={() => {
                                                    ImprimiOSFechada(data)
                                                }
                                                }
                                            >

                                                <FcPrint />
                                            </Button>
                                            <Button
                                                w='18px' minW='0'
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
                            <Th colSpan={2} textColor='green' textAlign='center' p='5px 0 5px 0' w='35px'>{CalculaEntradaFechadoHoje()}</Th>
                            <Th colSpan={2} textColor='red' textAlign='center' p='5px 0 5px 0' w='35px'>{CalculaSaidaFechadoHoje()}</Th>
                            <Th colSpan={2} textAlign='center' p='5px 0 5px 0' w='35px'>{CalculaTotalFechadoHoje()}</Th>

                        </Tr>
                    </Tfoot>
                </Table>
            </TableContainer >
        )
    }



    const ListagemPesquisa = (dados) => {
        return (

            <TableContainer>
                <Table variant='striped' colorScheme='teal'>
                    <Thead>
                        <Tr>
                            <Th textAlign='center' w='35px' p='5px 0 5px 0'>
                                <Button w='18px' minW='0' onClick={() => setFiltroID(!FiltroID)}
                                    colorScheme='green' variant='link'
                                >
                                    <BsSearch />
                                </Button>{filtroID()}</Th>


                            <Th textAlign='center' w='35px' p='5px 0 5px 0'>
                                <Button w='18px' minW='0' onClick={() => setFiltroMarca(!FiltroMarca)}
                                    colorScheme='green' variant='link'
                                >
                                    <BsSearch />
                                </Button>{filtroMarca()}</Th>

                            <Th textAlign='center' w='35px' p='5px 0 5px 0'>
                                <Button w='18px' minW='0' onClick={() => setFiltroModelo(!FiltroModelo)}
                                    colorScheme='green' variant='link'
                                >
                                    <BsSearch />
                                </Button>{filtroModelo()}</Th>
                            <Th textAlign='center' w='35px' p='5px 0 5px 0'>
                                <Button w='18px' minW='0' onClick={() => setFiltroServico(!FiltroServico)}
                                    colorScheme='green' variant='link'
                                >
                                    <BsSearch />
                                </Button>{filtroServico()}</Th>
                            <Th textAlign='center' w='35px' p='5px 0 5px 0'>
                                <Button w='18px' minW='0' onClick={() => setFiltroValor(!FiltroValor)}
                                    colorScheme='green' variant='link'
                                >
                                    <BsSearch />
                                </Button>{filtroValor()}</Th>
                            <Th textAlign='center' w='35px' p='5px 0 5px 0'>
                                <Button w='18px' minW='0' onClick={() => setFiltroValorSaida(!FiltroValorSaida)}
                                    colorScheme='green' variant='link'
                                >
                                    <BsSearch />
                                </Button>{filtroValorSaida()}</Th>
                            <Th textAlign='center' w='35px' p='5px 0 5px 0'>Ações</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {dados.map((dado: any) => {
                            return (
                                <Tr>
                                    <Td textAlign='center' p='5px 0 5px 0' w='35px'>
                                        {dado.ordemServico.id}
                                    </Td>
                                    <Td textAlign='center' p='5px 0 5px 0' w='35px'>
                                        {dado.ordemServico.DeviceModel.DeviceBrand.devicebrand}
                                    </Td>
                                    <Td textAlign='center' p='5px 0 5px 0' w='35px'>
                                        {dado.ordemServico.DeviceModel.devicemodel}
                                    </Td>
                                    <Td textAlign='center' p='5px 0 5px 0' w='35px'>
                                        {dado.ordemServico.service.service}
                                    </Td>
                                    <Td textAlign='center' p='5px 0 5px 0' w='35px'>
                                        {dado.ordemServico.value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                                    </Td>
                                    <Td textAlign='center' p='5px 0 5px 0' w='35px'>
                                        {dado.ordemServico.negativeValue.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                                    </Td>
                                    <Td textAlign='center' p='5px 0 5px 0'>
                                        <HStack>
                                            <Button
                                                w='18px' minW='0'
                                                colorScheme='green' variant='link'
                                                onClick={() => {
                                                    ImprimiOSFechada(dado)
                                                }
                                                }
                                            >

                                                <FcPrint />
                                            </Button>
                                            <Button
                                                w='18px' minW='0'
                                                colorScheme='black' variant='link'
                                                onClick={(e) => {
                                                    setDadosVisualiza(!DadosVisualiza)
                                                    setDadosVisualizar(dado)
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
                            <Th colSpan={2} textColor='green' textAlign='center' p='5px 0 5px 0' w='35px'>{CalculaEntradaFechadoHoje()}</Th>
                            <Th colSpan={2} textColor='red' textAlign='center' p='5px 0 5px 0' w='35px'>{CalculaSaidaFechadoHoje()}</Th>
                            <Th colSpan={2} textAlign='center' p='5px 0 5px 0' w='35px'>{CalculaTotalFechadoHoje()}</Th>

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

            </Box >

            <Modal size='xl' isOpen={isOpenVisualiza} onClose={onCloseVisualiza}>

                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Visualizar OS nº {DadosVisualiza ? DadosVisualizar.ordemServico.id : ''}</ModalHeader>
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