"use client"
import fetchData from '@/utils/fetchData'
import React, { useEffect } from 'react'

const page = () => {
    useEffect(()=>{
      fetchData();
    })

  return (
    <>
      <h1 className='text-2xl text-center font-bold pb-4'>Dash<span className='text-[#c2b4a3]'>board</span></h1>
      <div>
        {/* Add product form */}

        {/* Added products */}
      </div>
    </>
  )
}

export default page