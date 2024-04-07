import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "remixicon/fonts/remixicon.css";
import "./globals.css";
import BasicLayout from "@/components/layout/BasicLayout";
import { Toaster } from "react-hot-toast";
import AppStart from "@/components/AppStart";

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
        <AppStart />
        <Toaster />
        <BasicLayout>{children}</BasicLayout>
      </body>
    </html>
  );
}
