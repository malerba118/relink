import type { NextPage } from "next";
import { FC } from "react";
import styles from "../styles/Home.module.css";
import * as api from "@/client/api";
import { Auth } from "@supabase/ui";
import { Button, Box, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useQuery } from "react-query";

interface LinkListProps {
  links: api.types.Link[];
}

const LinkList: FC<LinkListProps> = ({ links }) => {
  return (
    <Box>
      <Flex justify="space-between">
        <Heading>Your Links</Heading>
        <Link href="/create">
          <Button colorScheme="purple" variant="outline" size="md">
            Create a Link
          </Button>
        </Link>
      </Flex>
      <Stack>
        {links.map((link) => (
          <Text color="white" key={link.id}>
            {link.slug}
          </Text>
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

const Home: NextPage = () => {
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
        <Box p={16}>
          <Box maxW="700px" margin="0 auto">
            {queries.links.data && <LinkList links={queries.links.data} />}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Home;
