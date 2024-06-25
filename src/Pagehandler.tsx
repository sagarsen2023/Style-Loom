"use client"
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
const Pagehandler = ({ cookieData, userType }: any) => {
  const router = useRouter()
  useEffect(() => {

    console.log("this fucking thing runs", cookieData, userType)

    cookieData === undefined || cookieData === ""
      ? router.replace("/auth/login")
      : userType === "seller" ? router.replace("/dashboard") : router.replace("/homepage")
  }, [cookieData, userType, router])
  return (
    <>
      <h1>Loading...</h1>
    </>
  )
}

export default Pagehandler