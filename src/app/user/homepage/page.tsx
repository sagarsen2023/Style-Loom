"use client"
import fetchData from '@/utils/fetchData'
import React, {useEffect} from 'react'

const page = () => {
  useEffect(() => {
    fetchData()
  }, [])
  
  return (
    <div>Homepage</div>
  )
}

export default page