import { Box, Flex, Spacer, Stack, Text } from "@chakra-ui/react";
import { Link } from 'react-router-dom';
import CadastroOS from "../../component/CadastroOS/Cadastro";
import ListaOrdensAbertas from "../../component/ListaOS/ListaOrdensAbertas";
import ListaOrdensFechadas from "../../component/ListaOS/ListaOrdensFechadas";
import Sidebar from "../../component/Menu/sideBar";

function Home() {
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
            <CadastroOS />
            <Box display='flex' flexWrap='wrap'>
                <Stack ml='5px' w='660px' textAlign='center'>
                    <Link to="/Relatorio">
                        <Text color="#018700"
                            fontWeight="bold"
                            fontSize='2xl'
                            m='0'>Ordens Abertas</Text>
                    </Link>
                    <ListaOrdensAbertas />
                </Stack>
                <Spacer />
                <Stack mr='5px' w='660px' textAlign='center'>
                    <Link to="/Relatorio">
                        <Text color="#cf3800"
                            fontWeight="bold"
                            fontSize='2xl'
                            m='0'>Ordens Fechadas</Text>
                    </Link>
                    <ListaOrdensFechadas />
                </Stack>
            </Box>
        </Flex >
    )
}

export default Home