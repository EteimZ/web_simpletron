import {
  Center,
  Heading,
  Textarea,
  Box,
  Input,
  Button,
} from "@chakra-ui/react";

type IOProps = {
  showInput: boolean;
  executionPhase: boolean;
  display: string;
  displayColor: string;
  inputValue: string;
  handleKeyPress: (event: { key: string; }) => void;
  handleChange: (event: { target: { value: string } }) => void;
  hanndleOnclick: () => void;
};

function InputOutput({
  showInput,
  display,
  displayColor,
  inputValue,
  executionPhase,
  handleKeyPress,
  handleChange,
  hanndleOnclick,
}: IOProps) {
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
          {showInput && (
            <Input
              value={inputValue}
              variant="flushed"
              focusBorderColor="green.600"
              onChange={handleChange}
              onKeyDown={handleKeyPress}
              placeholder="Provide your instructions, type -9999 to upload."
            />
          )}{" "}
          { executionPhase && <Button onClick={hanndleOnclick}>EXECUTE</Button> }
        </Box>
      </Box>
    </>
  );
}

export default InputOutput;
