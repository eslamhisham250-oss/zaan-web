import { Html, Head, Main, NextScript } from 'next/document';

export default function Document(){
  return (
    <Html lang="ar" dir="rtl">
      <Head>
        <meta name="description" content="Zaan — منصة طلب وتصميم وشراء أثاث" />
        <meta property="og:title" content="Zaan" />
        <meta property="og:description" content="منصة طلب وتصميم وشراء أثاث" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap" rel="stylesheet" />
        <style>{`body{font-family:'Cairo',system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif}`}</style>
      </Head>
      <body style={{ background:'#fafafa' }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
