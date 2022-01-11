import type { NextPage } from "next";
// import Home from "../components/Home";
import UnauthedHome from "../components/UnauthedHome";
import dynamic from "next/dynamic";
import { Auth } from "@supabase/ui";

export const Home = dynamic(() => import("../components/Home"), {
  ssr: false,
});

const IndexPage: NextPage<any> = (props) => {
  const { user } = Auth.useUser();

  if (user) {
    return <Home />;
  } else {
    return <UnauthedHome />;
  }
};

export default IndexPage;
