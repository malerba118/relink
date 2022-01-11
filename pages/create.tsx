import ClientRedirect from "@/components/ClientRedirect";
import LinkEditor from "@/components/LinkEditor";
import { Auth } from "@supabase/ui";
import type { NextPage } from "next";

const CreateLinkPage: NextPage = () => {
  const { user } = Auth.useUser();

  if (!user) {
    return <ClientRedirect href="/" />;
  }

  return <LinkEditor />;
};

export default CreateLinkPage;
