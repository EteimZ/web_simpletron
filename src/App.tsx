import InputOutput from "./components/InputOutput";
import Memory from "./components/Memory";
import InstructionSet from "./components/InstructionSet";
import Cpu from "./components/Cpu";
import {
  ChakraProvider,
  Grid,
  GridItem,
  Heading,
  Flex,
  Menu,
  Button,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";

import { useRef, useState } from "react";

function App() {
  const [accumulator, setAccumulator] = useState(0);
  const [instructionCounter, setCounter] = useState(0);
  const [instructionRegister, setRegister] = useState(0);
  const [memory, setMemory] = useState(new Array(99).fill(0));
  const executionPhase = useRef(false);

  const resetState = () => {
    window.location.reload();
  }

  const addExample = () => {
    const arr = new Array(99).fill(0);
    const instructions = [1007, 1008, 2007, 3008, 2109, 1109, 4300]
    
    for (let i = 0; i < instructions.length; i++) {
      arr[i] = instructions[i];
    }
    
    setMemory(arr);

    executionPhase.current = true;
    
  }

  const multiplyExample = () => {
    const arr = new Array(99).fill(0);
    const instructions = [1007, 1008, 2007, 3308, 2109, 1109, 4300]
    
    for (let i = 0; i < instructions.length; i++) {
      arr[i] = instructions[i];
    }
    
    setMemory(arr);

    executionPhase.current = true;
    
  }

  return (
    <ChakraProvider>
      <>
        <Flex bg="gray.50" px="4" py="2" alignItems="center">
          <Flex flexGrow={1} justifyContent="center">
            <Heading size="lg" fontFamily="Roboto, sans-serif">
              WEB SIMPLETRON
            </Heading>
          </Flex>
          <Flex>
            <Menu>
              {({ isOpen }) => (
                <>
                  <MenuButton as={Button} mx="2">
                    Examples
                  </MenuButton>
                  {isOpen && (
                    <MenuList>
                      <MenuItem onClick={addExample}>Sum Example</MenuItem>
                      <MenuItem onClick={multiplyExample}>Multiply Example</MenuItem>
                  </MenuList>
                  )}
                </>
              )}
            </Menu>
            <Button onClick={resetState}>Reset</Button>
          </Flex>
        </Flex>
        <Grid
          h="60vh"
          templateRows="repeat(2, 1fr)"
          templateColumns="repeat(5, 1fr)"
          gap={2}
          m={2}
        >
          <GridItem
            colSpan={3}
            rowSpan={1}
            borderRadius="10px"
            boxShadow="base"
          >
            <InputOutput
              executionPhase={executionPhase}
              accumulator={accumulator}
              memory={memory}
              setMemory={setMemory}
              instructionCounter={instructionCounter}
              register={instructionRegister}
              setRegister={setRegister}
              setCounter={setCounter}
              setAccumulator={setAccumulator}
            />
          </GridItem>
          <GridItem
            colSpan={2}
            rowSpan={1}
            borderRadius="10px"
            boxShadow="base"
          >
            <Cpu
              accumulator={accumulator}
              instructionCounter={instructionCounter}
              instructionRegister={instructionRegister}
            />
          </GridItem>
          <GridItem
            colSpan={3}
            rowSpan={1}
            borderRadius="10px"
            boxShadow="base"
          >
            <InstructionSet />
          </GridItem>
          <GridItem
            colSpan={2}
            rowSpan={1}
            borderRadius="10px"
            boxShadow="base"
          >
            <Memory memory={memory} />
          </GridItem>
        </Grid>
      </>
    </ChakraProvider>
  );
}

export default App;
