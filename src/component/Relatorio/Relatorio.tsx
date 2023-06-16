import { Flex, Stack, Text } from "@chakra-ui/react";
import Sidebar from "../../component/Menu/sideBar";
import ListaAbertas from "./ListaAbertas";
import ListaFechadas from "./ListaFechadas";

function Relatorio() {
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
            <Stack>
                <Stack alignSelf='center' w='95%' textAlign='center'>
                    <Text color="#018700"
                        fontWeight="bold"
                        fontSize='2xl'
                        m='0'>Ordens Abertas</Text>
                    <ListaAbertas />
                </Stack>
                <Stack alignSelf='center' w='95%' textAlign='center'>
                    <Text color="#cf3800"
                        fontWeight="bold"
                        fontSize='2xl'
                        m='0'>Ordens Fechadas</Text>
                    <ListaFechadas />
                </Stack>
            </Stack>
        </Flex >
    )
}

export default Relatorio