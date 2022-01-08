import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import * as api from "@/client/api";
import { Auth } from "@supabase/ui";
import { Button, Box, Flex, Heading } from "@chakra-ui/react";
import Link from "next/link";

const LinkList = () => {
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

  return (
    <Box>
      <Toolbar />
      {user && (
        <Box p={16}>
          <Box maxW="700px" margin="0 auto">
            <LinkList />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Home;
