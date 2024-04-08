import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "remixicon/fonts/remixicon.css";
import "./globals.css";
import BasicLayout from "@/components/layout/BasicLayout";
import { Toaster } from "react-hot-toast";
import AppStart from "@/components/AppStart";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Brew Master",
  description: "The best coffee in town",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + " min-h-screen"}>
        <Script id="tawk" strategy="lazyOnload">
          {`
  var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
  (function(){
  var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
  s1.async=true;
  s1.src='https://embed.tawk.to/66143176a0c6737bd129a522/1hqve2e2a';
  s1.charset='UTF-8';
  s1.setAttribute('crossorigin','*');
  s0.parentNode.insertBefore(s1,s0);
  })();
  `}
        </Script>
        <AppStart />
        <Toaster />
        <BasicLayout>{children}</BasicLayout>
      </body>
    </html>
  );
}
