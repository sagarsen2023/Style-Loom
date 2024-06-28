import Product from "@/models/product-model";
import connectToDb from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest, res:NextResponse) {
    await connectToDb()
    const reqBody = await req.json()
    const {category} = reqBody;
    console.log(category)
     try{
        let products;
        category === "all" 
        ? products = await Product.find()
        :  products = await Product.find({category})
        return NextResponse.json({
            message: "Updated Product category",
            data: products
        })
     } catch(err:any){
         return NextResponse.json({
             status : 500,
             message : err.message
         })
     }
}