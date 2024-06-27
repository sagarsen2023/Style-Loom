"use client"
import Image from 'next/image'
import React, {useEffect, useState} from 'react'
import heart from "./heart.svg"
import bin from "./delete.svg"
import getProductDetails from '@/utils/fetchProductData'
import { toast } from 'sonner'
import CircularProgressIndicator from '../CircularProgressIndicator'

interface CardData {
  isSeller: boolean,
  productID : string
}

interface ProductData {
  name: string,
  image: string,
  price: number,
  description: string,
  category: string
}

const ProductCard = ({ isSeller, productID }: CardData) => {
  const [productData, setProductData] = useState<ProductData | undefined>()
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    async function getProduct(){
      try{
        const product = await getProductDetails({productID})
        setProductData(product)
      } catch(err:any){
        toast.error(err.message)
      } finally{
        setLoading(false)
      }
    }
    getProduct()
  },[])

  if(loading)
    return (
      <>
      <div className='bg-zinc-800 px-4 py-4 overflow-hidden flex justify-center items-center rounded-md max-w-96 min-w-96 h-72'>
      <CircularProgressIndicator/>
      </div>
      </>
    )
    console.log(productData)
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

          <div className='flex items-center justify-center h-full gap-5'>
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
    </div>
  )
}

export default ProductCard
