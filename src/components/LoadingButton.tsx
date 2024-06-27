"use client"
import React, { useEffect } from 'react'

interface Buttondata {
    text: string,
    loading: boolean,
    type: "button" | "submit" | "reset" | undefined
}

const LoadingButton = ({ text, loading, type }: Buttondata) => {
    return (
        <>
            {loading
                ? <button type="button" className='px-2 py-2 bg-[#c2b4a3] w-56 flex justify-center items-center text-black font-bold rounded-lg mt-5 mx-auto' disabled>
                    <svg className="animate-spin h-5 w-5 mr-3 text-black" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>Processing</button>
                : <button className='px-10 py-2 bg-[#c2b4a3] w-fit text-black font-bold rounded-lg mt-5 mx-auto' type={type}>{text}</button>
            }
        </>
    )
}

export default LoadingButton