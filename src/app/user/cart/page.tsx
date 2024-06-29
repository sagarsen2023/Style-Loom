"use client"
import React, { useEffect, useState } from 'react'
import fetchUserData from '@/utils/fetchUserData'
import { toast } from 'sonner'
import CircularProgressIndicator from '@/components/CircularProgressIndicator'
import CartProductsCard from '@/components/CartProductsCard'
import LoadingButton from '@/components/LoadingButton'
import EmptyState from '@/components/EmptyState/EmptyState'
import checkout from '@/utils/checkout'

interface UserData {
  _id: string,
  cart: string[]
}

const page = () => {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<UserData | undefined>()
  const [cartUpdate, setCartUpdate] = useState(false)
  const [productQuantities, setProductQuantities] = useState<{ [key: string]: number }>({})

  let cartProducts: string[] = []

  async function getUser() {
    setLoading(true)
    try {
      const fetchedUser = await fetchUserData()
      setUser(fetchedUser)
    } catch (err: any) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function checkoutCart(e:any) {
    e.preventDefault()
    try {
      setLoading(true);
      const quantities = cartProducts.map(productID => productQuantities[productID] || 1);
      await checkout(cartProducts, quantities, user?._id!)
      setCartUpdate(true)
    } catch (err: any) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  const updateProductQuantity = (productID: string, quantity: number) => {
    setProductQuantities(prevQuantities => ({
      ...prevQuantities,
      [productID]: quantity
    }));
  };

  useEffect(() => {
    getUser()
  }, [])

  useEffect(() => {
    getUser()
  }, [cartUpdate])

  if (loading) return <>
    <div className='w-full h-[90vh] flex justify-center items-center'>
      <CircularProgressIndicator />
    </div>
  </>

  return (
    <>
      {
        user?.cart.length === 0
          ? <EmptyState headerText='Nothing is in your cart' description='Add some product to cart to view them here' />
          : <div className='flex flex-col items-center justify-center w-full'>
            {
              user?.cart.map((elem, index) => {
                cartProducts.push(elem)
                return (
                  <CartProductsCard
                    key={index}
                    productID={elem}
                    userID={user._id}
                    quantity={productQuantities[elem] || 1}
                    updateQuantity={updateProductQuantity}
                    updateCart={setCartUpdate}
                  />
                );
              })
            }
            <div className='mt-3 mb-10'>
              <div onClick={checkoutCart}>
                <LoadingButton loading={loading} text='Checkout' type='button' />
              </div>
            </div>
          </div>
      }
    </>
  )
}

export default page
