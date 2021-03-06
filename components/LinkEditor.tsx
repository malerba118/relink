import type { NextPage } from "next";
import { useState, useEffect, FC } from "react";
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
  Center,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Spinner,
  CloseButton,
} from "@chakra-ui/react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { buildUrlFromLink, isValidURL } from "utils";
import { MediaUploader } from "@/components/MediaUploader";
import { Radio, RadioGroup } from "@/components/Radio";
import { LargeTwitterCard } from "@/components/LargeTwitterCard";
import { SmallTwitterCard } from "@/components/SmallTwitterCard";
import { nanoid } from "nanoid";
import { useMutation, useQuery } from "react-query";
import { useDebounce } from "use-debounce";
import {
  BsFillXCircleFill as ErrorIcon,
  BsCheckCircleFill as SuccessIcon,
} from "react-icons/bs";
import { useRouter } from "next/router";
import LinkCopyButton from "@/components/LinkCopyButton";
import { v4 as uuid } from "uuid";

interface StepOneProps {
  values: {
    redirectUrl: string;
  };
  onChange: (values: { redirectUrl: string }) => void;
  onNext: () => void;
}

const StepOne: FC<StepOneProps> = ({ values, onChange, onNext }) => {
  return (
    <Flex flexDirection="column" spacing={0} h="100%">
      <Flex h={32} align="end" p={6}>
        <Heading
          fontWeight={900}
          style={{
            WebkitTextStrokeWidth: 1,
            WebkitTextStrokeColor: "currentColor",
          }}
        >
          Where should your link take the user?
        </Heading>
      </Flex>
      <HStack h="calc(100vh - var(--chakra-sizes-32))">
        <Stack spacing={6} h="100%" minW="420px" p={6} pt={1.5}>
          <Box>
            <Text mb={2}>Redirect URL</Text>
            <Input
              size="lg"
              variant="filled"
              placeholder="https://google.com"
              value={values.redirectUrl}
              onChange={(e) => {
                onChange({ ...values, redirectUrl: e.target.value });
              }}
            />
          </Box>
          <Box>
            <Button
              onClick={() => onNext()}
              colorScheme="pink"
              isDisabled={!isValidURL(values.redirectUrl)}
            >
              Next
            </Button>
          </Box>
        </Stack>
        <Center h="100%" w="100%"></Center>
      </HStack>
    </Flex>
  );
};

interface StepTwoProps {
  values: {
    title: string;
    description: string;
    image: string | null;
    cardType: "summary" | "summary_large_image";
  };
  onChange: (values: {
    title: string;
    description: string;
    image: string | null;
    cardType: "summary" | "summary_large_image";
  }) => void;
  onNext: () => void;
  onBack: () => void;
}

const StepTwo: FC<StepTwoProps> = ({ values, onChange, onNext, onBack }) => {
  const { user } = Auth.useUser();
  return (
    <Flex flexDirection="column" spacing={0} h="100%">
      <Flex h={32} align="end" p={6}>
        <Heading
          fontWeight={900}
          style={{
            WebkitTextStrokeWidth: 1,
            WebkitTextStrokeColor: "currentColor",
          }}
        >
          How should your link appear on Twitter?
        </Heading>
      </Flex>
      <HStack h="calc(100vh - var(--chakra-sizes-32))">
        <Stack h="100%" overflow="auto" minW="420px" p={6} pt={1.5}>
          <Stack spacing={6}>
            <Stack spacing={3}>
              <Box>
                <Text mb={2}>Card Type</Text>
                <RadioGroup
                  defaultValue={values.cardType}
                  onChange={(val: any) => {
                    onChange({
                      ...values,
                      cardType: val,
                    });
                  }}
                >
                  <Radio value="summary_large_image">Large</Radio>
                  <Radio value="summary">Small</Radio>
                </RadioGroup>
              </Box>
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
              <Button colorScheme="whiteAlpha" onClick={() => onBack()}>
                Back
              </Button>
              <Button
                onClick={() => onNext()}
                colorScheme="pink"
                isDisabled={
                  !values.title || !values.description || !values.image
                }
              >
                Next
              </Button>
            </HStack>
          </Stack>
        </Stack>
        <Center h="100%" w="100%">
          {values.cardType === "summary_large_image" && (
            <LargeTwitterCard
              image={values.image || "/no-image.svg"}
              title={values.title}
              description={values.description}
              host={`relink.page`}
            />
          )}
          {values.cardType === "summary" && (
            <SmallTwitterCard
              image={values.image || "/no-image.svg"}
              title={values.title}
              description={values.description}
              host={`relink.page`}
            />
          )}
        </Center>
      </HStack>
    </Flex>
  );
};

