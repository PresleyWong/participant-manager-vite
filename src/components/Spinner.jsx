import { Spinner as ChakraSpinner, Box } from "@chakra-ui/react";

const Spinner = () => {
  return (
    <Box position="absolute" top="50%" left="50%">
      <ChakraSpinner />
    </Box>
  );
};

export default Spinner;
