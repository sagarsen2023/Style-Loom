"use client"
import fetchUserData from '@/utils/fetchUserData'
import React, {useEffect} from 'react'

const page = () => {
  useEffect(() => {
    fetchUserData()
  }, [])
  
  return (
    <div>Homepage</div>
  )
}

export default page