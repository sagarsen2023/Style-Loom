"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import menu from "./menu.svg";
import cart from "./cart.svg";

const Header = () => {
  const [ifMenuOn, setifMenuOn] = useState(false)
  return (
    <>
        <div className='flex items-center justify-between px-4 py-6 h-[10vh]'>
          <div className='hidden md:block'>
            <button className='px-3 py-2 bg-zinc-800 mx-2 rounded-lg hover:font-bold hover:text-black hover:bg-orange-200 duration-200'>Home</button>
            <button className='px-3 py-2 bg-zinc-800 mx-2 rounded-lg hover:font-bold hover:text-black hover:bg-orange-200 duration-200'>Products</button>
          </div>
          <h1 className='text-2xl font-bold'>Style<span className='text-3xl text-[#c2b4a3]'>.</span>Loom</h1>
          <button className='bg-[#c2b4a3] px-3 py-3 rounded-lg md:hidden'><Image src={menu} alt='menu' width={30} height={30}
            onClick={
              () => {
                setifMenuOn(!ifMenuOn)
              }
            }
          /></button>

          {/* Responsive Button for above resolutions for mobile devices */}
          <div className='hidden md:flex items-center justify-between gap-5'>
            <button className='px-2 py-2 bg-zinc-800'><Image src={cart} alt='cart' height={40} width={40} /></button>
            <button className='px-3 py-2 bg-[#c2b4a3] rounded-lg'>Account</button>
          </div>
        </div>

        {/* menubar */}
        <div className={`fixed h-[90vh] top-[10vh] left-0 w-full bg-black flex flex-col transition-all duration-500 transform ${ifMenuOn ? 'translate-x-100 opacity-100' : 'translate-x-full opacity-0'} z-50`}>
          <div className='mt-6 flex flex-col gap-8 font-bold text-3xl text-[#c2b4a3] justify-center items-center'>
            <h1>Cart</h1>
            <h1>Wishlist</h1>
          </div>
          <button className='mt-8 bottom-4 left-1/2 px-20 py-4 bg-zinc-900 text-[#c2b4a3] font-bold mx-auto rounded-lg border-2 border-[#c2b4a3]'>Logout</button>
        </div>
    </>
  )
}

export default Header