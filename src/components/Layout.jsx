import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Container, Box, Flex, useColorModeValue } from "@chakra-ui/react";

const Layout = (props) => {
  return (
    <Flex
      direction="column"
      justify="space-between"
      bg={useColorModeValue("neutral.99", "neutral.10")}
      minH={"100vh"}
    >
      <Header />
      <Container maxW={"1200px"} my={5} marginInline="auto" centerContent>
        {props.children}
      </Container>
      <Footer />
    </Flex>
  );
};

export default Layout;
