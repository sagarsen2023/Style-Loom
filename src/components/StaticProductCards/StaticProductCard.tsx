import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import cart from "./cart.svg"
import addProductToCart from '@/utils/addProductToCart'
import { toast } from 'sonner'

interface StaticProductCardDetails {
  productID: string,
  name: string,
  price: number,
  image: string,
  category: string,
  quantity: number,
}

const StaticProductCard = ({ productID, name, category, image, price, quantity }: StaticProductCardDetails) => {
  return (
    <div className='bg-zinc-900 px-4 py-4 overflow-hidden flex flex-col items-center rounded-md max-w-96 min-w-96 duration-300 border-2 border-zinc-700 hover:border-2 hover:border-[#c2b4a3]'>

      <div className='w-full h-64 overflow-hidden'>
        <img
          className='rounded-t-xl object-cover'
          src={image}
          alt='product image'
          width={350}
          height={350}
        />
      </div>
      <div className='w-full text-left mt-3'>
      {
        quantity > 0 
        ? <span className='text-zinc-200 font-bold bg-green-600 px-3 py-2 rounded-lg'>In Stock</span>
        : <span className='text-zinc-200 bg-red-500 px-2 py-2 rounded-lg'>Out of Stock</span>
      }
      </div>
      <div className='w-full flex items-center justify-between mt-3'>
        <h1 className='bg-zinc-800 px-2 py-2 w-fit rounded-lg'>{category.split("_").join(" ")}</h1>
        <Link href={`/user/productdetails/${productID}`}>
          <button
            className='bg-zinc-800 border-2 border-[#c2b4a3] text-[#c2b4a3] px-5 py-2 rounded-xl font-bold duration-300 hover:bg-[#c2b4a3] hover:text-black'>View Details</button>
        </Link>
      </div>

      <div className='mt-2 flex flex-col items-center justify-between w-full'>
        <h1 className='text-2xl font-semibold w-full text-zinc-100 mb-2'>
          {name}
        </h1>

        <div className='w-full mt-2 flex items-center justify-between'>
          <span className='text-[#c2b4a3] text-2xl font-bold'>₹ {price}/-</span>
          <button className='z-50 flex items-center justify-evenly text-center px-8 py-2 bg-[#c2b4a3] text-black font-bold rounded-lg'
            onClick={() => {
              quantity === 0
              ? toast.error("Product is not available")
              : addProductToCart({ productID })
            }}>
            <Image src={cart} alt='bin' width={25} height={25} className='mr-1' />Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default StaticProductCard