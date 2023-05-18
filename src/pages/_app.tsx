import { AppProps } from "next/app";
import Head from "next/head";
import AppProvider from "core/AppProvider";
import { ColorSchemeProvider } from "@mantine/core";
import { useState } from "react";
import nookies, { setCookie } from "nookies";
import RouterTransition from "components/RouterTransition";
import { QueryClient, QueryClientProvider } from "react-query";
import UserProvider from "context/UserProvider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // cacheTime: 60 * 60 * 24 * 1, //1 hour
      refetchOnWindowFocus: true,
      refetchOnMount: true,
    },
  },
});

interface WithColorScheme {
  preferredColorScheme: "light" | "dark";
}

const THEME_COOKIE = "theme_mantine";
export default function App(props: AppProps & WithColorScheme) {
  const { Component, pageProps } = props;

  const [colorScheme, setColorScheme] = useState(props.preferredColorScheme);

  function toggleColorScheme(value: "light" | "dark") {
    const nextColorScheme =
      value || (colorScheme === "light" ? "dark" : "light");
    setColorScheme(nextColorScheme);
    setCookie(null, THEME_COOKIE, nextColorScheme, {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });
  }

  return (
    <>
      <Head>
        <title>Sistema de upload de imagens.</title>
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <meta
          name="description"
          content="Uma aplicação simpes para armazenar suas imagens na núvem."
        />
      </Head>

      <QueryClientProvider client={queryClient}>
        <ColorSchemeProvider
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}
        >
          <UserProvider>
            <AppProvider Page={<Component {...pageProps} />} />
            <RouterTransition />
          </UserProvider>
        </ColorSchemeProvider>
      </QueryClientProvider>
    </>
  );
}
App.getInitialProps = async ({ ctx }: { ctx: any }) => {
  const cookies = nookies.get(ctx);

  return {
    preferredColorScheme: cookies[THEME_COOKIE] || "light",
  };
};
