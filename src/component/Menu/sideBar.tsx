/* eslint-disable spaced-comment */
/// <reference types="react-scripts" />
import { Box, Button, Center, HStack, Image, Spacer, Text } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { IconContext } from "react-icons/lib";
import logo from './logo.png'
import { Link } from 'react-router-dom';
import { MenuContext } from "../../context/MenuContext";


const Sidebar = () => {



  const getUser = () => {
    if (localStorage.getItem("sipUser") != null) {
      var user = JSON.parse(localStorage.getItem("sipUser")!);
    }

    if (user != null) return true;

  };

  const [userLogged, setuserLogged] = useState(getUser());



  return (
    <>

      <HStack
        backgroundColor='#929292'
        w="100%"
        h='40px'
        borderBottomRadius='10px'
        gap='15px' >

        {userLogged ? (
          <>

            <Link to="/home">
              <Image
                justifyContent='center' m='auto'
                marginStart='70px'
                w='100px'
                h='30px'
                src={logo}
              />
            </Link>
          </>
        ) : (
          <>
            <Link to="/">
              <Image
                justifyContent='center' m='auto'
                marginStart='70px'
                w='100px'
                h='30px'
                src={logo}
              />
            </Link>
          </>
        )}

        {userLogged ? (

          <>
            <Box width='auto' p='0px 5px 0px 5px' backgroundColor='#FFA500' borderRadius='10px' _hover={{ background: "#FF8C00" }}>
              <Link to='/setMarcasModelos'>
                <Text justifyContent='center' m='auto' fontWeight='bold'  >Cadastro de marcas e modelos</Text>
              </Link>
            </Box>
            <Box width='auto' p='0px 5px 0px 5px' backgroundColor='#FFA500' borderRadius='10px' _hover={{ background: "#FF8C00" }}>
              <Link to='/chart'>
                <Text justifyContent='center' m='auto' textAlign='center' fontWeight='bold' >Gráfico</Text>
              </Link>
            </Box>
            <Spacer />
            <Box width='auto' p='0px 5px 0px 5px' backgroundColor='#FFA500' borderRadius='10px' _hover={{ background: "#FF8C00" }}>
              <Link to='/'>
                <Text justifyContent='center' m='auto' textAlign='center' fontWeight='bold'  >Logout</Text>
              </Link>
            </Box>
            <Box></Box>
          </>

        ) : (
          ''
        )}

      </HStack>

    </>
  );
};

export default Sidebar;
