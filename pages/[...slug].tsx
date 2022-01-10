import type { GetServerSideProps, NextPage } from "next";
import { FC } from "react";
import styles from "../styles/Home.module.css";
import * as api from "../client/api";
import { Auth } from "@supabase/ui";
import { Button, Box, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useQuery } from "react-query";
import { getSubdomain } from "../utils";
import Home from "../components/Home";
import { LinkRedirect } from "../components/LinkRedirect";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const subdomain = context.req.headers.host
    ? getSubdomain(context.req.headers.host)
    : null;
  const link = subdomain
    ? await api.links
        .getBySubdomainAndSlug(subdomain, context.query.slug as string)
        .catch(() => null)
    : null;
  return {
    props: {
      subdomain: context.req.headers.host
        ? getSubdomain(context.req.headers.host)
        : null,
      link,
    },
    notFound: !subdomain || !link,
  };
};

const IndexPage: NextPage<any> = (props) => {
  return <LinkRedirect {...props} />;
};

export default IndexPage;
