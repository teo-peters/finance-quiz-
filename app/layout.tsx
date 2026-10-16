import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Finance Quiz — Test your financial knowledge",
  description:
    "Choose a category and test your knowledge of crypto, stocks, the economy, personal finance and trading.",
  metadataBase: new URL("https://finquiz.online"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Script
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2728144074284518"
        strategy="beforeInteractive"
        crossOrigin="anonymous"
      />
      <body>{children}</body>
    </html>
  );
}
