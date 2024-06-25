"use client"
import React, { useRef, useState } from 'react'
import { toast } from 'sonner';
import axios from 'axios'
import StyledInput from '@/components/StyledInput/StyledInput';
import {useRouter} from 'next/navigation';
import Link from 'next/link';

const page = () => {
  const router = useRouter()
  const nameInput = useRef<HTMLInputElement | null>(null)
  const emailInput = useRef<HTMLInputElement | null>(null)
  const passwordInput = useRef<HTMLInputElement | null>(null)
  const cPasswordInput = useRef<HTMLInputElement | null>(null)

  let [loading, setLoading] = useState(false)
  let [userType, setUserType] = useState("buyer")

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
      type: userType
    }

    try {
      setLoading(true)
      const response = await axios.post("/api/user/signup", userData)
      console.log(response.data)
      response.data.status == 400
        ? toast.info("User Already exists. Please login")
        : toast.success('Account Created Now Login')
      router.push('/auth/login')
    } catch (err: any) {
      toast.error(err.response.data.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className='min-h-[80vh] flex flex-col items-center justify-center md:h-[40vh]'>
        <h1 className='text-2xl text-center mb-5'>Registering as a <span className='text-[#c2b4a3] font-black'>{userType}</span></h1>
        <form className='w-full px-4 flex flex-col md:w-auto' onSubmit={handleSubmit}>

          <StyledInput labelText='Enter your name' placeholder='Enter name' reference={nameInput} type='text'/>
          <StyledInput labelText='Enter your email' placeholder='Enter email' reference={emailInput} type='email'/>
          <StyledInput labelText='Enter your password' placeholder='Choose password' reference={passwordInput} type='password'/>
          <StyledInput labelText='Confirm your password' placeholder='Confirm password' reference={cPasswordInput} type='password'/>

          <div className='flex flex-col justify-center items-center'>
            {loading
              ? <button type="button" className='px-2 py-2 bg-[#c2b4a3] w-56 flex justify-center items-center text-black font-bold rounded-lg m-5' disabled>
                <svg className="animate-spin h-5 w-5 mr-3 text-black" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>Processing</button>
              : <button className='px-2 py-2 bg-[#c2b4a3] w-28 text-black font-bold rounded-lg  m-5' type="submit">Register</button>
            }

            <h1 className='mt-1 mb-3 text-lg'>Have an Account? <span className='text-[#c2b4a3] mx-2 font-black select-none'
            onClick={()=>{
             
            }}
            ><Link href={"/auth/login"}>Login Here</Link></span></h1>

            <button className='px-5 py-2 text-[#c2b4a3] w-auto bg-black border-2 border-[#c2b4a3] font-bold rounded-lg'
              onClick={(e) => {
                e.preventDefault()
                toast.success(`Switched to ${userType}`)
                userType === "buyer" ? setUserType("seller") : setUserType("buyer")
              }}>Register as a {userType === "buyer" ? "Seller" : "Buyer"}</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default page