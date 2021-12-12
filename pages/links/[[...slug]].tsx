import type { NextPage } from "next";
import Head from "next/head";

const SeoLink: NextPage = () => {
  return (
    <>
      <Head>
        <meta name="twitter:card" content="summary_large_image" />
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
