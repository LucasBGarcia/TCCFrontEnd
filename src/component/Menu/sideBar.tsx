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


  let { menuOpen, setMenuOpen } = useContext(MenuContext);

  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const getUser = () => {
    if (localStorage.getItem("user") != null) {
      var user = JSON.parse(localStorage.getItem("user")!);
    }

    if (user != null) return user.isLogged;
  };

  const [userLogged, setuserLogged] = useState(getUser());
  useEffect(() => {
    setMenuOpen(sidebar);
  }, [sidebar]);

  const [isHovering, setHovering] = useState("");

  // function handleMouseEnter() {
  //   setHovering(true);
  // }
  // function handleMouseLeave() {
  //   setHovering(false);
  // }

  return (
    <>
      <Box
        backgroundColor='#929292'
        w="100%"
        h='40px'
        borderBottomRadius='10px'
      >
        <HStack justifyContent='center' >
          <Link to="/home">
            <Image
              ml='100px'
              w='100px'
              h='30px'
              src={logo}
            />
          </Link>
          <Box ml='15px'>
            <Link to='/setMarcasModelos'>
              <Text>Cadastro de marcas e modelos</Text>
            </Link>
          </Box>
          <Spacer />
          <Box  >
            <Link to='/'>
              <Text  >Logout</Text>
            </Link>
          </Box>
        </HStack>
      </Box>
    </>
  );
};

export default Sidebar;
