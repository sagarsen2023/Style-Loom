import React, { LegacyRef } from 'react'

interface props  {
  reference: LegacyRef<HTMLInputElement>,
  labelText: string,
}

const StyledInput = ({reference, labelText}:props) => {
  return (
    <>
      <label className='text-xl pt-3 pb-2' htmlFor="email">{labelText}</label>
      <input className='px-2 py-3 bg-zinc-800 rounded-md md:w-96' type="text" id='email' placeholder='Enter name'
        ref={reference} />
    </>
  )
}

export default StyledInput