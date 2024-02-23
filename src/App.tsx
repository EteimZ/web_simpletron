import InputOutput from "./components/InputOutput";
import Memory from "./components/Memory";
import InstructionSet from "./components/InstructionSet";
import Cpu from "./components/Cpu";
import { ChakraProvider, Grid, GridItem, Heading } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <>
        <Heading textAlign="center">Computer</Heading>
        <Grid
          h="60vh"
          templateRows="repeat(2, 1fr)"
          templateColumns="repeat(5, 1fr)"
          gap={2}
          m={2}
        >
          <GridItem colSpan={3} rowSpan={1} borderRadius='10px' boxShadow='base'>
            <InputOutput />
          </GridItem>
          <GridItem colSpan={2} rowSpan={1} borderRadius='10px' boxShadow='base'>
            <Cpu />
          </GridItem>
          <GridItem colSpan={3} rowSpan={1} borderRadius='10px' boxShadow='base'>
            <InstructionSet />
          </GridItem>
          <GridItem colSpan={2} rowSpan={1} borderRadius='10px' boxShadow='base'>
            <Memory />
          </GridItem>
          
        </Grid>
      </>
    </ChakraProvider>
  );
}

export default App;
