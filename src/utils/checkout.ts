import React from "react";
import axios from "axios";
import { toast } from "sonner";
import fetchProductDetails from "./fetchProductData";

interface CartProducts{
    cartProducts: string[],
    quantities: number[],
    userID : string,
    setCartUpdate: React.Dispatch<React.SetStateAction<boolean>>
}

async function checkQuantity(productID: string, quantity: number) {
    const oneProductData = await fetchProductDetails({ productID });
    return oneProductData.quantity >= quantity;
}

async function orderProduct(productID: string, quantity: number) {
    try {
        await axios.post("/api/product/changeproductquantity", { productID, quantity })
        return true
    } catch (err: any) {
        return false
    }
}

export default async function checkout({cartProducts, quantities, userID, setCartUpdate}:CartProducts) {
    try {
        const quantityChecks = cartProducts.map((productID, index) =>
            checkQuantity(productID, quantities[index])
        );
        const results = await Promise.all(quantityChecks);
        const allProductsAvailable = results.every(result => result);
        if (!allProductsAvailable) {
            toast.error("Not all products are available in the required quantity");
            return;
        }

        toast.success("All products are available in the required quantity. Proceeding with checkout...");

        const checkOut = cartProducts.map((productID, index) =>
            orderProduct(productID, quantities[index])
        );
        await Promise.all(checkOut);
        await axios.post("/api/user/updateuser", { userID, cart: [] });
        toast.success("Checkout completed successfully");

    } catch (err: any) {
        toast.error(err.message);
    }
}
