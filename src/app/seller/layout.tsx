import React from 'react';
import Header from '@/components/NavBar/NavBar';

export default function RootLayout({children} : Readonly<{children: React.ReactNode}>){
    return (
        <>
        <Header userType={"seller"}/>
        {children}
        </>
    )
}