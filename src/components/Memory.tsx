import { Box, Heading, Grid } from "@chakra-ui/react";

function Memory() {
  // Create an array with 100 elements (can be any value, such as null)
  const divsArray = new Array(99).fill(null);

  return (
    <>
      <Box borderRadius='10px' boxShadow='base'>
        <Heading textAlign="center" size="md">Memory</Heading>
        <Grid
          templateColumns="repeat(11, 40px)"
          gap="2px"
          justifyContent="center"
          mt="10px"
        >
          {divsArray.map((_, index) => (
            <Box key={index} w="40px" h="20px" bg="blue.200">
              {/* You can put any content inside each div if needed */}
            </Box>
          ))}
        </Grid>
      </Box>
    </>
  );
}

export default Memory;
