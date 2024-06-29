"use client"
import React, { useEffect, useState } from 'react'
import fetchUserData from '@/utils/fetchUserData'
import { toast } from 'sonner'
import CircularProgressIndicator from '@/components/CircularProgressIndicator'
import CartProductsCard from '@/components/CartProductsCard'
import LoadingButton from '@/components/LoadingButton'

interface UserData {
  _id: string,
  cart: { [key: string]: { quantity: number } }[]; 
}

const page = () => {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<UserData | undefined>()
  useEffect(() => {
    async function getUser() {
      setLoading(true)
      try{
        const fetchedUser = await fetchUserData()
        setUser(fetchedUser)
      } catch(err:any) {
        toast.error(err.message)
      } finally{
        setLoading(false)
      }
    }

    getUser()
  }, [])

  if (loading)
    return <>
        <div className='w-full h-[90vh] flex justify-center items-center'>
            <CircularProgressIndicator />
        </div>
    </>

  return (
    <>
    <div className='flex flex-col items-center justify-center w-full'>
       {
        user?.cart.map((elem, index) => {
          const productID = Object.keys(elem)[0];
          const quantity = elem[productID].quantity;
  
          return (
              <CartProductsCard productID={productID} quantity={quantity}/>
          );
        })
      }
      <div className='mt-3 mb-10'>
      <LoadingButton loading={loading} text='Checkout' type='button'/>
      </div>
    </div>
     
    </>
  )
}

export default page