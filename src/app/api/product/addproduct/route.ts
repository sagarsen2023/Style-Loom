import Product from "@/models/product-model";
import connectToDb from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest, res : NextResponse) {
    await connectToDb();
    const reqBody = await req.json()
    const {name, description, price, category, quantity, image} = reqBody;
    try{
        const product = new Product({
            name,
            description,
            price,
            category,
            quantity,
            image
        })
        await product.save();
        return NextResponse.json({
            status : 200,
            message : "Product added successfully"
        })
    }catch(err:any){
        return NextResponse.json({
            status : 500,
            message : err.message
        })
    }
}