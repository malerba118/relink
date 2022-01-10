import type { GetServerSideProps, NextPage } from "next";
import * as api from "@/client/api";
import { LinkRedirect } from "@/components/LinkRedirect";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const link = await api.links
    .getBySlug(context.query.slug as string)
    .catch(() => null);
  return {
    props: {
      link,
    },
    notFound: !link,
  };
};

const IndexPage: NextPage<any> = (props) => {
  return <LinkRedirect {...props} />;
};

export default IndexPage;
