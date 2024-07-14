import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "@/components/Provider";
import NavBar from "@/components/navBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JimBro",
  description: "JimBro is a premier AI-powered fitness companion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <NavBar/>
        {children}
        </Provider>
        </body>
    </html>
  );
}
