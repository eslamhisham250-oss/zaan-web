// components/SEO.js
import Head from "next/head";

export default function SEO({ 
  title, 
  description, 
  keywords = "أثاث, شراء, نجارين, مصانع, تصميم أثاث, ديكور, مصر", 
  image = "/images/og-image.jpg", 
  url = "https://zaan.com"
}) {
  return (
    <Head>
      {/* Title + Description */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph (Facebook / LinkedIn) */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Mobile Friendly */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
