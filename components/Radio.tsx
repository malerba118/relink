import {
  ChakraProvider,
  Center,
  HStack,
  Box,
  useRadioGroup as useRadioGroupValues,
  useRadio as useRadioProps,
} from "@chakra-ui/react";
import * as React from "react";

const RadioGroupContext = React.createContext<ReturnType<
  typeof useRadioGroupValues
> | null>(null);

const useRadio = ({ value }: { value: string }) => {
  const radioGroup = React.useContext(RadioGroupContext);
  return useRadioProps(radioGroup?.getRadioProps({ value }));
};

// Step 2: Use the `useRadioGroup` hook to control a group of custom radios.
export function RadioGroup({ defaultValue, name, onChange, children }: any) {
  const radioGroup = useRadioGroupValues({
    name,
    defaultValue,
    onChange,
  });

  const group = radioGroup.getRootProps();

  return (
    <RadioGroupContext.Provider value={radioGroup}>
      <HStack
        {...group}
        spacing={1}
        bg="whiteAlpha.100"
        p={1}
        display="inline-flex"
        rounded="md"
      >
        {children}
      </HStack>
    </RadioGroupContext.Provider>
  );
}

// 1. Create a component that consumes the `useRadio` hook
export function Radio({ value, children }: any) {
  const { getInputProps, getCheckboxProps } = useRadio({ value });

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Center
        {...checkbox}
        cursor="pointer"
        _checked={{
          bg: "whiteAlpha.300",
          color: "gray.100",
        }}
        color="gray.300"
        rounded="md"
        h="10"
        w="24"
      >
        {children}
      </Center>
    </Box>
  );
}
