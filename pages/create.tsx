import styles from "../styles/Home.module.css";
import type { NextPage } from "next";
import { useState, FC } from "react";
import * as api from "@/client/api";
import { Auth } from "@supabase/ui";
import {
  Box,
  Heading,
  Input,
  Text,
  Flex,
  Stack,
  Button,
  Textarea,
  HStack,
} from "@chakra-ui/react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import { isValidURL } from "utils";
import { MediaUploader } from "@/components/MediaUploader";

interface StepOneProps {
  values: {
    redirectUrl: string;
  };
  onChange: (values: { redirectUrl: string }) => void;
  onNext: () => void;
}

const StepOne: FC<StepOneProps> = ({ values, onChange, onNext }) => {
  return (
    <Stack spacing={6}>
      <Heading>Where should your link redirect to?</Heading>
      <Box w="400px">
        <Text mb={2}>Redirect Url</Text>
        <Input
          size="lg"
          variant="filled"
          placeholder="url..."
          value={values.redirectUrl}
          onChange={(e) => {
            onChange({ ...values, redirectUrl: e.target.value });
          }}
        />
      </Box>
      <Box>
        <Button
          onClick={() => onNext()}
          colorScheme="purple"
          isDisabled={!isValidURL(values.redirectUrl)}
        >
          Next
        </Button>
      </Box>
    </Stack>
  );
};

interface StepTwoProps {
  values: {
    title: string;
    description: string;
    image: string | null;
  };
  onChange: (values: {
    title: string;
    description: string;
    image: string | null;
  }) => void;
  onNext: () => void;
  onBack: () => void;
}

const StepTwo: FC<StepTwoProps> = ({ values, onChange, onNext, onBack }) => {
  const { user } = Auth.useUser();
  return (
    <Stack spacing={6}>
      <Heading>How should your link appear on Twitter?</Heading>
      <Stack w="400px">
        <Box>
          <Text mb={2}>Title</Text>
          <Input
            size="lg"
            variant="filled"
            placeholder="title..."
            value={values.title}
            onChange={(e) => {
              onChange({ ...values, title: e.target.value });
            }}
          />
        </Box>
        <Box>
          <Text mb={2}>Description</Text>
          <Textarea
            size="lg"
            variant="filled"
            placeholder="description..."
            value={values.description}
            onChange={(e) => {
              onChange({ ...values, description: e.target.value });
            }}
          />
        </Box>
        <Box>
          <Text mb={2}>Image</Text>
          <MediaUploader
            url={values.image}
            bucket={`users/${user?.id}`}
            onUpload={(url) => onChange({ ...values, image: url })}
          />
        </Box>
      </Stack>
      <HStack spacing={3}>
        <Button onClick={() => onBack()}>Back</Button>
        <Button onClick={() => onNext()} colorScheme="purple">
          Next
        </Button>
      </HStack>
    </Stack>
  );
};

const CreateLinkPage: NextPage = () => {
  const { user } = Auth.useUser();
  const [activeStep, setActiveStep] = useState(0);
  const [stepOneValues, setStepOneValues] = useState({ redirectUrl: "" });
  const [stepTwoValues, setStepTwoValues] = useState<any>({
    title: "",
    description: "",
    image: null,
  });

  return (
    <Flex minH="100vh" py={36}>
      <Box w="320px" px={16}>
        <Stepper activeStep={activeStep} orientation="vertical">
          <Step>
            <StepLabel>
              <Text>Redirect Target</Text>
            </StepLabel>
          </Step>
          <Step>
            <StepLabel>
              <Text>Appearance on Twitter</Text>
            </StepLabel>
          </Step>
          <Step>
            <StepLabel>
              <Text>Link Customization</Text>
            </StepLabel>
          </Step>
        </Stepper>
      </Box>
      <Box flex={1}>
        {activeStep === 0 && (
          <StepOne
            values={stepOneValues}
            onChange={setStepOneValues}
            onNext={() => setActiveStep(1)}
          />
        )}
        {activeStep === 1 && (
          <StepTwo
            values={stepTwoValues}
            onChange={setStepTwoValues}
            onBack={() => setActiveStep(0)}
            onNext={() => setActiveStep(2)}
          />
        )}
      </Box>
    </Flex>
  );
};

export default CreateLinkPage;
