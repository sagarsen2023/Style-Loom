import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Style.Loom",
  description: "Fashon in style",
};

export default function RootLayout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster className='top-[10vh]' position="top-center" richColors theme='dark' duration={4000} />
        {children}
      </body>
    </html>
  );
}
