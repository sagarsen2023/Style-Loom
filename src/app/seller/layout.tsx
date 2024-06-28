import React from 'react';
import NavBar from '@/components/NavBar/NavBar';

export default function RootLayout({children} : Readonly<{children: React.ReactNode}>){
    return (
        <>
        <NavBar userType={"seller"}/>
        {children}
        </>
    )
}