"use client"
import React, { useState, useEffect, useRef } from 'react'
import fetchUserData from '@/utils/fetchUserData'
import StyledInput from '@/components/StyledInput'
import { toast } from 'sonner'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import LoadingButton from '@/components/LoadingButton'

interface User {
  _id: string,
  email: string,
  name: string,
  products: string[]
}

const page = () => {
  const productNameRef = useRef<HTMLInputElement | null>(null)
  const productDescriptionRef = useRef<HTMLTextAreaElement | null>(null);
  const productValueRef = useRef<HTMLInputElement | null>(null)
  const productImageRef = useRef<HTMLInputElement | null>(null)
  const productQuantityRef = useRef<HTMLInputElement | null>(null)
  const productCategoryRef = useRef<HTMLSelectElement | null>(null)
  const router = useRouter()
  const [user, setUser] = useState<User | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUser() {
      setLoading(true)
      try {
        const fetchedUser = await fetchUserData();
        setUser(fetchedUser);
      } catch (err: any) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    }
    getUser();
  }, [])

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    const name = productNameRef.current?.value
    const description = productDescriptionRef.current?.value
    const price = productValueRef.current?.value
    const image = productImageRef.current?.value
    const quantity = productQuantityRef.current?.value
    const category = productCategoryRef.current?.value
    const createdBy = user?._id
    console.log(name, description, price, image, quantity, category)
    try {
      if (!name || !description || !price || !image || !quantity) {
        toast.error('Please fill out all fields before submitting.');
        return;
      }

      if (category === "Choose a category") {
        toast.error('Please choose a category')
        return;
      }


      const response = await axios.post('/api/product/addproduct', { name, description, price, image, quantity, category, createdBy })
      user?.products.push(response.data.savedProduct._id)
      const result = await axios.post('/api/user/updateseller', { _id: user?._id, products: user?.products })
      console.log(result)
      toast.success('Product added successfully');
      setLoading(false)
      router.back()
    } catch (err: any) {
      console.log("error here")
      toast.error(err.message)
    }
    finally{
      setLoading(false)
    }
  }

  return (
    <>
      <h1 className='text-2xl text-center font-bold pb-4'>Dash<span className='text-[#c2b4a3]'>board</span></h1>
      <div>
        <form className='flex flex-col items-center justify-center' onSubmit={handleSubmit}>
          <StyledInput
            labelText='Enter Product Name'
            placeholder='Product name'
            id='productname'
            reference={productNameRef}
            type='text'
          />
          <div className='flex flex-col gap-2 justify-center items-start'>
            <label className='text-xl mt-3' htmlFor="description">Product Description</label>
            <textarea
              className='w-60 h-32 px-2 py-3 bg-zinc-800 rounded-md md:w-96'
              name="description"
              id="description"
              placeholder='Enter product description'
              ref={productDescriptionRef}>
            </textarea>
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

          <div className='my-3 '>
            <label htmlFor="category" className="text-xl pt-3 pb-2 mx-3">Category</label>
            <select id="category" className="px-2 py-3 bg-zinc-800 rounded-md md:w-64" ref={productCategoryRef}>
              <option className='text-zinc-600' defaultValue={"Choose a category"}>Choose a category</option>
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
          <LoadingButton
            loading={loading}
            text='Add Product'
            type='submit'
          />
        </form>
      </div>
    </>
  )
}

export default page