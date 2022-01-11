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

interface LinkListProps {
  links: api.types.Link[];
}

const LinkList: FC<LinkListProps> = ({ links }) => {
  return (
    <Box>
      <Flex justify="space-between" mb={6}>
        <Heading>Your Links</Heading>
        <Link href="/create" passHref>
          <Button colorScheme="purple" variant="outline" size="md">
            Create a Link
          </Button>
        </Link>
      </Flex>
      <Stack spacing={4}>
        {links.map((link) => (
          <LinkItem key={link.id} link={link} />
        ))}
      </Stack>
    </Box>
  );
};

const Toolbar = () => {
  const { user } = Auth.useUser();

  return (
    <Flex
      h="64px"
      borderBottom="1px solid rgba(255,255,255,.1)"
      align="center"
      justify="space-between"
      px={6}
    >
      <Box>Logo</Box>
      <Box>
        {!user && (
          <Button
            key="sign-in"
            colorScheme="purple"
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
            colorScheme="gray"
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
      <Toolbar />
      {user && (
        <Box py={24} px={8}>
          <Box maxW="700px" margin="0 auto">
            {queries.links.data && <LinkList links={queries.links.data} />}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Home;
