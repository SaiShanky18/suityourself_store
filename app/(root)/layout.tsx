import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import "../globals.css";
import Navbar from "@/components/Navbar";
import ToasterProvider from "@/lib/providers/ToasterProvider";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SuitYourself Store",
  description: "SuitYourself Online Store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClerkProvider>
          <ToasterProvider />
          <Navbar />
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            {children}
          </div>
          <div>
            <Footer />
          </div>
        </ClerkProvider>
      </body>
    </html>
  );
}
