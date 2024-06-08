import Product from "@/models/product-model";
import connectToDb from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest, res : NextResponse) {
    try{
        await connectToDb()
        const reqBody = await req.json();
        const { _id } = reqBody;
        const product = await Product.findOne({_id});
        return NextResponse.json({
            status : 200,
            data : product
        })
    } catch(err : any){
        return NextResponse.json({
            status : 500,
            message : err.message
        })
    }
}