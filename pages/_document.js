// pages/_document.js
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ar" dir="rtl">
      <Head>
        {/* ✅ هنا نحط رابط الخط */}
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body style={{ backgroundColor: "#F7F3EF" }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
