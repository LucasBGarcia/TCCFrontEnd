import { Box, Flex, Spacer, Stack, Text } from "@chakra-ui/react";
import { Link } from 'react-router-dom';
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
            <Box display='flex' flexWrap='wrap'>
                <Stack ml='5px' w='660px' textAlign='center'>

                    <ListaAbertas />
                </Stack>
                <Spacer />
                <Stack mr='5px' w='660px' textAlign='center'>

                    <ListaFechadas />
                </Stack>
            </Box>
        </Flex >
    )
}

export default Relatorio