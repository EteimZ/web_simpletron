import { Center, Heading, Textarea, Box, Input, Button } from "@chakra-ui/react";
import { useRef, useEffect, useState, RefObject } from "react";

/*
 Add a reset option that will reset the entire state of the app.
 It should be availbale when an error occurs too.
 Simplify the code base too.
*/
type IOProps = {
  memory: number[];
  register: number;
  accumulator: number;
  instructionCounter: number;
  executionPhase: RefObject<boolean>;
  setCounter: (count: number) => void;
  setMemory: (array: number[]) => void;
  setRegister: (instruction: number) => void;
  setAccumulator: (instruction: number) => void;
}; 



function InputOutput( { memory, accumulator, executionPhase, setMemory, setRegister, instructionCounter, setCounter, setAccumulator}: IOProps) {

  const [instruction, setInstruction ] = useState("");
  const [display, setDisplay ] = useState("");
  const [displayColor, setDisplayColor] = useState("darkgreen");
  const [buttonValue, setButtonValue] = useState("Load");
  const [showInput, setShowInput] = useState(true);
  const handleChange = (event: { target: { value: string }; }) => setInstruction(event.target.value);
  const inputRef = useRef<HTMLInputElement>(null);
  // const executionPhase = useRef(false);
  const [blah, setBlah] = useState(true);

  const n = useRef(0);
  useEffect(()=>{
    setDisplay("***WELCOME***\n***Please enter your program one instruction at a time***");
  }, [])
  

  function executionRun(){
    
    const instructionValue = memory[instructionCounter];
    const instructionCode = Math.round(instructionValue/ 100);
    const instructionOperand = instructionValue % 100;
  
    setRegister(memory[instructionCounter]);

    switch (instructionCode) {
      case OperationCode.READ:
        if (blah == true){
          setDisplay("Please provide an input number.");
          setShowInput(true);
          setBlah(false); 
        } else{
          const inputValue = inputRef.current?.value ? parseInt(inputRef.current?.value) : 0;

          setDisplay(`${inputValue} loaded into memory address: ${instructionOperand}`);
          
          setShowInput(false);

          const newMemory = memory;
          newMemory[instructionOperand] = inputValue;
          
          setMemory(newMemory)
          setInstruction("");
          setCounter(instructionCounter + 1);
          setBlah(true); 
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

  const handleKeyPress = () => {
    
    setInstruction("")
 
    const operation: number = parseInt(instruction);
    if (operation == 4300){
      executionPhase.current = true;
      setDisplay("***Ready to Execute***");
      setButtonValue("Execute");
      setShowInput(false);
    }else{
      setDisplay("***Instruction loaded successfuly***");
    }
    
    const newMemory = [...memory];
    newMemory[n.current] =  operation;
    setMemory(newMemory)
  
    n.current++;

  };

  function hanndleOnclick(){
    if (executionPhase.current == false){
      handleKeyPress();
    }else{
      executionRun()
    }
  }

  return (
    <>
      <Box m={2}>
        <Center>
          <Heading size="md">IO</Heading>
        </Center>

        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          gap="5px"
          m={2}
        >
          <Textarea
            readOnly
            bg="black"
            color={displayColor}
            textAlign="start"
            value={display}
          />

          { showInput && <Input ref={inputRef} value={instruction} variant='flushed' focusBorderColor="green.600" onChange={handleChange}  placeholder="Provide your instructions" /> } <Button onClick={hanndleOnclick}>{buttonValue}</Button>
        </Box>
      </Box>
    </>
  );
}

export default InputOutput;
