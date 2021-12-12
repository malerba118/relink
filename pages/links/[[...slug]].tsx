import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
} from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { useEffect } from "react";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  console.log(context.query);
  return {
    props: {
      query: context.query,
    }, // will be passed to the page component as props
  };
}

interface SeoLinkProps {
  query: ParsedUrlQuery;
}

const SeoLink: NextPage<SeoLinkProps> = ({ query }) => {
  const router = useRouter();

  useEffect(() => {
    router.push("https://google.com");
  }, []);

  return (
    <>
      <Head>
        <meta
          name="twitter:card"
          content={
            query.cardType
              ? String(router.query.cardType)
              : "summary_large_image"
          }
        />
        <meta name="twitter:site" content="@vernosapp" />
        <meta name="twitter:creator" content="@vernosapp" />
        <meta name="twitter:title" content="Test Title" />
        <meta name="twitter:description" content="Some test description" />
        <meta
          name="twitter:image"
          content="https://picsum.photos/id/237/200/300"
        />
      </Head>
      <div>hi</div>
    </>
  );
};

export default SeoLink;
