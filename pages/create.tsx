import styles from "../styles/Home.module.css";
import type { NextPage } from "next";
import { useState } from "react";
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
} from "@chakra-ui/react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";

const CreateLinkPage: NextPage = () => {
  const { user } = Auth.useUser();
  const [activeStep, setActiveStep] = useState(0);

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
      <Stack spacing={6} flex={1}>
        <Heading>Where should your link redirect to?</Heading>
        <Box w="400px">
          <Text mb={2}>Redirect Url</Text>
          <Input size="lg" variant="filled" placeholder="url..." />
        </Box>
        <Box>
          <Button isDisabled colorScheme="purple">
            Next
          </Button>
        </Box>
      </Stack>
    </Flex>
  );
};

export default CreateLinkPage;
