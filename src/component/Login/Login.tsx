import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import api from '../../api';
import Sidebar from '../Menu/sideBar';

export default function Login() {

    const [Email, setEmail] = useState('')
    const [Senha, setSenha] = useState('')

    const usenavigate = useNavigate()
    localStorage.clear();
    type data = {
        email: string,
        password: string
    }


    const login = async () => {

        const User: data = {
            email: Email,
            password: Senha
        }
        await api.post("login", User).then((response) => {

            if (response.status === 200) {
                toast.success(`${response.data.name}, Bem-vindo!.`)
                localStorage.setItem("sipToken", response.data.token);
                localStorage.setItem("sipUser", JSON.stringify(User));
                localStorage.setItem("sipID", response.data.id);
                usenavigate("/home")
            }
        }).catch((e) => {
            toast.error('Email ou senha inválidos.')
            console.log(e.response.data);
        })

    }

    return (
        <>
            <Sidebar />
            <Flex
                minH={'auto'}
                align={'center'}
                justify={'center'}
            >
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'}>Login</Heading>
                    </Stack>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.900')}
                        boxShadow={'lg'}
                        p={8}>
                        <Stack spacing={4}>
                            <FormControl id="email">
                                <FormLabel>Email </FormLabel>
                                <Input type="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </FormControl>
                            <FormControl id="password">
                                <FormLabel>Senha</FormLabel>
                                <Input type="password" onChange={(e) => setSenha(e.target.value)} />
                            </FormControl>
                            <Stack spacing={10}>

                                <Button
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}
                                    onClick={(e) => login()}
                                >
                                    Sign in
                                </Button>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
            <ToastContainer />
        </>
    );
}