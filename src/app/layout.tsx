import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/global.scss";
import { Footer, Header } from '@/components';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gymdak Photo",
  description: "Gymdak Photo Site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
