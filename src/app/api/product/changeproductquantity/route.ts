import Product from "@/models/product-model";
import connectToDb from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    try{
        await connectToDb()
        const reqbody = await req.json()
        const {productID, quantity} = reqbody;

        const product = await Product.findById({_id: productID})

        let currentQuantity = product.quantity
        currentQuantity -= quantity

        await Product.findByIdAndUpdate({_id: productID}, {quantity: currentQuantity})
        return NextResponse.json({
            status: 200,
            message: "Product quantity updated successfully"
        })
    } catch(err:any){
        return NextResponse.json({
            status: 500,
            message: err.message
        })
    }
}