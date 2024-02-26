import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="description" content="NextJS Events" />

          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>

        <body>
          <div id="overlays" />

          <Main />

          <NextScript />
        </body>
      </Html>
    );
  }
}
