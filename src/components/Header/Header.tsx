import React from 'react';
import Image from 'next/image';
import menu from "./menu.svg";
import cart from "./cart.svg";

const Header = () => {
  return (
    <>
    <div className='flex items-center justify-between px-4 py-6 h-[10vh]'>
        <div className='hidden md:block'>
          <button className='px-3 py-2 bg-zinc-800 mx-2 rounded-lg hover:font-bold hover:text-black hover:bg-orange-200 duration-200'>Home</button>
          <button className='px-3 py-2 bg-zinc-800 mx-2 rounded-lg hover:font-bold hover:text-black hover:bg-orange-200 duration-200'>Products</button>
        </div>
        <h1 className='text-2xl font-bold'>Style<span className='text-3xl text-[#c2b4a3]'>.</span>Loom</h1>
        <button className='bg-[#c2b4a3] px-3 py-3 rounded-lg md:hidden'><Image src={menu} alt='menu' width={30} height={30}/></button>
        <div className='hidden  md:flex items-center justify-between gap-5'>
        <button className='px-2 py-2 bg-zinc-800'><Image src={cart} alt='cart' height={40} width={40}/></button>
        <button className='px-3 py-2 bg-[#c2b4a3] rounded-lg'>Account</button>
        </div>
    </div>
    </>
  )
}

export default Header