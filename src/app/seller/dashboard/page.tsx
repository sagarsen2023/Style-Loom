"use client";
import React, { useEffect, useState } from 'react';
import fetchData from '@/utils/fetchData';
import { toast } from 'sonner';
import CircularProgressIndicator from '@/components/CircularProgressIndicator';

interface User {
  name: string,
  products: []
}

const RouteComponent = () => {
  // State to hold the fetched user data
  const [user, setUser] = useState<User | undefined>();
  const [loading, setLoading] = useState(true);

  // useEffect to fetch data when the component mounts
  useEffect(() => {
    async function getUser() {
      try {
        const fetchedUser = await fetchData();
        setUser(fetchedUser);
      } catch (err: any) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    }
    getUser();
  }, []);

  // Conditional rendering based on loading, error, and user state
  if (loading) return <>
    <div className='w-full h-[90vh] flex justify-center items-center'>
      <CircularProgressIndicator/>
    </div>
  </>
  return (
    <div>
     <h1 className='text-2xl px-4 font-bold pb-4'>Welcome<span className='text-[#c2b4a3]'>{user?.name}</span></h1>
      <pre>
      {JSON.stringify(user, null, 2)}
      </pre>

      <div>
        {user?.products.length === 0
        ? <h1>No products here. Addd a product</h1>
        : <h1>Data here</h1>
        }
      </div>
    </div>
  );
}

export default RouteComponent;