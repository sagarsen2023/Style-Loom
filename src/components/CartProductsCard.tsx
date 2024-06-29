"use client"
import React, { useEffect, useState } from 'react'
import fetchProductDetails from '@/utils/fetchProductData'
import { toast } from 'sonner'
import CircularProgressIndicator from './CircularProgressIndicator'
import Image from 'next/image'
import add from "@/app/seller/editproduct/[id]/add.svg"
import minus from "@/app/seller/editproduct/[id]/minus.svg"
import fetchUserData from '@/utils/fetchUserData'
import axios from 'axios'

interface ProductData {
    _id: string,
    name: string,
    price: number,
    image: string,
    quantity: number,
}

interface ProductCardData {
    productID: string,
    userID : string,
    quantity: number,
    updateCart: React.Dispatch<React.SetStateAction<boolean>>
}

const CartProductsCard = ({ productID, quantity, updateCart, userID }: ProductCardData) => {
    const [loading, setLoading] = useState(false)
    const [product, setProduct] = useState<ProductData | undefined>()
    const [cartQuantity, setCartQuantity] = useState(quantity)

    useEffect(() => {
        async function getProductDetails() {
            setLoading(true)
            try {
                const fetchedProduct = await fetchProductDetails({ productID })
                setProduct(fetchedProduct)
            } catch (err: any) {
                toast.error(err.message)
            } finally {
                setLoading(false)
            }
        }
        getProductDetails();
    }, [])

    async function deleteProductFromCart(){
        try{
            const res = await fetchUserData()
            const currentCart = res?.cart;
            const updatedCart = currentCart.filter((item:string) => {
                const productid = Object.keys(item)[0];
                return productid != productID
            });
            const updatedUser = await axios.post("/api/user/updateuser", { userID, cart:updatedCart });
            console.log(updatedUser)
            toast.success("Product deleted from cart")
        } catch(err:any){
            toast.error("Error deleting product from cart")
        } finally{
            updateCart((prev)=>!prev)
        }
    }

    return (
        <>
            {loading
                ? <div className='w-[350px] flex items-center justify-center mb-5'>
                    <CircularProgressIndicator />
                </div>
                : <div className='relative flex rounded-md mx-2 my-3 border-collapse border-2 border-[#c2b4a3] max-w-[350px] sm:max-w-[500px]'>
                    <span className='cursor-pointer absolute rounded-full h-10 w-10 bg-[#c2b4a3] top-0 right-0 translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-xl text-black font-black'
                    onClick={()=>{
                        console.log("Following clg is from: /user/cart/<CartProductCards.tsx>")
                        deleteProductFromCart()
                    }}
                    >X</span>
                    <div className='w-full h-full bg-zinc-800 px-4 py-3 rounded-md flex gap-10 overflow-hidden'>
                        <div>
                            <img className='max-w-24 max-h-36 rounded-lg'
                                src={product?.image}
                                alt="Image not found" />
                        </div>
                        <div className='flex flex-col items-stretch justify-between overflow-hidden'>
                            {/* Product Name */}
                            <div>
                                <h1 className='text-md font-semibold w-full text-zinc-100 mb-2 pr-1 overflow-hidden'>
                                    {product?.name}
                                </h1>
                                <h1 className='text-[#c2b4a3] text-xl font-bold'>₹ {product?.price}</h1>
                            </div>
                            {/* Change Quantity */}
                            <div>
                                <div className='flex items-center w-80 gap-2'>
                                    <button className='px-3 py-2 text-[#c2b4a3]  bg-black border-2 border-[#c2b4a3] font-bold rounded-lg text-3xl text-center flex items-center justify-center'
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (cartQuantity > 0) {
                                                setCartQuantity(cartQuantity - 1);
                                            } else {
                                                toast.warning('Minimum 1 product is required')
                                            }
                                        }}>
                                        <Image src={minus} alt='Add' width={15} height={15} />
                                    </button>
                                    <input className='px-2 py-3 bg-zinc-800 rounded-md w-16 text-center' type="number" value={cartQuantity} id='qnty' disabled />
                                    <button className='px-3 py-2 text-[#c2b4a3]  bg-black border-2 border-[#c2b4a3] font-bold rounded-lg text-3xl text-center flex items-center justify-center'
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (cartQuantity < 10) {
                                                setCartQuantity(cartQuantity + 1);
                                            } else {
                                                toast.warning('Maximum 10 products are allowed')
                                            }
                                        }}>
                                        <Image src={add} alt='Add' width={15} height={15} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default CartProductsCard