import axios from "axios";
import { toast } from "sonner";

interface ProductID{
    productID: string
}

export default async function deleteProduct({productID}:ProductID ){
    try{
        const res = await axios.post("/api/product/deleteproduct", {productID});
        return res.data.data;
    } catch(err:any){
        toast.error(err.message);
    }
}