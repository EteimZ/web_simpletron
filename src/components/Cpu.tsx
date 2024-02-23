import { Heading, Box, Flex, Text } from "@chakra-ui/react";

function Cpu() {
  return (
    <>
      <Box >
        <Heading textAlign="center" size="md">CPU</Heading>
        <Flex alignItems="center" justifyContent="center">
          <Text width="30%">Accumulator:</Text>
          <Text>0000</Text>
        </Flex>
        <Flex alignItems="center" justifyContent="center">
          <Text width="30%">InstructionCounter:</Text>
          <Text>0000</Text>
        </Flex>
        <Flex alignItems="center" justifyContent="center">
          <Text width="30%">InstructionRegister:</Text>
          <Text>0000</Text>
        </Flex>
        <Flex alignItems="center" justifyContent="center">
          <Text width="30%">OperationCode:</Text>
          <Text>0000</Text>
        </Flex>
        <Flex alignItems="center" justifyContent="center">
          <Text width="30%">Operand:</Text>
          <Text>0000</Text>
        </Flex>
      </Box>
    </>
  );
}

export default Cpu;
