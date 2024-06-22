import React, { HTMLInputTypeAttribute, LegacyRef } from 'react'

interface props  {
  reference: LegacyRef<HTMLInputElement>,
  labelText: string,
  type: HTMLInputTypeAttribute,
  placeholder: HTMLInputTypeAttribute
}

const StyledInput = ({reference, labelText, type, placeholder}:props) => {
  return (
    <>
      <label className='text-xl pt-3 pb-2' htmlFor={type.toString()}>{labelText}</label>
      <input className='px-2 py-3 bg-zinc-800 rounded-md md:w-96' type={type} id={type.toString()} placeholder={placeholder}
        ref={reference} />
    </>
  )
}

export default StyledInput