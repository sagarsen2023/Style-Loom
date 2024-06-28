"use client"
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import CircularProgressIndicator from '@/components/CircularProgressIndicator'

const Pagehandler = ({ userId, userType }: any) => {
  const router = useRouter()
  useEffect(() => {
    userId === undefined || userId === ""
      ? router.replace("/auth/login")
      : userType.value === "seller" ? router.replace("/seller/dashboard") : router.replace("/user/homepage")
  }, [userId, userType, router])
  return (
    <>
      <CircularProgressIndicator/>
    </>
  )
}

export default Pagehandler