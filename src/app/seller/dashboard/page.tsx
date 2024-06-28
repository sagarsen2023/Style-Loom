"use client";
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import fetchUserData from '@/utils/fetchUserData';
import { toast } from 'sonner';
import CircularProgressIndicator from '@/components/CircularProgressIndicator';
import ProductCard from '@/components/DynamicProductCards/ProductCard';
import EmptyState from '@/components/EmptyState/EmptyState';

interface User {
  name: string,
  products: string[]
}

const page = () => {
  const [user, setUser] = useState<User | undefined>();
  const [loading, setLoading] = useState(true);

  async function getUser() {
    try {
      const fetchedUser = await fetchUserData();
      setUser(fetchedUser);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(()=>{
    getUser()
  },[])


  if (loading) return <>
    <div className='w-full h-[90vh] flex justify-center items-center'>
      <CircularProgressIndicator />
    </div>
  </>
  return (
    <div>
      <h1 className='text-2xl px-4 font-bold pb-4'>Welcome <span className='text-[#c2b4a3]'>{user?.name}</span></h1>
      <div>
        {user?.products.length == 0
          ? <EmptyState
          headerText='Seems that you have not added any product'
          description='Add a new product to view them here'
          />
          : <div className='w-full flex flex-col justify-evenly items-center my-4'>
            <h1 className='text-center text-2xl font-bold pb-4'>Your <span className='text-[#c2b4a3]'>Listings</span></h1>
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2 xl:gap-5'>
              {
                user?.products.map((_id, index) => (<ProductCard key={index} productID={_id}/>))
              }
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default page;