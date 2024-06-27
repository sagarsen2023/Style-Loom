import axios from "axios";
import { toast } from "sonner";

interface ProductID{
    productID: string
}

export default async function getProductDetails({productID}:ProductID){
    try{
        const res = await axios.post("/api/product/details", productID);
        return res.data;
    } catch(err:any){
        toast.error(err.message);
    }
}