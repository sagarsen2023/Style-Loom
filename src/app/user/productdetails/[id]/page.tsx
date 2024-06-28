"use client"
import React, { useEffect, useState } from 'react'
import fetchProductDetails from '@/utils/fetchProductData'
import { toast } from 'sonner';
import CircularProgressIndicator from '@/components/CircularProgressIndicator';
import Image from 'next/image';
import cart from "@/components/StaticProductCards/cart.svg"
import addProductToCart from '@/utils/addProductToCart';

interface Product {
    name: string,
    description: string,
    price: number,
    image: string,
    category: string,
    quantity: number
}

const page = ({ params }: { params: { id: string } }) => {
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState<Product>();

    useEffect(() => {
        setLoading(true)
        async function getProductDetails() {
            try {
                const prooductData = await fetchProductDetails({ productID: params.id })
                setProduct(prooductData)
            } catch (e: any) {
                toast.error(e.message)
            } finally {
                setLoading(false)
            }
        }
        getProductDetails()
    }, [])

    if (loading)
        return <>
            <div className='w-full h-[90vh] flex justify-center items-center'>
                <CircularProgressIndicator />
            </div>
        </>

    return (
        <>
            <h1 className='text-center text-2xl px-4 font-bold pb-4'>View <span className='text-[#c2b4a3]'>Details</span></h1>
            <div className='px-4 sm:flex sm:items-start sm:justify-evenly'>
                {/* Product image */}
                <div className='w-full overflow-hidden sm:w-[40%] sm:h-[60%]'>
                    <img className='border-2 border-[#c2b4a3] px-2 py-2 rounded-lg' src={product?.image} alt="Product Image" />
                </div>
                {/* Product Details */}
                <div >
                    <div className='flex justify-between items-center gap-5'>
                        <h1 className='my-3 text-2xl font-bold'>{product?.name}</h1>
                        <h1 className='text-[#c2b4a3] text-3xl font-bold'>₹ {product?.price}/-</h1>
                    </div>
                    <h1 className='mb-3 text-xl text-zinc-300'>{product?.description}</h1>
                    <div className='w-full px-10 py-3'>
                        <button className='w-full flex items-center justify-center text-center px-8 py-2 bg-[#c2b4a3] text-black font-bold rounded-lg'
                        onClick={()=>{
                            addProductToCart({productID: params.id})
                        }}
                        >
                            <Image src={cart} alt='bin' width={25} height={25} className='mr-1' />Add to Cart
                        </button>
                    </div>
                </div>
            </div>

        </>

    )
}

export default page