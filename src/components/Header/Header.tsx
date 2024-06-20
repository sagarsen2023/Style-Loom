import React from 'react'
import Image from 'next/image'
import menu from "./menu.svg"

const Header = () => {
  return (
    <>
    <div className='flex items-center justify-between px-4 py-6 h-[10vh]'>
        <h1 className='text-3xl font-bold'>Style.Loom</h1>
        <button className='bg-[#c2b4a3] px-3 py-3 rounded-lg'><Image src={menu} alt='menu' width={30} height={30}/></button>
    </div>
    </>
  )
}

export default Header