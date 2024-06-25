"use client"
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
const Pagehandler = ({ userId, userType }: any) => {
  const router = useRouter()
  useEffect(() => {
    console.log("this fucking thing runs", userId, userType)
    userId === undefined || userId === ""
      ? router.replace("/auth/login")
      : userType.value === "seller" ? router.replace("/seller/dashboard") : router.replace("/user/homepage")
  }, [userId, userType, router])
  return (
    <>
      <h1>Loading...</h1>
    </>
  )
}

export default Pagehandler