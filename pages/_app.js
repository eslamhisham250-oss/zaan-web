import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { I18nProvider } from "../lib/i18n";
import Layout from "../components/Layout";
import Head from "next/head";

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <Head>
        {/* ✅ الخط الرسمي للموقع (Cairo) */}
        <title>Zaan | منصة تصميم وشراء الأثاث</title>
        <meta name="description" content="ZAAN - منصة ذكية لطلب الأثاث من النجارين والمصانع وشراء الجاهز والتصميم بالذكاء الصناعي." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <SessionProvider session={session}>
        <I18nProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </I18nProvider>
      </SessionProvider>
    </>
  );
}
