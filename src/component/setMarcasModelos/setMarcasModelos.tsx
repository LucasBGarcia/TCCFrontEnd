import { Box, Button, Center, Flex, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Spacer, Stack, Text, useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import api from "../../api";
import { TextArea } from "semantic-ui-react";
import Cliente from "../modal/Cliente";
import { BsSearch, BsTrash } from "react-icons/bs";
import Sidebar from "../Menu/sideBar";


function SetMarcasModelos() {

    let [ListModelos, setListModelos] = useState<any>([]);
    let [ListMarcas, setListMarcas] = useState<any>([]);
    let [NovaMarca, setNovaMarca] = useState<any>('');
    let [NovoModelo, setNovoModelo] = useState<any>('');
    let [MarcaID, setMarcaID] = useState<any>(0)

    useEffect(() => {
        axios.get(`https://easycaixa.onrender.com/devicebrands`)
            .then((response) => {
                setListMarcas(response.data);
            })
    }, [])
    useEffect(() => {
        axios.get(`https://easycaixa.onrender.com/devicemodels`)
            .then((response) => {
                setListModelos(response.data);
            })
    }, [])

    const onDelete = (id: any, name: any) => {
        var result = window.confirm(`Deseja deletar Marca ${name}?`)
        if (result === true) {
            axios.delete(`https://easycaixa.onrender.com/${id}/devicebrands`)
            window.location.reload();
        }
    }
    const onDeleteModelo = (id: any, name: any) => {
        var result = window.confirm(`Deseja deletar Modelo ${name}?`)
        if (result === true) {
            axios.delete(`https://easycaixa.onrender.com/${id}/devicemodels`)
            window.location.reload();
        }
    }

    function ListaModelos() {
        return (
            <Box>
                {ListMarcas.map((listMarca: any) => {
                    return (
                        <HStack mt='5px'>
                            <Text
                                color="black"
                                fontWeight="bold"
                                fontSize='lg'
                                mt='0'
                                mb='0'>
                                <Button
                                    w='18px' minW='0'
                                    colorScheme='red' variant='link'
                                    onClick={(e) => onDelete(listMarca.id, listMarca.devicebrand)}>
                                    <BsTrash />
                                </Button> {listMarca.devicebrand}:
                            </Text>
                            <Box
                            >
                                {ListModelos.map((ListModelo: any) => {
                                    if (listMarca.id === ListModelo.DeviceBrand_id) {
                                        return (
                                            <Box p='0px 2px 0px 2px'
                                                borderRadius='3px'
                                                border='1px'
                                                fontSize='md'
                                                ml='auto'
                                                mb='0'>
                                                <Button
                                                    w='18px' minW='0'
                                                    colorScheme='red' variant='link'
                                                    onClick={(e) => onDeleteModelo(ListModelo.id, ListModelo.devicemodel)}>
                                                    <BsTrash />
                                                </Button>
                                                {ListModelo.devicemodel}</Box>
                                        );
                                    }
                                    return null;
                                })}
                            </Box>
                        </HStack>
                    );
                })
                }
            </Box >
        );
    }
    type data = {
        devicebrand: string
    }

    const SalvarMarca = async () => {
        const newMarca: data = {
            devicebrand: NovaMarca,
        }
        try {
            await api.post("devicebrands", newMarca)
            setNovaMarca('')
        } catch (error: any) {
            console.log(error.response.data);
            alert(error.response.data)
        }
    }

    type dataModelo = {
        DeviceBrand_id: number,
        devicemodel: string
    }

    const SalvarModelo = async () => {
        const newModelo: dataModelo = {
            DeviceBrand_id: MarcaID,
            devicemodel: NovoModelo,
        }
        try {
            await api.post("devicemodels", newModelo)
            setNovoModelo('')
        } catch (error: any) {
            console.log(error.response.data);
            alert(error.response.data)
        }
    }

    function CadastrarMarca() {
        return (
            <Stack>
                <Box gap='5px' display='flex' flexWrap='wrap'>
                    <Text color="black"
                        fontWeight="bold"
                        justifyContent='center'
                        fontSize='lg'>Nova Marca
                    </Text>
                    <Input w='150px' value={NovaMarca}
                        onChange={(e) => setNovaMarca(e.target.value)}
                    />
                    <Button onClick={(e) => SalvarMarca()}>Salvar marca</Button>
                </Box>
                <Box gap='5px' display='flex' flexWrap='wrap'>
                    <Text
                        alignSelf='center'
                        color="black"
                        fontWeight="bold"
                        fontSize='lg'>Novo Modelo
                    </Text>
                    <Select
                        w='auto'
                        onChange={(e) => setMarcaID(e.target.value)}
                    >
                        <option value="" disabled selected>
                            Selecione
                        </option>
                        {ListMarcas.map((listaMarca: any) => (
                            <option
                                value={listaMarca.id}>
                                {listaMarca.devicebrand}
                            </option>
                        ))}
                    </Select>
                    <Input w='150px' value={NovoModelo}
                        onChange={(e) => setNovoModelo(e.target.value)}
                    />
                    <Button onClick={(e) => SalvarModelo()}>Salvar modelo</Button>
                </Box>
            </Stack >
        )
    }


    return (
        <Flex
            flex="1"
            h="100%"
            w="100%"
            minH="100vh"
            minW="100vw"
            flexDirection="column"
            backgroundSize="cover"
            bgColor='white'
            backgroundRepeat="no-repeat"
            backgroundPosition="center"
            //alignItems="center"
            backgroundClip="padding-box"
            overflowX="hidden"
        // justifyContent="center"
        >
            <Sidebar />
            <Box gap='30px' justifyContent='center' display='flex' flexWrap='wrap'>

                <Box
                    justifyContent='center' display='flex' flexWrap='wrap'
                    mt='10px' backgroundColor='#929292'
                    w="40%"
                    borderRadius='10px'>
                    <Stack>
                        <Text color="black"
                            fontWeight="bold"
                            fontSize='2xl'
                            m='0'>Cadastrados</Text>
                        <Stack>
                            {ListaModelos()}

                        </Stack>
                    </Stack>
                </Box>
                <Center
                    display='flex' flexWrap='wrap'
                    mt='10px'
                    backgroundColor='#929292'
                    w="40%"
                    borderRadius='10px'>
                    <Box >
                        <Text
                            alignSelf='center'
                            color="black"
                            fontWeight="bold"
                            fontSize='2xl'
                            m='0'>Cadastrar</Text>
                        {CadastrarMarca()}
                    </Box>
                </Center>
            </Box>
        </Flex >
    )
}

export default SetMarcasModelos;