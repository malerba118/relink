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
  IconButton,
  Tooltip,
  Image,
  Center,
  Spinner,
} from "@chakra-ui/react";
import Link from "next/link";
import { useQuery } from "react-query";
import LinkCopyButton from "./LinkCopyButton";
import { MdEdit as EditIcon } from "react-icons/md";
import { useRouter } from "next/router";

interface LinkItemProps {
  link: api.types.Link;
}

const LinkItem: FC<LinkItemProps> = ({ link }) => {
  const router = useRouter();
  return (
    <Stack pos="relative" p={6} bg="whiteAlpha.50" rounded="lg">
      <HStack pos="absolute" top={2} right={2}>
        <Tooltip label="Edit Link" placement="top">
          <IconButton
            colorScheme="whiteAlpha"
            aria-label="Edit Link"
            icon={<EditIcon />}
            onClick={() =>
              router.push(`/edit/${encodeURIComponent(link.slug)}`)
            }
          />
        </Tooltip>
        <LinkCopyButton link={link} />
      </HStack>
      <Heading size="md" color="gray.50">
        {link.title}
      </Heading>
      <Text color="gray.300">{link.description}</Text>
      <Text fontWeight="bold" color="gray.500">
        {link.redirect_url}
      </Text>
    </Stack>
  );
};

interface LinkListProps {}

const LinkList: FC<LinkListProps> = ({}) => {
  const { user } = Auth.useUser();
  const queries = {
    links: useQuery(
      ["links", { profile_id: user?.id }],
      () => {
        return api.links.list({ profile_id: user?.id });
      },
      {
        enabled: !!user?.id,
      }
    ),
  };

  return (
    <Box>
      <Flex justify="space-between" mb={6}>
        <Heading>Your Links</Heading>
        <Link href="/create" passHref>
          <Button colorScheme="pink" variant="solid" size="md">
            Create a Link
          </Button>
        </Link>
      </Flex>
      {queries.links.isLoading && (
        <Center h="300px">
          <Spinner />
        </Center>
      )}
      {queries.links.data && (
        <Stack spacing={4}>
          {queries.links.data.map((link) => (
            <LinkItem key={link.id} link={link} />
          ))}
        </Stack>
      )}
    </Box>
  );
};

const Toolbar = () => {
  const { user } = Auth.useUser();

  return (
    <Flex h="70px" align="center" justify="space-between" px={6}>
      <HStack spacing={3}>
        <Image w={10} src="/logo.png" />
        <Text
          letterSpacing={4}
          bgGradient="linear(to-l, var(--chakra-colors-pink-300),  var(--chakra-colors-pink-400))"
          bgClip="text"
          fontSize="lg"
          fontWeight="bold"
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
  const { user } = Auth.useUser();

  return (
    <Box>
      <Toolbar />
      {user && (
        <Box py={24} px={8}>
          <Box maxW="700px" margin="0 auto">
            <LinkList />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Home;
