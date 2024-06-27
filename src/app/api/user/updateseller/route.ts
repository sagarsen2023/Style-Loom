import Seller from "@/models/seller-model";
import connectToDb from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    await connectToDb()
    const reqBody = await req.json()
    const { _id, products } = reqBody;
    try{
        await Seller.findByIdAndUpdate({_id}, {products})
        return NextResponse.json({
            status : 200
        })
    } catch (err:any) {
      return NextResponse.json({
        status : 500,
        message : err.message
      })
    }
   
}