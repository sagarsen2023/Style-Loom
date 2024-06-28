import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import cart from "./cart.svg"

interface StaticProductCardDetails {
  id: string,
  name: string,
  price: number,
  image: string,
  category: string,
}

const StaticProductCard = ({ id, name, category, image, price }: StaticProductCardDetails) => {
  return (
    <div className='bg-zinc-900 px-4 py-4 overflow-hidden flex flex-col items-center rounded-md max-w-96 min-w-96'>
      <div className='w-full h-64 overflow-hidden'>
        <img
          className='rounded-t-xl object-cover'
          src={image}
          alt='product image'
          width={350}
          height={350}
        />
      </div>

      <div className='w-full mt-3'>
        <h1 className='bg-zinc-800 px-2 py-2 w-fit rounded-lg'>{category.split("_").join(" ")}</h1>
      </div>

      <div className='mt-2 flex flex-col items-center justify-between w-full'>
        <h1 className='text-2xl font-semibold w-full text-zinc-100 mb-2'>
          {name}
        </h1>

        <div className='w-full mt-2 flex items-center justify-between'>
          <span className='text-[#c2b4a3] text-2xl font-bold'>₹ {price}/-</span>
          <Link href={`/user/addtocart/${id}`}>
            <button className='flex items-center justify-evenly text-center px-8 py-2 bg-[#c2b4a3] text-black font-bold rounded-lg'>
              <Image src={cart} alt='bin' width={25} height={25} className='mr-1' />Add to Cart
            </button>
          </Link>

        </div>
      </div>
    </div>
  )
}

export default StaticProductCard