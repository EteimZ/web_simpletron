import { Heading, Box, Flex, Text } from "@chakra-ui/react";

type CpuProps = {
  accumulator: number;
  instructionCounter: number;
  instructionRegister: number;
}

function toFourFigures(num: number) {
  const numString = num.toString();
  return numString.padStart(4, '0');
}

function Cpu(props: CpuProps) {


  const operationCode = Math.round(props.instructionRegister/ 100);
  const operand = props.instructionRegister % 100

  return (
    <>
      <Box >
        <Heading textAlign="center" size="md">CPU</Heading>
        <Flex alignItems="center" justifyContent="center">
          <Text width="30%">Accumulator:</Text>
          <Text border="1px solid gray" p="0.2" mb="0.5" bgColor="tomato" borderRadius="md">{toFourFigures(props.accumulator)}</Text>
        </Flex>
        <Flex alignItems="center" justifyContent="center">
          <Text width="30%">InstructionCounter:</Text>
          <Text border="1px solid gray" p="0.2" mb="0.5" bgColor="tomato" borderRadius="md">{toFourFigures(props.instructionCounter)}</Text>
        </Flex>
        <Flex alignItems="center" justifyContent="center">
          <Text width="30%">InstructionRegister:</Text>
          <Text border="1px solid gray" p="0.2" mb="0.5" bgColor="tomato" borderRadius="md">{toFourFigures(props.instructionRegister)}</Text>
        </Flex>
        <Flex alignItems="center" justifyContent="center">
          <Text width="30%">OperationCode:</Text>
          <Text border="1px solid gray" p="0.2" mb="0.5" bgColor="tomato" borderRadius="md">{toFourFigures(operationCode)}</Text>
        </Flex>
        <Flex alignItems="center" justifyContent="center">
          <Text width="30%">Operand:</Text>
          <Text border="1px solid gray" p="0.2" mb="0.5" bgColor="tomato" borderRadius="md">{toFourFigures(operand)}</Text>
        </Flex>
      </Box>
    </>
  );
}

export default Cpu;
