import axios from "axios";
import { toast } from "sonner";
import fetchUserData from "./fetchUserData";

interface AddProductToCart {
    productID: string
}

export default async function addProductToCart({ productID }: AddProductToCart) {
    try {
        const res = await fetchUserData()
        console.log(res.cart, res._id)

        let userID = res._id
        const cart = res.cart

        if (cart.some((item: any) => item[productID])) {
            toast.warning("Product is already in cart");
            return;
        }

        cart.push({ [productID]: { quantity: 1 } });
        
        const updatedUser = await axios.post("/api/user/updateuser", { userID, cart });
        console.log(updatedUser.data)
        toast.success("Product added to cart")
    } catch (err: any) {
        toast.error(err.message);
    }
}