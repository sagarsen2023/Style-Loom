import axios from "axios";
import { toast } from "sonner";

export default async function fetchProductByCategory(category:string){
    try{
        const products = await axios.post("/api/product/getproductbycategory", {category})
        return products.data
    } catch(e:any){
       toast.error(e.message);
    }
}