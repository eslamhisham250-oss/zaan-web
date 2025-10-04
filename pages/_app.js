import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { I18nProvider } from "../lib/i18n";
import Layout from "../components/Layout";

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <I18nProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </I18nProvider>
    </SessionProvider>
  );
}

