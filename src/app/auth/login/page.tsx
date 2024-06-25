"use client"
import React, { useState, useRef } from 'react';
import StyledInput from '@/components/StyledInput/StyledInput';
import axios from 'axios';
import { toast } from 'sonner';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const page = () => {
  const router = useRouter()
  let [loading, setLoading] = useState(false)
  let [isSeller, setSeller] = useState(false)
  const emailInput = useRef<HTMLInputElement | null>(null)
  const passwordInput = useRef<HTMLInputElement | null>(null)

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const email = emailInput.current?.value
    const password = passwordInput.current?.value
    setLoading(true)
    try {
      const type = isSeller? "seller" : "buyer"
      const response = await axios.post('/api/user/login', { email, password, type })
      if (email === "" || password === "") {
        toast.warning("Please fill all the fields")
        return
      }

      if (response.data.status >= 400) {
        toast.error(response.data.message)
        return
      }
      toast.success(response.data.message)
      
      type === "seller" 
      ? router.replace("/seller/dashboard")
      : router.replace("/user/homepage")

    } catch (err: any) {
      toast.error("Some error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className='flex justify-center items-center h-[70vh] flex-col'>
        <h1 className='text-2xl font-bold pb-4'>Style<span className='text-3xl text-[#c2b4a3]'>.</span>Loom</h1>
        <form className='flex flex-col' onSubmit={handleSubmit}>
          <StyledInput
            labelText='Enter Your email'
            placeholder='Enter email'
            type='email'
            reference={emailInput}
          />
          <StyledInput
            labelText='Enter Your password'
            placeholder='Enter password'
            type='password'
            reference={passwordInput}
          />


          <div className="flex items-center justify-center pt-5">
            <input id="red-checkbox" type="checkbox" className="accent-transparent focus:accent-[#c2b4a3] w-5 h-5"
              onClick={() => {setSeller(!isSeller)}} />
            <label htmlFor="red-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I am a seller</label>
          </div>

          {loading
            ? <button type="button" className='px-2 py-2 bg-[#c2b4a3] w-56 flex justify-center items-center text-black font-bold rounded-lg mt-5 mx-auto' disabled>
              <svg className="animate-spin h-5 w-5 mr-3 text-black" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>Processing</button>
            : <button className='px-2 py-2 bg-[#c2b4a3] w-28 text-black font-bold rounded-lg mt-5 mx-auto' type="submit">Login</button>
          }
        </form>

        <div className='flex flex-col pt-5 gap-3'>
          <h1>Don't have an account?</h1>
          <button className='px-5 py-2 text-[#c2b4a3] w-auto bg-black border-2 border-[#c2b4a3] font-bold rounded-lg'>
            <Link href={"/auth/signup"}>Create Acccount</Link>
          </button>

        </div>

      </div>
    </>
  )
}

export default page