import { Center, Heading, Textarea, Box, Input } from "@chakra-ui/react";

function InputOutput() {
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
            bg="black"
            color="darkgreen"
            textAlign="start"
          />

          <Input placeholder="Provide your instructions" />
        </Box>
      </Box>
    </>
  );
}

export default InputOutput;