enum AvailbilityState {
  Unknown,
  Pending,
  Available,
  Unavailable,
}

const AvailabilityIcon: FC<any> = ({ state }) => {
  if (state === AvailbilityState.Unknown) {
    return null;
  } else if (state === AvailbilityState.Available) {
    return <SuccessIcon />;
  } else if (state === AvailbilityState.Unavailable) {
    return <ErrorIcon />;
  } else if (state === AvailbilityState.Pending) {
    return <Spinner size="sm" />;
  }
  return null;
};

interface StepThreeProps {
  defaultLink?: api.types.Link;
  values: {
    slug: string;
  };
  onChange: (values: { slug: string }) => void;
  onBack: () => void;
  onGenerate: () => void;
  createLinkMutation: any;
}

const StepThree: FC<StepThreeProps> = ({
  defaultLink,
  values,
  onChange,
  onBack,
  onGenerate,
  createLinkMutation,
}) => {
  const { user } = Auth.useUser();
  const [debouncedSlug] = useDebounce(values.slug, 1000);

  const queries = {
    availability: useQuery([debouncedSlug], () =>
      api.links.isAvailable({
        slug: debouncedSlug,
      })
    ),
  };

  let availability: AvailbilityState = AvailbilityState.Unknown;
  if (defaultLink?.slug && defaultLink.slug === debouncedSlug) {
    availability = AvailbilityState.Available;
  } else if (values.slug !== debouncedSlug) {
    availability = AvailbilityState.Unknown;
  } else if (queries.availability.isLoading) {
    availability = AvailbilityState.Pending;
  } else if (queries.availability.data === true) {
    availability = AvailbilityState.Available;
  } else if (queries.availability.data === false) {
    availability = AvailbilityState.Unavailable;
  }

  return (
    <Flex flexDirection="column" spacing={0} h="100%">
      <Flex h={32} align="end" p={6}>
        <Heading
          fontWeight={900}
          style={{
            WebkitTextStrokeWidth: 1,
            WebkitTextStrokeColor: "currentColor",
          }}
        >
          Customize Your Link
        </Heading>
      </Flex>
      <HStack h="calc(100vh - var(--chakra-sizes-32))">
        <Stack spacing={6} h="100%" minW="500px" p={6} pt={1.5}>
          <Box>
            <Text mb={2}>Your Link</Text>
            <InputGroup size="lg">
              <InputLeftAddon px={2} fontSize="sm">
                {`https://relink.page/links/`}
              </InputLeftAddon>
              <Input
                value={values.slug}
                onChange={(e) => {
                  onChange({
                    ...values,
                    slug: e.target.value,
                  });
                }}
                px={2}
                fontSize="sm"
                placeholder="slug"
              />
              <InputRightElement>
                <AvailabilityIcon state={availability} />
              </InputRightElement>
            </InputGroup>
            {/* <Input
              size="lg"
              variant="filled"
              placeholder="https://google.com"
              value={values.slug}
              onChange={(e) => {
                onChange({ ...values, slug: e.target.value });
              }}
            /> */}
          </Box>
          <HStack spacing={3}>
            <Button colorScheme="whiteAlpha" onClick={() => onBack()}>
              Back
            </Button>
            <Button
              onClick={() => onGenerate()}
              colorScheme="pink"
              isDisabled={availability !== AvailbilityState.Available}
              isLoading={createLinkMutation.isLoading}
            >
              Save My Link!
            </Button>
          </HStack>
        </Stack>
        <Center h="100%" w="100%"></Center>
      </HStack>
    </Flex>
  );
};

