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
import { BsBrush, BsCheckLg, BsSearch, BsTrash } from "react-icons/bs";
import { useEffect, useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { FcPrint } from "react-icons/fc";
import api from "../../api";
import CalculaEntradaAberto from "../Utils/Opened/CalculaEntradaAberto";
import CalculaSaidaAberto from "../Utils/Opened/CalculaSaidaAberto";
import CalculaTotalAberto from "../Utils/Opened/CalculaTotalAberto";
import { format } from 'date-fns';
import ImprimiOSFechada from "../Relatórios/ImprimiOSFechada";
import CalculaEntradaFechado from "../Utils/Closed/CalculaEntradaFechado";
import CalculaSaidaFechado from "../Utils/Closed/CalculaSaidaFechado";
import CalculaTotalFechado from "../Utils/Closed/CalculaTotalFechado";
import CalculaTotalFechadoStone from "../Utils/Closed/Hoje/FormasPagamento/CalculaTotalFechadoStone";
import CalculaTotalFechadoDinheiro from "../Utils/Closed/Hoje/FormasPagamento/CalculaTotalFechadoDinheiro";
import CalculaTotalFechadoBanriCompras from "../Utils/Closed/Hoje/FormasPagamento/CalculaTotalFechadoBanriCompras";
import CalculaTotalFechadoAlelo from "../Utils/Closed/Hoje/FormasPagamento/CalculaTotalFechadoAlelo";
//import { Button } from "semantic-ui-react";


function ListaFechadas() {

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

    const [buscaCliente, setBuscaCliente] = useState('')
    const [FiltroCliente, setFiltroCliente] = useState(false)
    const [ListByClienteSituacao, setListByClienteSituacao] = useState(false)
    let [ListFiltroCliente, setListFiltroCliente] = useState<any>([])

    const [buscaEntrada, setBuscaEntrada] = useState<any>('')
    const [FiltroEntrada, setFiltroEntrada] = useState(false)
    const [ListByEntradaSituacao, setListByEntradaSituacao] = useState(false)
    let [ListFiltroEntrada, setListFiltroEntrada] = useState<any>([])

    const [buscaSaida, setBuscaSaida] = useState<any>('')
    const [FiltroSaida, setFiltroSaida] = useState(false)
    const [ListBySaidaSituacao, setListBySaidaSituacao] = useState(false)
    let [ListFiltroSaida, setListFiltroSaida] = useState<any>([])

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
    const handleChangeFiltroCliente = (e: any) => {
        setBuscaCliente(e.target.value)
    }
    const handleChangeFiltroEntrada = (e: any) => {
        setBuscaEntrada(e.target.value)
    }
    const handleChangeFiltroSaida = (e: any) => {
        setBuscaSaida(e.target.value)
    }

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
            })
    }, [])
    useEffect(() => {
        axios.get(`http://localhost:3333/serviceorder`)
            .then((response) => {
                setList(response.data);
                console.log(response.data)
            })
    }, [])

    const onDelete = (id: any, name: any) => {
        var result = window.confirm(`Deseja deletar OS ${name}?`)
        if (result === true) {
            axios.delete(`http://localhost:3333/${id}/serviceorder`)
            // window.location.reload();
        }
    }

    useEffect(() => {
        axios.get(`http://localhost:3333/paymentmethods`)
            .then((response) => {
                setListPaymentsMethods(response.data);
            })
    }, [])
    useEffect(() => {
        axios.get(`http://localhost:3333/machines`)
            .then((response) => {
                setListMachines(response.data);
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
    const dataEntradaFormatada = (data) => {
        const dataConvertida = format(new Date(data), 'dd/MM/yyyy HH:mm');
        return dataConvertida
    }

    const filtroID = () => {
        if (FiltroID) {
            return (
                <Input
                    justifyContent='center'
                    m='auto'
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
                    justifyContent='center'
                    m='auto'
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
                    justifyContent='center'
                    m='auto'
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
                    justifyContent='center'
                    m='auto'
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
                    justifyContent='center'
                    m='auto'
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
                    justifyContent='center'
                    m='auto'
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
    const filtroCliente = () => {
        if (FiltroCliente) {
            return (
                <Input
                    justifyContent='center'
                    m='auto'
                    type="text"
                    p='0px'
                    textAlign='center'
                    style={{ backgroundColor: "white", opacity: "0.7", width: '50px', height: '20px' }}
                    className="form-control"
                    placeholder="Cliente"
                    onChange={handleChangeFiltroCliente}
                />
            )
        } else {
            return (
                <>
                    Cliente
                </>
            )
        }
    }
    const filtroEntrada = () => {
        if (FiltroEntrada) {
            return (
                <Input
                    justifyContent='center'
                    m='auto'
                    type="date"
                    p='0px'
                    textAlign='center'
                    style={{ backgroundColor: "white", opacity: "0.7", width: '20px', height: '20px' }}
                    className="form-control"
                    onBlur={handleChangeFiltroEntrada}
                />
            )
        } else {
            return (
                <>
                    Entrada
                </>
            )
        }
    }
    const filtroSaida = () => {
        if (FiltroSaida) {
            return (
                <Input
                    justifyContent='center'
                    m='auto'
                    type="date"
                    p='0px'
                    textAlign='center'
                    style={{ backgroundColor: "white", opacity: "0.7", width: '20px', height: '20px' }}
                    className="form-control"
                    onBlur={handleChangeFiltroSaida}
                />
            )
        } else {
            return (
                <>
                    Prev. Retirada
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
    let buscaID = []
    useEffect(() => {
        if (DadosFiltroID !== 0) {
            let ValorIDFiltrado = ListClosedOrders.filter((lis: any) => lis.id.toString().includes(DadosFiltroID))

            setListFiltroID(ValorIDFiltrado);
            if (ValorIDFiltrado) {
                setListByIDSituacao(true)

            } else {
                setListByIDSituacao(false)
                setListFiltroID([]);
            }
        } else {
            setListFiltroID([]);
            setListByIDSituacao(false)
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
                setListFiltroMarca([]);
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
                setListFiltroModelo([]);
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
                setListFiltroServico([]);
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
        if (buscaValor !== 0) {
            let ValorFiltrado = ListClosedOrders.filter((lis: any) => lis.ordemServico.value.toString().includes(buscaValor))

            setListFiltroValor(ValorFiltrado);
            if (ValorFiltrado) {
                setListByValorSituacao(true)

            } else {
                setListByValorSituacao(false)
                setListFiltroValor([]);
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
        if (buscaValorSaida !== 0) {
            let ValorSaidaFiltrado = ListClosedOrders.filter((lis: any) => lis.ordemServico.negativeValue.toString().includes(buscaValorSaida))

            setListFiltroValorSaida(ValorSaidaFiltrado);
            if (ValorSaidaFiltrado) {
                setListByValorSaidaSituacao(true)

            } else {
                setListByValorSaidaSituacao(false)
                setListFiltroValorSaida([]);
            }
        } else {
            setListFiltroValorSaida([]);
            setListByValorSaidaSituacao(false)
        }
    }, [buscaValorSaida])
    useEffect(() => {
        if (FiltroCliente == false) {
            setBuscaCliente('')
            setListByClienteSituacao(false)
        }
    }, [FiltroCliente])

    useEffect(() => {
        if (buscaCliente !== '') {
            let ClienteFiltrado = ListClosedOrders.filter((lis: any) => lis.ordemServico.client.name.toLowerCase().includes(buscaCliente))
            setListFiltroCliente(ClienteFiltrado);
            if (ClienteFiltrado) {
                setListByClienteSituacao(true)

            } else {
                setListByClienteSituacao(false)
                setListFiltroCliente([]);
            }
        } else {
            setListFiltroCliente([]);
            setListByClienteSituacao(false)
        }
    }, [buscaCliente])

    let Entrada: any = []

    useEffect(() => {
        if (FiltroEntrada == false) {
            setBuscaEntrada('')
            Entrada = []
            setListByEntradaSituacao(false)
        }
    }, [FiltroEntrada])


    useEffect(() => {

        if (buscaEntrada) {
            ListClosedOrders.map((lis: any) => {
                if (lis.ordemServico.createdAt.includes(buscaEntrada)) {
                    Entrada.push(lis)
                }
            })
            setListFiltroEntrada(Entrada)
            if (buscaEntrada) {
                setListByEntradaSituacao(true)

            } else {
                setListByEntradaSituacao(false)
                setListFiltroEntrada([]);
            }
        } else {
            setListFiltroEntrada([]);
            setListByEntradaSituacao(false)
        }
    }, [buscaEntrada])


    let Saida: any = []

    useEffect(() => {
        if (FiltroSaida == false) {
            setBuscaSaida('')
            Saida = []
            setListBySaidaSituacao(false)
        }
    }, [FiltroSaida])

    useEffect(() => {
        if (buscaSaida) {
            ListClosedOrders.map((lis: any) => {
                if (lis.ordemServico.createdAt.includes(buscaSaida)) {
                    Saida.push(lis)
                }
            })
            setListFiltroSaida(Saida)
            if (buscaSaida) {
                setListBySaidaSituacao(true)

            } else {
                setListBySaidaSituacao(false)
                setListFiltroSaida([]);
            }
        } else {
            setListFiltroSaida([]);
            setListBySaidaSituacao(false)
        }
    }, [buscaSaida])

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
        } else if (ListByClienteSituacao) {
            return (
                ListagemPesquisa(ListFiltroCliente)
            )
        } else if (ListByEntradaSituacao) {
            return (
                ListagemPesquisa(ListFiltroEntrada)
            )
        } else if (ListBySaidaSituacao) {
            return (
                ListagemPesquisa(ListFiltroSaida)
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
                                <Button w='18px' minW='0' onClick={() => setFiltroCliente(!FiltroCliente)}
                                    colorScheme='green' variant='link'
                                >
                                    <BsSearch />
                                </Button>{filtroCliente()}</Th>

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
                            <Th textAlign='center' w='35px' p='5px 0 5px 0'>
                                <Button w='18px' minW='0' onClick={() => setFiltroEntrada(!FiltroEntrada)}
                                    colorScheme='green' variant='link'
                                >
                                    <BsSearch />
                                </Button>{filtroEntrada()}</Th>
                            <Th textAlign='center' w='35px' p='5px 0 5px 0'>
                                <Button w='18px' minW='0' onClick={() => setFiltroSaida(!FiltroSaida)}
                                    colorScheme='green' variant='link'
                                >
                                    <BsSearch />
                                </Button>{filtroSaida()}</Th>
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
                                        {data.ordemServico.client.name}
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
                                    <Td textAlign='center' p='5px 0 5px 0' w='35px'>
                                        {dataEntradaFormatada(data.ordemServico.createdAt)}
                                    </Td>
                                    <Td textAlign='center' p='5px 0 5px 0' w='35px'>
                                        {dataEntradaFormatada(data.ordemServico.withdrawal)}
                                    </Td>
                                    <Td textAlign='center' p='5px 0 5px 0'>
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
                                            colorScheme='black' variant='link'
                                            onClick={(e) => {
                                                setDadosVisualiza(!DadosVisualiza)
                                                setDadosVisualizar(data)
                                                onOpenVisualiza()
                                            }}>
                                            <IoEyeOutline />
                                        </Button>
                                        <Button
                                            w='18px' minW='0'
                                            colorScheme='red' variant='link'
                                            onClick={(e) => onDelete(data.ordemServico.id, data)}>
                                            <BsTrash />
                                        </Button>

                                    </Td>
                                </Tr>
                            )
                        })}
                    </Tbody>
                    <Tfoot>
                        <Tr>
                            <Th colSpan={3} textColor='green' textAlign='center' p='5px 0 5px 0' w='35px'>{CalculaEntradaFechado()}</Th>
                            <Th colSpan={3} textColor='red' textAlign='center' p='5px 0 5px 0' w='35px'>{CalculaSaidaFechado()}</Th>
                            <Th colSpan={3} textAlign='center' p='5px 0 5px 0' w='35px'>{CalculaTotalFechado()}</Th>

                        </Tr>
                        <Tr>
                            <Th colSpan={5} textAlign='center' p='5px 0 5px 0' w='35px'>{CalculaTotalFechadoStone()}</Th>
                            <Th colSpan={5} textAlign='center' p='5px 0 5px 0' w='35px'>{CalculaTotalFechadoDinheiro()}</Th>
                        </Tr>
                        <Tr>
                            <Th colSpan={5} textAlign='center' p='5px 0 5px 0' w='35px'>{CalculaTotalFechadoBanriCompras()}</Th>
                            <Th colSpan={5} textAlign='center' p='5px 0 5px 0' w='35px'>{CalculaTotalFechadoAlelo()}</Th>
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
                                <Button w='18px' minW='0' onClick={() => setFiltroCliente(!FiltroCliente)}
                                    colorScheme='green' variant='link'
                                >
                                    <BsSearch />
                                </Button>{filtroCliente()}</Th>

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
                            <Th textAlign='center' w='35px' p='5px 0 5px 0'>
                                <Button w='18px' minW='0' onClick={() => setFiltroEntrada(!FiltroEntrada)}
                                    colorScheme='green' variant='link'
                                >
                                    <BsSearch />
                                </Button>{filtroEntrada()}</Th>
                            <Th textAlign='center' w='35px' p='5px 0 5px 0'>Prev. Retirada</Th>
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
                                        {dado.ordemServico.client.name}
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
                                    <Td textAlign='center' p='5px 0 5px 0' w='35px'>
                                        {dataEntradaFormatada(dado.ordemServico.createdAt)}
                                    </Td>
                                    <Td textAlign='center' p='5px 0 5px 0' w='35px'>
                                        {dataEntradaFormatada(dado.ordemServico.withdrawal)}
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
                            <Th colSpan={3} textColor='green' textAlign='center' p='5px 0 5px 0' w='35px'>{CalculaEntradaFechado()}</Th>
                            <Th colSpan={3} textColor='red' textAlign='center' p='5px 0 5px 0' w='35px'>{CalculaSaidaFechado()}</Th>
                            <Th colSpan={3} textAlign='center' p='5px 0 5px 0' w='35px'>{CalculaTotalFechado()}</Th>

                        </Tr>
                        <Tr>
                            <Th colSpan={5} textAlign='center' p='5px 0 5px 0' w='35px'>{CalculaTotalFechadoStone()}</Th>
                            <Th colSpan={5} textAlign='center' p='5px 0 5px 0' w='35px'>{CalculaTotalFechadoDinheiro()}</Th>
                        </Tr>
                        <Tr>
                            <Th colSpan={5} textAlign='center' p='5px 0 5px 0' w='35px'>{CalculaTotalFechadoBanriCompras()}</Th>
                            <Th colSpan={5} textAlign='center' p='5px 0 5px 0' w='35px'>{CalculaTotalFechadoAlelo()}</Th>
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
                                    Horário de saída: {DadosVisualiza ? dataEntradaFormatada(DadosVisualizar.ordemServico.withdrawal) : ''}
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

export default ListaFechadas