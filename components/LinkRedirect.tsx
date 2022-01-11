import * as api from "@/client/api";
import { Center, Heading, Text, Box } from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import { inferRedirectUrl } from "utils";

interface LinkRedirectProps {
  link: api.types.Link;
}

export const LinkRedirect: React.FC<LinkRedirectProps> = ({ link }) => {
  useEffect(() => {
    // window.location.href = link.redirect_url;
    window.location.href = inferRedirectUrl(link.redirect_url);
  }, [link.redirect_url]);

  return (
    <>
      <Head>
        <meta name="twitter:card" content={link.card_type} />
        <meta name="twitter:site" content="@vernosapp" />
        <meta name="twitter:creator" content="@vernosapp" />
        <meta name="twitter:title" content={link.title} />
        <meta name="twitter:description" content={link.description} />
        <meta name="twitter:image" content={link.image} />
      </Head>
      <Center flexDirection="column" h="100vh">
        <Box>
          <Text>
            Redirecting to{" "}
            <Link href={inferRedirectUrl(link.redirect_url)} passHref>
              <Text as="span" textDecoration="underline" cursor="pointer">
                {link.redirect_url}
              </Text>
            </Link>
          </Text>
        </Box>
      </Center>
    </>
  );
};
