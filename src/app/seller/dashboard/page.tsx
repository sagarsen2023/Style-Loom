"use client";
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import fetchUserData from '@/utils/fetchUserData';
import { toast } from 'sonner';
import CircularProgressIndicator from '@/components/CircularProgressIndicator';
import ProductCard from '@/components/ProductCards/ProductCard';
import empty from "./empty.svg"

interface User {
  name: string,
  products: []
}

const page = () => {
  const [user, setUser] = useState<User | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    getUser();
  }, []);

  if (loading) return <>
    <div className='w-full h-[90vh] flex justify-center items-center'>
      <CircularProgressIndicator />
    </div>
  </>
  return (
    <div>
      <h1 className='text-2xl px-4 font-bold pb-4'>Welcome <span className='text-[#c2b4a3]'>{user?.name}</span></h1>
      <pre>
        {JSON.stringify(user, null, 2)}
      </pre>

      <div>
        {user?.products.length == 0
          ? <div className='h-[70vh] flex flex-col items-center justify-center'>
            <Image src={empty} alt='Empty' height={100} width={100} />
            <h1 className='text-[#887f74] md:text-2xl font-bold'>Seems you have not added any product</h1>
            <p className='text-zinc-300 font-bold fonst-xl'>Add a product to view them here</p>
          </div>
          : <div className='w-full flex flex-col justify-evenly items-center my-4'>
            <h1 className='text-center text-2xl font-bold pb-4'>Your <span className='text-[#c2b4a3]'>Listings</span></h1>
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2 xl:gap-5'>
              {
                user?.products.map((product, index) => {
                  return <ProductCard key={index} isSeller={true} productID={product} />
                })
              }
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default page;