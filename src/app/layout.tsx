import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { Providers } from "./providers";
import Header from "../components/Header/Header";
import { Metadata } from "next";
import Web2Provider from "../contexts/web2Context";

import { Chakra_Petch } from "next/font/google";
import BackgroundDecoration from "../components/BackgroundDecoration";

const chakra = Chakra_Petch({
  variable: "--font-chakra",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Base OGRE",
    description: "$OGRE now on Base Chain",
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${chakra.className}`}>
        <BackgroundDecoration />
        <Providers>
          <Web2Provider>
            <main className="relative flex flex-col gap-20 items-center justify-center overflow-hidden">
              <Header />
              {children}
            </main>
          </Web2Provider>
        </Providers>
      </body>
    </html>
  );
}
