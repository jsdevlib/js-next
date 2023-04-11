import { FC } from "react";
import { AppProps } from "next/app";
import { EmotionCache } from "@emotion/react";

import PageProvider from "./PageProvider";
import { Header } from "@/components/layout";
import { useTheme } from "next-themes";

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const MyApp: FC<MyAppProps> = ({ Component, pageProps, emotionCache }) => {
  return (
    <>
      <PageProvider emotionCache={emotionCache}>
        <Header />
        <Component {...pageProps} />
      </PageProvider>
    </>
  );
};

export default MyApp;
