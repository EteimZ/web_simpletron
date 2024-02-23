import {
  Box,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

function InstructionSet() {
  return (
    <>
       <Box mt="20px" borderRadius='10px' boxShadow='base'>
        
        <TableContainer>
          <Heading textAlign="center" size='md'>InstructionSet</Heading>
        
          <Table variant="striped" size='sm'>
            <Thead>
              <Tr>
                <Th>Instruction</Th>
                <Th >Description</Th>
                <Th isNumeric>Code</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>READ</Td>
                <Td >Read a word from the terminal into a specific location in memory</Td>
                <Td isNumeric>10</Td>
              </Tr>
              <Tr>
                <Td>WRITE</Td>
                <Td>Write a word from a specific location in memory to the terminal</Td>
                <Td isNumeric>11</Td>
              </Tr>
              <Tr>
                <Td>LOAD</Td>
                <Td>Load a word from a specific location in memory into the accumulator</Td>
                <Td isNumeric>20</Td>
              </Tr>
              <Tr>
                <Td>ADD</Td>
                <Td >Add a word from a specific location in memory to the word in the accumalator</Td>
                <Td isNumeric>30</Td>
              </Tr>
              <Tr>
                <Td>SUBTRACT</Td>
                <Td>Substract a word from a specific location in memory to the word in the accumalator</Td>
                <Td isNumeric>31</Td>
              </Tr>
              <Tr>
                <Td>DIVIDE</Td>
                <Td>Divide a word from a specific location in memory into the word in the accumalator</Td>
                <Td isNumeric>32</Td>
              </Tr>
              <Tr>
                <Td>MULTIPLY</Td>
                <Td>Multiply a word from a specific location in memory to the word in the accumalator </Td>
                <Td isNumeric>33</Td>
              </Tr>
              <Tr>
                <Td>BRANCH</Td>
                <Td>Branch to a specific location in memory</Td>
                <Td isNumeric>40</Td>
              </Tr>
              <Tr>
                <Td>BRANCHNEG</Td>
                <Td>Branch to a specific location in memory if the accumulator is negative</Td>
                <Td isNumeric>41</Td>
              </Tr>
              <Tr>
                <Td>BRANCHZERO</Td>
                <Td>Branch to a specific location in memory if the accumulator is zero</Td>
                <Td isNumeric>42</Td>
              </Tr>
              <Tr>
                <Td>HALT</Td>
                <Td>Halt the program</Td>
                <Td isNumeric>43</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

export default InstructionSet;
