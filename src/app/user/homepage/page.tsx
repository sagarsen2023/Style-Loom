"use client"
import CircularProgressIndicator from '@/components/CircularProgressIndicator'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import fetchProductByCategory from '@/utils/fetchProductByCategory'
import StaticProductCard from '@/components/StaticProductCards/StaticProductCard'
import EmptyState from '@/components/EmptyState/EmptyState'
import fetchUserData from '@/utils/fetchUserData'

interface Productdata {
  _id: string,
  name: string,
  price: number,
  image: string,
  category: string,
  quantity: number
}

interface UserData {
  _id: string
}

const page = () => {
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([])
  const [categoryName, setCategoryName] = useState<string | undefined>("All")
  const categories = [
    "All",
    "Men Shirts",
    "Men Jackets",
    "Men Pants",
    "Women Tops",
    "Women Pants",
    "Women Skirts",
  ]


  const changeCategory = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (target.tagName === 'LABEL') {
      const category = target.innerText
      setCategoryName(category)
    }
  }

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const fetchedProducts = await fetchProductByCategory(categoryName!.toLowerCase().split(" ").join("_"))
      setProducts(fetchedProducts.data)
    } catch (err: any) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    async function getUserdata() {
      try {
        setLoading(true)
        await fetchProducts()
      } catch (err: any) {
        toast.error(err.message)
      } finally {
        setLoading(false)
      }
    }

    getUserdata()
  }, [])

  useEffect(() => {
    fetchProducts()
  }, [categoryName])

  return (
    <>
      <h1 className='text-center text-2xl px-4 font-bold pb-4'>Explore <span className='text-[#c2b4a3]'>Categories</span></h1>

      <h1 className='text-xl px-4 font-bold pb-4 text-center'>Current Category: <span className='text-[#c2b4a3]'>{categoryName}</span></h1>

      <div className='flex flex-wrap gap-3 w-full px-5 lg:justify-center' onClick={changeCategory} onAuxClick={changeCategory}>
        {
          categories.map((elem, index) =>
            <div className='m-2 min-w-fit' key={index}>
              <input type="radio" id={index.toString()} name='category' className='hidden peer' />
              <label className='w-fit px-4 py-2 border-2 rounded-lg border-[#7c7369] text-[#c2b4a3] peer-checked:bg-[#c2b4a3] peer-checked:text-black peer-checked:font-bold'
                htmlFor={index.toString()}>
                {elem}
              </label>
            </div>)
        }
      </div>
      {
        loading
          ? <>
            <div className='w-full h-[90vh] flex justify-center items-center'>
              <CircularProgressIndicator />
            </div>
          </>
          : products.length === 0
            ? <EmptyState
              headerText='Sorry there is no product in this category'
              description='When a seller adds a new product to this category you will see them here'
            />
            : <div className='flex items-center justify-center'>
              <div className=' mt-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2 xl:gap-5'>
                {
                  products.map((elem: Productdata, index) => {
                    return <StaticProductCard key={index}
                      name={elem.name}
                      price={elem.price}
                      category={elem.category}
                      productID={elem._id}
                      image={elem.image}
                      quantity={elem.quantity}
                    />
                  })
                }
              </div>
            </div>
      }
    </>
  )
}

export default page