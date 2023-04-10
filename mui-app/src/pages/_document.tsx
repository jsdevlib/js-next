import * as React from "react";
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentProps,
  DocumentContext,
} from "next/document";
import createEmotionServer from "@emotion/server/create-instance";

import { createEmotionCache } from "../theme";

interface MyDocumentProps extends DocumentProps {
  emotionStyleTags: JSX.Element[];
}

export default function MyDocument({ emotionStyleTags }: MyDocumentProps) {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        {/* Inject MUI styles first to match with the prepend: true configuration. */}
        {emotionStyleTags}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

// MyDocument.getInitialProps async function does a set of things to make the server-side
// rendering of the next app as fast as possible. `getInitialProps` belongs to `_document`
// (instead of `_app`), it's compatible with static-site generation (SSG).
MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  const originalRenderPage = ctx.renderPage;

  {
    /* 
    You can consider sharing the same Emotion cache between all the SSR requests to speed up performance.
    However, be aware that it can have global side effects. 
  */
  }
  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  {
    /*
    The renderPage method is used to render the page on the server and return the resulting HTML 
    to be sent to the client.  In this code, ctx.renderPage is reassigned to a new anonymous function 
    that returns the result of calling originalRenderPage with an options object.
  */
  }
  ctx.renderPage = () =>
    /*
      When originalRenderPage is called with the enhanceApp HOC, it returns the HTML for the page with
      the App component wrapped by the HOC. This HTML can then be sent to the client as the response 
      to the initial request.
    */
    originalRenderPage({
      enhanceApp: (App: any) =>
        /*
        The options object passed to originalRenderPage has a single property, enhanceApp, which 
        is a higher-order component (HOC) that wraps the App component. The purpose of the HOC 
        is to add an emotionCache property to the App component's props, which contains an instance
        of the Emotion cache created in MyDocument.getInitialProps.
      */
        function EnhanceApp(props) {
          return (
            <App
              /*
              The reason for adding the Emotion cache to the App component's props is to allow for 
              sharing the same cache between multiple server-side requests. This helps to improve 
              performance by reusing the same cache instead of creating a new one for each request.
            */
              emotionCache={cache}
              {...props}
            />
          );
        },
    });

  const initialProps = await Document.getInitialProps(ctx);
  /* This is important. It prevents Emotion to render invalid HTML.
  See https://github.com/mui/material-ui/issues/26561#issuecomment-855286153
  `extractCriticalToChunks is a method from the "Emotion" CSS-in-JS library. It is used to extract the 
  critical styles that are required for server-side rendering (SSR) and bundle them in separate chunks. 
  This helps improve SSR performance by reducing the amount of data that needs to be transferred and 
  parsed on each request.
  */
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(" ")}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    emotionStyleTags,
  };
};
