import { FC } from "react";
import { AppProps } from "next/app";
import { EmotionCache } from "@emotion/react";

import PageProvider from "./PageProvider";
import { Header } from "@/components/layout";

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const MyApp: FC<MyAppProps> = ({ Component, pageProps, emotionCache }) => (
  <>
  <Header />
  <PageProvider emotionCache={emotionCache}>    
    <Component {...pageProps} />
  </PageProvider>
  </>
);

export default MyApp;
