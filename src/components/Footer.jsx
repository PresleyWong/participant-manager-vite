import React from "react";
import {
  Flex,
  Box,
  Container,
  Stack,
  Text,
  useColorModeValue,
  Center,
} from "@chakra-ui/react";

const Footer = () => {
  const d = new Date();
  let year = d.getFullYear();

  return (
    <footer className="footer-bottom">
      <Flex
        bg={useColorModeValue("primary.30", "primary.20")}
        color={useColorModeValue("primary.100", "primary.80")}
      >
        <Container as={Stack} maxW={"6xl"} py={4}>
          <Center>
            <Text>© {year} All rights reserved</Text>
          </Center>
        </Container>
      </Flex>
    </footer>
  );
};

export default Footer;
