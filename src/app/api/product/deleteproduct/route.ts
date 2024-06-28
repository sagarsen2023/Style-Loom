import Product from "@/models/product-model";
import Seller from "@/models/seller-model";
import connectToDb from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse){
    try{
        await connectToDb()
        const reqBody = await req.json();
        const {productID, sellerID} = reqBody;
        await Product.findByIdAndDelete({_id: productID})
        const sellerData = await Seller.findById({_id: sellerID})
        sellerData.products = sellerData.products.filter((product:string) => product !== productID)
        await Seller.findByIdAndUpdate({_id: sellerID}, {products: sellerData.products})
        return NextResponse.json({
            status : 200,
            message: "Product deleted successfully"
        })
    } catch(err:any){
        return NextResponse.json({
            status : 500,
            message : err.message
        })
    }
}