interface StepFourProps {
  link: api.types.Link;
}

const StepFour: FC<StepFourProps> = ({ link }) => {
  const url = buildUrlFromLink(link);
  const router = useRouter();

  return (
    <Flex flexDirection="column" spacing={0} h="100%">
      <Flex h={32} align="end" p={6}>
        <Heading
          fontWeight={900}
          style={{
            WebkitTextStrokeWidth: 1,
            WebkitTextStrokeColor: "currentColor",
          }}
        >
          Your Link Has Been Saved!
        </Heading>
      </Flex>
      <HStack h="calc(100vh - var(--chakra-sizes-32))">
        <Stack spacing={6} h="100%" minW="500px" p={6} pt={1.5}>
          <Box>
            <Text mb={2}>Your Link</Text>
            <InputGroup>
              <Input
                size="lg"
                variant="filled"
                placeholder="https://google.com"
                isReadOnly
                value={url}
              />
              <InputRightElement as={Center} m={1}>
                <LinkCopyButton link={link} />
              </InputRightElement>
            </InputGroup>
          </Box>
          <HStack spacing={3}>
            <Button
              colorScheme="whiteAlpha"
              onClick={() => {
                router.push("/");
              }}
            >
              Back to My Links
            </Button>
          </HStack>
        </Stack>
        <Center h="100%" w="100%"></Center>
      </HStack>
    </Flex>
  );
};

interface LinkEditorProps {
  defaultLink?: api.types.Link;
}

const LinkEditor: FC<LinkEditorProps> = ({ defaultLink }) => {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [stepOneValues, setStepOneValues] = useState({
    redirectUrl: defaultLink ? defaultLink.redirect_url : "",
  });
  const [stepTwoValues, setStepTwoValues] = useState<any>({
    title: defaultLink ? defaultLink.title : "",
    description: defaultLink ? defaultLink.description : "",
    image: defaultLink ? defaultLink.image : null,
    cardType: defaultLink ? defaultLink.card_type : "summary_large_image",
  });
  const [stepThreeValues, setStepThreeValues] = useState({
    slug: defaultLink ? defaultLink.slug : nanoid(8),
  });
  const mutations = {
    createLink: useMutation(api.links.upsert),
  };

  useEffect(() => {
    if (mutations.createLink.data) {
      setActiveStep(3);
    }
  }, [mutations.createLink.data]);

  return (
    <Flex h="100vh">
      <Box px={20} py={32}>
        <Stepper activeStep={activeStep} orientation="vertical">
          <Step>
            <StepLabel>
              <Text>Redirect Target</Text>
            </StepLabel>
          </Step>
          <Step>
            <StepLabel>
              <Text>Appearance</Text>
            </StepLabel>
          </Step>
          <Step>
            <StepLabel>
              <Text>Customization</Text>
            </StepLabel>
          </Step>
        </Stepper>
      </Box>
      <Box pos="relative" flex={1}>
        <CloseButton
          pos="absolute"
          top={4}
          right={4}
          onClick={() => {
            router.push("/");
          }}
        />
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
        {activeStep === 2 && (
          <StepThree
            defaultLink={defaultLink}
            values={stepThreeValues}
            onChange={setStepThreeValues}
            onBack={() => setActiveStep(1)}
            onGenerate={() => {
              mutations.createLink.mutate({
                id: defaultLink ? defaultLink.id : uuid(),
                slug: stepThreeValues.slug,
                redirect_url: stepOneValues.redirectUrl,
                title: stepTwoValues.title,
                description: stepTwoValues.description,
                image: stepTwoValues.image,
                card_type: stepTwoValues.cardType,
              });
            }}
            createLinkMutation={mutations.createLink}
          />
        )}
        {activeStep === 3 && mutations.createLink.data && (
          <StepFour link={mutations.createLink.data} />
        )}
      </Box>
    </Flex>
  );
};

export default LinkEditor;
