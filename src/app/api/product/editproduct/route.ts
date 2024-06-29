import Product from "@/models/product-model";
import connectToDb from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse){
    await connectToDb()
    const reqBody = await req.json()
    const {name, description, price, category, quantity, image, productID} = reqBody;
    try{
        await Product.findByIdAndUpdate({_id: productID}, {
            name,
            description,
            price,
            category,
            quantity,
            image
        }, {new: true});
        return NextResponse.json({
            status : 200,
            message : "Product updated successfully"
        })
        
    }catch(error){
        return NextResponse.json({
            status : 500,
            message : "Internal Server Error"
        })
    }
}