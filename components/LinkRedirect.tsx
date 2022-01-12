import * as api from "@/client/api";
import { Center, Text, HStack, Image, Stack } from "@chakra-ui/react";
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
        <meta name="twitter:site" content="@relink_page" />
        <meta name="twitter:creator" content="@relink_page" />
        <meta name="twitter:title" content={link.title} />
        <meta name="twitter:description" content={link.description} />
        <meta name="twitter:image" content={link.image} />
      </Head>
      <Center flexDirection="column" h="100vh">
        <Stack align="center">
          <HStack spacing={2}>
            <Image w={8} src="/logo.png" />
            <Text
              letterSpacing={4}
              bgGradient="linear(to-l, var(--chakra-colors-pink-300),  var(--chakra-colors-pink-300))"
              bgClip="text"
              fontSize="lg"
              fontWeight="bold"
            >
              relink.page
            </Text>
          </HStack>
          <Text fontWeight="semibold" textAlign="center" px={4}>
            Redirecting to
          </Text>
          <Link href={inferRedirectUrl(link.redirect_url)} passHref>
            <Text textDecoration="underline" cursor="pointer">
              {link.redirect_url}
            </Text>
          </Link>
        </Stack>
      </Center>
    </>
  );
};
