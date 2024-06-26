"use client"
import fetchData from '@/utils/fetchData'
import React, { useEffect, useRef } from 'react'
import StyledInput from '@/components/StyledInput'

const page = () => {
  const productNameRef = useRef(null)
  const productValueRef = useRef(null)
  const productImageRef = useRef(null)
  const productQuantityRef = useRef(null)
  useEffect(() => {
    fetchData();
  })

  return (
    <>
      <h1 className='text-2xl text-center font-bold pb-4'>Dash<span className='text-[#c2b4a3]'>board</span></h1>
      <div>
        <form className='flex flex-col items-center justify-center' action="">
          <StyledInput
            labelText='Enter Product Name'
            placeholder='Product name'
            id='productname'
            reference={productNameRef}
            type='text'
          />
          <div className='flex flex-col gap-2 justify-center items-start'>
            <label className='text-xl mt-3' htmlFor="description">Product Description</label>
            <textarea className='w-60 h-32 px-2 py-3 bg-zinc-800 rounded-md md:w-96' name="description" id="description" placeholder='Enter product description'></textarea>
          </div>
          <StyledInput
            labelText='Enter Product value'
            placeholder='Product value'
            id='productvalue'
            reference={productValueRef}
            type='text'
          />
          <StyledInput
            labelText='Give an image link'
            placeholder='image link'
            id='productimage'
            reference={productImageRef}
            type='text'
          />
          <StyledInput
            labelText='Quantity available in stock'
            placeholder='Qnty'
            id='productquantity'
            reference={productQuantityRef}
            type='number'
          />

          <div className='my-3'>
            <label htmlFor="countries" className="text-xl pt-3 pb-2">Category</label>
            <select id="countries" className="px-2 py-3 bg-zinc-800 rounded-md md:w-96">
              <option selected>Choose a category</option>
              <option value="mens_clothing_shirts">Men's Shirts</option>
              <option value="mens_clothing_tshirts">Men's T-Shirts</option>
              <option value="mens_clothing_pants">Men's Pants</option>
              <option value="mens_clothing_jeans">Men's Jeans</option>
              <option value="mens_clothing_jackets">Men's Jackets</option>
              <option value="womens_clothing_tops">Women's Tops</option>
              <option value="womens_clothing_pants">Women's Pants</option>
              <option value="womens_clothing_skirts">Women's Skirts</option>
            </select>
          </div>
          <button type='submit' className='px-2 py-2 bg-[#c2b4a3] w-56 flex justify-center items-center text-black font-bold rounded-lg m-5'>Add Product</button>
        </form>

        {/* Added products */}
      </div>
    </>
  )
}

export default page