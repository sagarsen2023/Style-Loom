A beautiful looking ecommerce app is under development right now

                    async () => {
                      setLoading(true)
                      try{
                        await deleteProduct({productID})
                        const userData = await fetchUserData()
                        const productIDIndex = userData.products.indexOf(productID)
                        userData.products.splice(productIDIndex, 1);
                        await axios.post('/api/user/updateseller', { _id: userData._id, products: userData.products }).then(()=>{
                          setRefresh((prev)=>!prev)
                        })
                        toast.success("Product deleted successfully")
                      } catch(err:any){
                        toast.error(err.message)
                      } finally{
                        setLoading(false)
                      }
                    }



                     {
                isSeller
                  ? <></>
                  : 
              }