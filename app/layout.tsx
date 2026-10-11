import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Finance Quiz — Test your financial knowledge",
  description:
    "Choose a category and test your knowledge of crypto, stocks, the economy, personal finance and trading.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
