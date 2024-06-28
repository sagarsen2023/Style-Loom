"use client"
import CircularProgressIndicator from '@/components/CircularProgressIndicator'
import fetchUserData from '@/utils/fetchUserData'
import React, {useEffect, useState} from 'react'
import { toast } from 'sonner'

interface UserData{
  // Structure the interface
}

const page = () => {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState()

  useEffect(() => {  
    async function getUserdata() {
      try{
        setLoading(true)
        const fetchedUser = await fetchUserData()
        setUser(fetchedUser)
      } catch (err:any) {
        toast.error(err.message)
      } finally{
        setLoading(false)
      }
    }
    getUserdata()
  }, [])
  
  if (loading) return <>
  <div className='w-full h-[90vh] flex justify-center items-center'>
    <CircularProgressIndicator />
  </div>
</>

  return (
    <>
    <pre>
      User Data:
      {JSON.stringify(user, null, 2)}
    </pre>
    </>
  )
}

export default page