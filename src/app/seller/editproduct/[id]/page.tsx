"use client"
import React, { useEffect, useRef, useState } from 'react'
import CircularProgressIndicator from '@/components/CircularProgressIndicator'
import fetchProductDetails from '@/utils/fetchProductData'
import { toast } from 'sonner'
import StyledInput from '@/components/StyledInput'
import LoadingButton from '@/components/LoadingButton'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import add from "./add.svg"
import minus from "./minus.svg"
import axios from 'axios'

interface ProductData {
  name: string,
  description: string,
  price: number,
  category: string,
  image: string,
  quantity: number,
  createdBy: string
}

const page = ({ params }: { params: { id: string } }) => {
  const router = useRouter()
  const [productData, setProductData] = useState<ProductData | undefined>();
  const [quantity, setQuantity] = useState(0)
  const [loading, setLoading] = useState(false)

  const productID = params.id

  const productName = useRef<HTMLInputElement | null>(null)
  const productDescription = useRef<HTMLTextAreaElement | null>(null)
  const productPrice = useRef<HTMLInputElement | null>(null)
  const productCategory = useRef<HTMLSelectElement | null>(null)
  const productImage = useRef<HTMLInputElement | null>(null)

  async function handleSubmit(e: any) {
    e.preventDefault()
    const name = productName.current?.value;
    const description = productDescription.current?.value;
    const price = productPrice.current?.value;
    const category = productCategory.current?.value;
    const image = productImage.current?.value;
    try {
      if (!name || !description || !price || !image || !quantity) {
        toast.error('Please fill out all fields before submitting.');
        return;
      }
      if (category === "Change category") {
        toast.error('Please choose a category')
        return;
      }

      await axios.post("/api/product/editproduct", {
        productID,
        name,
        description,
        price,
        category,
        image,
        quantity
      })
      toast.success('Product updated successfully');
      router.push("/seller/dashboard")
    } catch (err: any) {
      toast.error(err.message)
    }
  }

  async function deleteProduct(e: any) {
    e.preventDefault()
    try {
      await axios.post("/api/product/deleteproduct", { productID, sellerID: productData?.createdBy });
      toast.success('Product deleted successfully');
      router.push("/seller/dashboard")
    } catch (err: any) {
      toast.error(err.message)
    }
  }

  useEffect(() => {
    setLoading(true)
    async function getProduct() {
      try {
        const product = await fetchProductDetails({ productID })
        setProductData(product)
        setQuantity(product?.quantity)
      } catch (err: any) {
        toast.error(err.message)
      } finally {
        setLoading(false)
      }
    }
    getProduct()
  }, [])

  if (loading) return <>
    <div className='w-full h-[90vh] flex justify-center items-center'>
      <CircularProgressIndicator />
    </div>
  </>


  return (
    <>
      <h1 className='text-2xl px-4 font-bold pb-4 text-center'>Edit <span className='text-[#c2b4a3]'>Product</span></h1>
      <div className='w-full'>
        <form className='w-full flex flex-col items-center justify-center' onSubmit={handleSubmit}>
          <StyledInput
            id='name'
            labelText='Change product name'
            placeholder={productData?.name}
            type='text'
            reference={productName}
            value={productData?.name}
          />

          <div className='flex flex-col gap-2 justify-center items-start'>
            <label className='text-xl mt-3' htmlFor="description">Product Description</label>
            <textarea
              className='w-60 h-32 px-2 py-3 bg-zinc-800 rounded-md md:w-96'
              name="description"
              id="description"
              placeholder='Enter product description'
              ref={productDescription}>
              {productData?.description}
            </textarea>
          </div>

          <StyledInput
            id='price'
            labelText='Change product price'
            placeholder={productData?.price.toString()}
            reference={productPrice}
            type='number'
            value={productData?.price.toString()}
          />

          <div className='mt-2 mb-3 flex flex-col items-center justify-center'>
            <label className='text-xl mb-2' htmlFor="qnty">Change Quantity</label>
            <div className='flex items-center justify-evenly w-80 gap-5'>
              <button className='px-5 py-2 text-[#c2b4a3] w-auto bg-black border-2 border-[#c2b4a3] font-bold rounded-lg text-3xl text-center flex items-center justify-center'
                onClick={(e) => {
                  e.preventDefault();
                  setQuantity(quantity - 1);
                }}>
                <Image src={minus} alt='Add' width={25} height={25} />
              </button>
              <input className='px-2 py-3 bg-zinc-800 rounded-md w-24 text-center' type="number" value={quantity} id='qnty' />
              <button className='px-5 py-2 text-[#c2b4a3] w-auto bg-black border-2 border-[#c2b4a3] font-bold rounded-lg text-3xl text-center flex items-center justify-center'
                onClick={(e) => {
                  e.preventDefault();
                  setQuantity(quantity + 1);
                }}>
                <Image src={add} alt='Add' width={25} height={25} />
              </button>
            </div>
          </div>

          <StyledInput
            id='imageLink'
            labelText='Change Image Link'
            placeholder={productData?.image}
            reference={productImage}
            type='text'
            value={productData?.image}
          />

          <div className='my-3 flex flex-col items-center justify-center'>
            <label htmlFor="category" className="text-xl pt-3 pb-2 mx-3">Category:
              <span className='text-[#c2b4a3] font-bold'> {productData?.category.split("_").join(" ")}</span>
            </label>
            <select id="category" className="px-2 py-3 bg-zinc-800 rounded-md md:w-64" ref={productCategory}>
              <option className='text-zinc-600' defaultValue={"Change category"}>Change category</option>
              <option value="men_shirts">Men Shirts</option>
              <option value="men_jackets">Men Jackets</option>
              <option value="men_pants">Men Pants</option>
              <option value="women_tops">Women Tops</option>
              <option value="women_pants">Women Pants</option>
              <option value="women_skirts">Women Skirts</option>
            </select>
          </div>
          <div className='flex justify-center items-center gap-10 pb-10'>
            <button className='mt-5 px-8 py-2 border-2 border-red-500 bg-zinc-800 front-bold text-sm rounded-lg' type='button'
              onClick={deleteProduct}
            >Delete Product</button>
            <LoadingButton loading={loading} text='Update' type='submit' />
          </div>
        </form>
      </div>
    </>
  )
}

export default page