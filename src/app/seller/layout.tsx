import React from 'react';
import Header from '@/components/Header/Header';

export default function RootLayout({children} : Readonly<{children: React.ReactNode}>){
    return (
        <>
        <Header userType={"seller"}/>
        {children}
        </>
    )
}