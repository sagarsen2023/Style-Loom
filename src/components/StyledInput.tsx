import React, { HTMLInputTypeAttribute, LegacyRef } from 'react'

interface props  {
  reference: LegacyRef<HTMLInputElement>,
  labelText: string,
  type: HTMLInputTypeAttribute,
  placeholder: HTMLInputTypeAttribute,
  id: HTMLInputTypeAttribute,
}

const StyledInput = ({reference, labelText, type, placeholder, id}:props) => {
  return (
    <>
      <div className='flex flex-col'>
      <label className='text-xl pt-3 pb-2' htmlFor={id}>{labelText}</label> 
      <input className='px-2 py-3 bg-zinc-800 rounded-md md:w-96' type={type} id={id} placeholder={placeholder}
        ref={reference} />
      </div>
    </>
  )
}

export default StyledInput