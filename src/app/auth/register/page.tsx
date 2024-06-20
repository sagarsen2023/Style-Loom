"use client"
import React, { useRef, useState } from 'react'
import Header from '@/components/Header/Header'
import { Toaster, toast } from 'sonner';
import axios from 'axios'

const page = () => {
  const nameInput = useRef<HTMLInputElement | null>(null)
  const emailInput = useRef<HTMLInputElement | null>(null)
  const passwordInput = useRef<HTMLInputElement | null>(null)
  const cPasswordInput = useRef<HTMLInputElement | null>(null)  

  let [loading, setLoading] = useState(false)

  const handleSubmit = async (event: any) => {
    event.preventDefault()

    const name = nameInput.current?.value
    const email = emailInput.current?.value
    const password = passwordInput.current?.value
    const cPassword = cPasswordInput.current?.value

    if (password !== cPassword) {
      toast.error('Passwords do not match')
      return
    }
    if (password!.length < 6) {
      toast.warning('Passwords must be at least 6 characters')
      return
    }
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email!)) {
      toast.error('Invalid email address')
      return
    }

    const userData = {
      name,
      email,
      password,
      type: "buyer"
    }

    try {
      setLoading(true)
      await axios.post("/api/user/signup", userData)
      toast.success('Account Created Now Login')
    } catch (err: any) {
      toast.error(err.response.data.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header />
      <Toaster position="top-center" richColors theme='dark'/>
      <div className='min-h-[70vh] flex flex-col items-center justify-center md:h-[50vh]'>
        <h1 className='text-2xl text-center mb-5'>Registering as a <span className='text-[#c2b4a3] font-bold'>Buyer</span></h1>
        <form className='w-full px-4 flex flex-col md:w-auto' onSubmit={handleSubmit}>
          <label className='text-xl py-2' htmlFor="email">Enter your name</label>
          <input className='px-2 py-3 bg-zinc-800 rounded-md md:w-96' type="text" id='email' placeholder='Enter name'
            ref={nameInput} />

          <label className='text-xl py-2' htmlFor="email">Enter your email</label>
          <input className='px-2 py-3 bg-zinc-800 rounded-md md:w-96' type="text" id='email' placeholder='Enter Email'
            ref={emailInput} />

          <label className='text-xl pt-3 pb-2' htmlFor="password">Enter your password</label>
          <input className='px-2 py-3 bg-zinc-800 rounded-md md:w-96' type="text" id='password' placeholder='Create Password'
            ref={passwordInput} />

          <label className='text-xl pt-3 pb-2' htmlFor="cPassword">Confirm your password</label>
          <input className='px-2 py-3 bg-zinc-800 rounded-md md:w-96' type="text" id='cPassword' placeholder='Confirm Password'
            ref={cPasswordInput}
          />

          <div className='flex flex-col justify-center items-center'>
            {loading
              ? <button type="button" className='px-2 py-2 bg-[#c2b4a3] w-56 flex justify-center items-center text-black font-bold rounded-lg m-5' disabled>
                <svg className="animate-spin h-5 w-5 mr-3 text-black" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>Processing</button>
              : <button className='px-2 py-2 bg-[#c2b4a3] w-28 text-black font-bold rounded-lg  m-5' type="submit">Register</button>}
            <button className='px-5 py-2 text-[#c2b4a3] w-auto bg-black border-2 border-[#c2b4a3] font-bold rounded-lg'>Register as a Seller</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default page