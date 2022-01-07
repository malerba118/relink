import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import * as api from "@/client/api";
import { Auth } from "@supabase/ui";
import { Button } from "@chakra-ui/button";

const Home: NextPage = () => {
  const { user } = Auth.useUser();

  return (
    <div className={styles.container}>
      {!user && (
        <Button
          onClick={() => {
            api.auth.signIn();
          }}
        >
          Sign In
        </Button>
      )}

      {user && (
        <Button
          onClick={() => {
            api.auth.signOut();
          }}
        >
          Sign Out
        </Button>
      )}
    </div>
  );
};

export default Home;
