import LinkEditor from "@/components/LinkEditor";
import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import * as api from "@/client/api";
import { Center, Spinner, Text } from "@chakra-ui/react";
import { Auth } from "@supabase/ui";
import ClientRedirect from "@/components/ClientRedirect";

const EditLinkPage: NextPage = ({}) => {
  const router = useRouter();
  const { user } = Auth.useUser();
  const queries = {
    link: useQuery(
      ["links", "by-slug", router.query.slug],
      () => {
        return api.links.getBySlug(router.query.slug as string);
      },
      {
        enabled: !!router.query.slug,
      }
    ),
  };

  if (queries.link.isLoading) {
    return (
      <Center minH="100vh">
        <Spinner />
      </Center>
    );
  }

  if (queries.link.isError) {
    return (
      <Center minH="100vh">
        <Text>Error Loading Page</Text>
      </Center>
    );
  }

  if (!user) {
    return <ClientRedirect href="/" />;
  }

  return queries.link.data &&
    user &&
    queries.link.data.profile_id === user.id ? (
    <LinkEditor defaultLink={queries.link.data} />
  ) : null;
};

export default EditLinkPage;
