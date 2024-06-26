import Image from 'next/image'
import React from 'react'
import heart from "./heart.svg"
import bin from "./delete.svg"

const ProductCard = ({isSeller} : any) => {
  return (
    <div className='bg-zinc-800 px-4 py-4 overflow-hidden flex flex-col items-center w-fit rounded-md min-w-72'>
      <div className=''>
        <img
          src="https://media.fashionnetwork.com/m/d525/442b/ab16/04f0/3141/eff8/f2cb/c62f/3ac2/aeb9/aeb9.jpg"
          alt='product image'
          width={350}
          height={350}
        />
      </div>

      <div className='mt-4 flex flex-col items-center'>
        <h1 className='product-title text-2xl font-semibold text-center w-full text-zinc-100'>
          Lorem, ipsum dolor.
        </h1>

        <div className='mt-2 flex items-center justify-center'>
          <span className='text-[#c2b4a3] text-xl font-bold'>₹ 9999/-</span>
        </div>

        <div className='m-3 flex items-center justify-center h-full w-full gap-5'>
          <button className='px-2 py-2 rounded-full border-2 border-[#c2b4a3] flex items-center'>
            {
              isSeller
               ? <Image src={bin} alt='bin' width={20} height={20} />
                : <Image src={heart} alt='heart' width={20} height={20} />
            }
          </button>
          <button className='text-center px-10 py-2 bg-[#c2b4a3] text-black font-bold rounded-lg'>
            Edit
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
