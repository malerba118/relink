import { FC } from "react";
import * as api from "@/client/api";
import { Auth } from "@supabase/ui";
import {
  Button,
  Box,
  Flex,
  Heading,
  Stack,
  Text,
  HStack,
  Image,
  Icon,
} from "@chakra-ui/react";
import TweetEmbed from "react-tweet-embed";
import { BsLink45Deg as LinkIcon } from "react-icons/bs";
import { FaLongArrowAltRight as ArrowRightIcon } from "react-icons/fa";
import { NextSeo } from "next-seo";

const Toolbar = () => {
  const { user } = Auth.useUser();

  return (
    <Flex h="70px" align="center" justify="space-between" pl={6} pr={4}>
      <HStack spacing={2}>
        <Image w={8} src="/logo.png" />
        <Text
          letterSpacing={4}
          bgGradient="linear(to-l, var(--chakra-colors-pink-300),  var(--chakra-colors-pink-300))"
          bgClip="text"
          fontSize="lg"
          fontWeight="bold"
          display={{ base: "none", md: "block" }}
        >
          relink.page
        </Text>
      </HStack>
      <Box>
        {!user && (
          <Button
            key="sign-in"
            colorScheme="pink"
            variant="ghost"
            onClick={() => {
              api.auth.signIn();
            }}
          >
            Sign In With Twitter
          </Button>
        )}
        {user && (
          <Button
            key="sign-out"
            colorScheme="pink"
            variant="ghost"
            onClick={() => {
              api.auth.signOut();
            }}
          >
            Sign Out
          </Button>
        )}
      </Box>
    </Flex>
  );
};

const Home: FC<{}> = (props) => {
  return (
    <Box minH="100vh">
      <NextSeo
        title="relink.page"
        description="Generate links that you can proudly share on Twitter."
        canonical="https://relink.page"
        openGraph={{
          url: "https://relink.page",
          title: "relink.page",
          description: "Generate links that you can proudly share on Twitter.",
          images: [
            {
              url: "https://relink.page/relink.png",
              width: 2229,
              height: 1701,
              alt: "relink.page",
              type: "image/png",
            },
          ],
          site_name: "relink_page",
        }}
        twitter={{
          handle: "@relink_page",
          site: "@relink_page",
          cardType: "summary_large_image",
        }}
        additionalMetaTags={[
          {
            name: "twitter:card",
            content: "summary_large_image",
          },
          {
            name: "twitter:title",
            content: "relink.page",
          },
          {
            name: "twitter:description",
            content: "Generate links that you can proudly share on Twitter.",
          },
          {
            name: "twitter:image",
            content: "https://relink.page/relink.png",
          },
        ]}
      />
      <Toolbar />
      <Box py={0}>
        <Stack spacing={8} p={{ base: 6, md: 12 }} bg="black">
          <Heading
            maxW="800px"
            size="2xl"
            bgClip="text"
            bgGradient="linear(to-l, var(--chakra-colors-pink-50),  var(--chakra-colors-pink-50))"
            fontWeight="extrabold"
            style={{
              WebkitTextStrokeWidth: 2,
              WebkitTextStrokeColor: "currentColor",
            }}
            letterSpacing={2}
            opacity={0.95}
            lineHeight={1.2}
          >
            Generate links that you can{" "}
            <Text
              as="span"
              bgClip="text"
              bgGradient="linear(to-l, var(--chakra-colors-pink-300),  var(--chakra-colors-pink-300))"
            >
              proudly share
            </Text>{" "}
            on Twitter
          </Heading>
          <HStack alignItems="center" wrap="wrap">
            <Heading fontSize="13px" color="pink.50" opacity={0.8}>
              <Icon mb="-11px" fontSize="3xl" as={LinkIcon} />{" "}
              https://lpi.oregonstate.edu/mic/dietary-factors
            </Heading>
            <Box>
              <Icon
                mb="-8px"
                fontSize="lg"
                color="gray.300"
                as={ArrowRightIcon}
              />
            </Box>

            <Heading fontSize="13px" color="pink.50" opacity={0.8}>
              <Icon mb="-11px" fontSize="3xl" as={LinkIcon} />{" "}
              https://relink.page/links/dietary-factors
            </Heading>
          </HStack>
          <Box>
            <Button
              key="sign-in"
              colorScheme="pink"
              variant="solid"
              onClick={() => {
                api.auth.signIn();
              }}
            >
              Sign In With Twitter
            </Button>
          </Box>
        </Stack>
        <Stack
          pos="relative"
          spacing={4}
          w="100%"
          maxW="fit-content"
          margin="0 auto"
          my={12}
        >
          <Image
            h="160px"
            src="/first-arrow.svg"
            top={"60px"}
            left={"-110px"}
            pos="absolute"
            display={{ base: "none", md: "inline-block" }}
          />
          <Image
            h="160px"
            src="/second-arrow.svg"
            top={"418px"}
            right={"-110px"}
            pos="absolute"
            display={{ base: "none", md: "inline-block" }}
          />
          <Heading color="pink.300" size="2xl">
            turn this
          </Heading>
          <Box
            w={{ base: "320px", md: "550px" }}
            h={{ base: "308px", md: "368px" }}
            bg="black"
            rounded="xl"
          >
            <TweetEmbed
              options={{ theme: "dark", conversation: "none" }}
              id="1480932188824739847"
            />
          </Box>
          <Heading color="pink.300" size="2xl" textAlign="right">
            into this
          </Heading>
          <Box
            w={{ base: "320px", md: "550px" }}
            h={{ base: "455px", md: "617px" }}
            bg="black"
            rounded="xl"
          >
            <TweetEmbed
              options={{ theme: "dark", conversation: "none" }}
              id="1480932426725699595"
            />
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default Home;
