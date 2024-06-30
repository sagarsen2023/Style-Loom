import React from "react";
import Header from "@/components/NavBar/NavBar"

export default function RootLayout({ children }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <>
        <Header userType="buyer"/>
        <main className="pt-[10vh]">
        {children}
        </main>
        </>
    )
  }