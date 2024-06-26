"use client"
import axios from 'axios'
import React, { useEffect } from 'react'

const page = () => {

    async function fetchData(){
      const _userID = document.cookie.split('; ')
      .find(row => row.startsWith('_user='))
      ?.split('=')[1];
    console.log(_userID)

    const _userType = document.cookie.split('; ')
      .find(row => row.startsWith('_userType='))
      ?.split('=')[1];
    console.log(_userType)
    const sellerData = await axios.post("/api/getuserdata", {_userID, _userType})
    console.log(sellerData.data.userData)
    }

    useEffect(()=>{
      fetchData();
    })


  return (
    <>
      <h1 className='text-2xl text-center font-bold pb-4'>Dash<span className='text-[#c2b4a3]'>board</span></h1>
      <div>
        {/* Add product form */}

        {/* Added products */}
      </div>
    </>
  )
}

export default page