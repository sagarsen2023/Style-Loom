import axios from "axios";
import { toast } from "sonner";
import fetchUserData from "./fetchUserData";

interface AddProductToCart {
    productID: string
}

export default async function addProductToCart({ productID }: AddProductToCart) {
    try {
        const res = await fetchUserData()

        let userID = res._id
        const cart = res.cart

        const productIdIndex = cart.indexOf(productID)
        if (productIdIndex > -1) {
            toast.warning("Product is already in cart");
            return;
        }
        cart.push(productID);
        await axios.post("/api/user/updateuser", { userID, cart });
        toast.success("Product added to cart")
    } catch (err: any) {
        toast.error(err.message);
    }
}