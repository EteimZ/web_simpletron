import { Box, Heading, Grid } from "@chakra-ui/react";

type MemProps = {
  memory: number[];
}

function toFourFigures(num: number) {
  const numString = num.toString();
  return numString.padStart(4, '0');
}

function Memory(props: MemProps ) {
  // Create an array with 100 elements (can be any value, such as null)
  const divsArray = new Array(1).fill(props.memory).flat();

  return (
    <>
      <Box>
        <Heading textAlign="center" size="md">Memory</Heading>
        <Grid
          templateColumns="repeat(11, 40px)"
          gap="4px"
          justifyContent="center"
          mt="10px"
        >
          {divsArray.map((mem, index) => (
            <Box key={index} bg="green.200" borderRadius="md">
              {toFourFigures(mem)}
            </Box>
          ))}
        </Grid>
      </Box>
    </>
  );
}

export default Memory;
