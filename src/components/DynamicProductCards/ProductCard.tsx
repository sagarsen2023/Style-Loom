"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import edit from "./edit.svg"
import fetchProductDetails from '@/utils/fetchProductData'
import { toast } from 'sonner'
import CircularProgressIndicator from '../CircularProgressIndicator'

interface CardData {
  productID: string,
}

interface ProductData {
  name: string,
  image: string,
  price: number,
  description: string,
  category: string
}

const ProductCard = ({ productID }: CardData) => {
  const [productData, setProductData] = useState<ProductData | undefined>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    async function getProduct() {
      try {
        const product = await fetchProductDetails({ productID })
        setProductData(product)
      } catch (err: any) {
        toast.error(err.message)
      } finally {
        setLoading(false)
      }
    }
    getProduct()
  }, [])

  if (loading)
    return (
      <>
        <div className='bg-zinc-800 px-4 py-4 overflow-hidden flex justify-center items-center rounded-md max-w-96 min-w-96 h-72'>
          <CircularProgressIndicator />
        </div>
      </>
    )

  return (
    <div className='bg-zinc-900 px-4 py-4 overflow-hidden flex flex-col items-center rounded-md max-w-96 min-w-96'>
      <div className='w-full h-64 overflow-hidden'>
        <img
          className='rounded-t-xl object-cover'
          src={productData?.image}
          alt='product image'
          width={350}
          height={350}
        />
      </div>

      <div className='w-full mt-3'>
        <h1 className='bg-zinc-800 px-2 py-2 w-fit rounded-lg'>{productData?.category.split("_").join(" ")}</h1>
      </div>

      <div className='mt-2 flex flex-col items-center justify-between w-full'>
        <h1 className='text-2xl font-semibold w-full text-zinc-100 mb-2'>
          {productData?.name}
        </h1>

        <div className='w-full mt-2 flex items-center justify-between'>
          <span className='text-[#c2b4a3] text-2xl font-bold'>₹ {productData?.price}/-</span>
          <Link href={`/seller/editproduct/${productID}`}>
            <button className='flex items-center justify-evenly text-center px-8 py-2 bg-[#c2b4a3] text-black font-bold rounded-lg'>
              <Image src={edit} alt='bin' width={25} height={25} className='mr-1' />Edit
            </button>
          </Link>

        </div>
      </div>
    </div>
  )
}

export default ProductCard
