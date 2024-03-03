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

import { useEffect, useRef, useState } from "react";

function App() {
  const [accumulator, setAccumulator] = useState(0);
  const [display, setDisplay ] = useState("");
  const [displayColor, setDisplayColor] = useState("darkgreen");
  const [instructionCounter, setCounter] = useState(0);
  const [instructionRegister, setRegister] = useState(0);
  const [memory, setMemory] = useState(new Array(99).fill(0));
  const [readInput, setReadInput] = useState(true);
  const executionPhase = useRef(false);
  
  const n = useRef(0);

  const handleChange = (event: { target: { value: string }; }) => setInputValue(event.target.value);
  const [showInput, setShowInput] = useState(true);

  const [inputValue, setInputValue ] = useState("");
  
  useEffect(()=>{
    setDisplay("***WELCOME***\n***Please enter your program one instruction at a time***");
  }, []);

  const resetState = () => {
    setAccumulator(0);
    setDisplay("***WELCOME***\n***Please enter your program one instruction at a time***");
    setDisplayColor("darkgreen");
    setCounter(0);
    setRegister(0);
    setReadInput(true);
    setShowInput(true);
    setInputValue("");
    executionPhase.current = false;
    setMemory(new Array(99).fill(0));
    n.current =0;
  }

  enum OperationCode {
    READ = 10,
    WRITE = 11,
    LOAD = 20,
    STORE = 21,
    ADD = 30,
    SUBSTRACT = 31,
    DIVIDE = 32,
    MULTIPLY = 33,
    BRANCH = 40,
    BRANCHNEG = 41,
    BRANCHZERO = 42,
    HALT = 43,
  }


  const handleKeyPress = (event: { key: string; }) => {
    if (event.key === 'Enter' && executionPhase.current == false) {
      setInputValue("")
 
      const operation: number = parseInt(inputValue);
      if (operation == -9999){
        executionPhase.current = true;
        setDisplay("***Ready to Execute***");
        setShowInput(false);
      }else{
        setDisplay("***Instruction loaded successfuly***");
        
        const newMemory = [...memory];
        newMemory[n.current] =  operation;
        setMemory(newMemory)
      
        n.current++;
      }
  
    }
  };

  function hanndleOnclick(){
      executionRun();
  }

  function executionRun(){
    
    const instructionValue = memory[instructionCounter];
    const instructionCode = Math.round(instructionValue/ 100);
    const instructionOperand = instructionValue % 100;
  
    setRegister(memory[instructionCounter]);

    switch (instructionCode) {
      case OperationCode.READ:
        if (readInput == true){
          setDisplay("Please provide an input number.");
          setShowInput(true);
          setReadInput(false); 
        } else{

          setDisplay(`${inputValue} loaded into memory address: ${instructionOperand}`);
          
          setShowInput(false);

          const newMemory = memory;
          newMemory[instructionOperand] = parseInt(inputValue);
          
          setMemory(newMemory)
          setInputValue("");
          setCounter(instructionCounter + 1);
          setReadInput(true); 
        }
        break;

      case OperationCode.WRITE:
        setDisplay(`${memory[instructionOperand]} from memomry address: ${instructionOperand}`);
        setCounter(instructionCounter + 1);
        break;

      case OperationCode.LOAD:
        setDisplay(`Loaded ${memory[instructionOperand]} into the accumulator.`);
        setAccumulator(memory[instructionOperand]);
        setCounter(instructionCounter + 1);
        break;

      case OperationCode.STORE:
        setDisplay(`Copied ${accumulator} from the accumulator into memory address ${instructionOperand}`);
        // eslint-disable-next-line no-case-declarations
        const newMemory = memory;
        newMemory[instructionOperand] = accumulator;
        setMemory(newMemory)
        setCounter(instructionCounter + 1);
        break;
        
      case OperationCode.ADD:
        setDisplay(`Add ${memory[instructionOperand]} to the accumulator.`);
        setAccumulator(accumulator + memory[instructionOperand]);
        if (accumulator + memory[instructionOperand] > 9999 || accumulator + memory[instructionOperand] < -9999 ){
          setDisplayColor("red");
          setDisplay("*** Accumulator overflow ***\n*** Execution abnormally terminated ***" );
          break;
        }      
        setCounter(instructionCounter + 1);
        break;

      case OperationCode.SUBSTRACT:
        setDisplay(`Substract ${memory[instructionOperand]} from the accumulator.`);
        setAccumulator(accumulator - memory[instructionOperand]);
        if (accumulator + memory[instructionOperand] > 9999 || accumulator + memory[instructionOperand] < -9999 ){
          setDisplayColor("red");
          setDisplay("*** Accumulator overflow ***\n*** Execution abnormally terminated ***" );
          break;
        }      
        setCounter(instructionCounter + 1);
        break;

      case OperationCode.DIVIDE:
        if (memory[instructionOperand] == 0){
          setDisplayColor("red");
          setDisplay("*** Attempt to divide by zero ***\n*** Execution abnormally terminated ***");
          break;
        }
        setDisplay(`Divide the acummulator's value: ${accumulator} with ${memory[instructionOperand]}.`);
        setAccumulator(accumulator / memory[instructionOperand]);
        setCounter(instructionCounter + 1);
        break;

      case OperationCode.MULTIPLY:
        setDisplay(`Multiplied the acummulator's value: ${accumulator} with ${memory[instructionOperand]}.`);
        setAccumulator(accumulator * memory[instructionOperand]);
        if (accumulator * memory[instructionOperand] > 9999 || accumulator * memory[instructionOperand] < -9999 ){
          setDisplayColor("red");
          setDisplay("*** Accumulator overflow ***\n*** Execution abnormally terminated ***" );
          break;
        }   
        setCounter(instructionCounter + 1);
        break;

      case OperationCode.BRANCH:
        if (accumulator + memory[instructionOperand] > 9999 || accumulator + memory[instructionOperand] < -9999 ){
          setDisplayColor("red");
          setDisplay("*** Accumulator overflow ***\n*** Execution abnormally terminated ***" );
          break;
        }
        if (instructionOperand > 100 || instructionOperand < 0){
          setDisplayColor("red");
          setDisplay("*** Invalid Jump ***\n*** Execution abnormally terminated ***" );
          break;
        } 
        setDisplay(`Jump to: ${instructionOperand}`);
        setCounter(instructionOperand);
        break;

      case OperationCode.BRANCHNEG:
        if (accumulator < 0){
          if (instructionOperand > 100 || instructionOperand < 0){
            setDisplayColor("red");
            setDisplay("*** Invalid Jump ***\n*** Execution abnormally terminated ***" );
            break;
          } 
          setDisplay(`Jump to: ${instructionOperand}`);
          setCounter(instructionOperand);
        }else{
          setDisplay(`Jump to: ${instructionOperand}`);
          setCounter(instructionCounter + 1);
        }
        break;

      case OperationCode.BRANCHZERO:
        if (accumulator == 0){
          if (instructionOperand > 100 || instructionOperand < 0){
            setDisplayColor("red");
            setDisplay("*** Invalid Jump ***\n*** Execution abnormally terminated ***" );
            break;
          } 
          setDisplay(`Jump to: ${instructionOperand}`);
          setCounter(instructionOperand);
        }else{
          setCounter(instructionCounter + 1);
        }
        break;

      case OperationCode.HALT:
        setDisplay('HALT!');
        break;

      default:
        setDisplay('UNKNOWN operation');
        break;
    }
  }


  // Examples
  function createExample(instructions: number[]){
    const arr = new Array(99).fill(0);

    for (let i = 0; i < instructions.length; i++) {
      arr[i] = instructions[i];
    }
    
    setMemory(arr);

    executionPhase.current = true;

  }

  const addExample = () => {
    const instructions = [1007, 1008, 2007, 3008, 2109, 1109, 4300]
    createExample(instructions);
  }

  const multiplyExample = () => {
    const instructions = [1007, 1008, 2007, 3308, 2109, 1109, 4300]
    createExample(instructions);
  }

  const maximumExample = () =>{
    const instructions = [1009, 1010, 2009, 3110, 4107, 1109, 4300, 1110, 4300]
    createExample(instructions);
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
                      <MenuItem onClick={maximumExample}>Maximum Example</MenuItem>
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
              showInput={showInput}
              display={display}
              displayColor={displayColor}
              inputValue={inputValue}
              executionPhase={executionPhase.current}
              handleChange={handleChange}
              hanndleOnclick={hanndleOnclick}
              handleKeyPress={handleKeyPress}
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
