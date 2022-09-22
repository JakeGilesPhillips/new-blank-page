/* eslint-disable @next/next/no-sync-scripts */
import { Html, Head, Main, NextScript } from 'next/document';

const Document = () => {
  return (
    <Html>
      <Head>
        <meta
          name="description"
          content="New Blank Page is the home for the creative web and mobile design work of Jake Giles-Phillips, Bristol."
        />
        <link rel="icon" href="/icons/page.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
