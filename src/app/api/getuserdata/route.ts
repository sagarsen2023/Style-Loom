import User from "@/models/user-model";
import Seller from "@/models/seller-model";
import connectToDb from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse){
    await connectToDb();
    const reqBody = await req.json();
    const { _userID, _userType} = reqBody;

    try{
        let user;
        _userType === "seller"
            ? user = await Seller.findOne({_id : _userID})
            : user = await User.findOne({_id : _userID})

        return NextResponse.json({
            status : 200,
            userData : user
        })

    }catch(err:any){
        return NextResponse.json({
            status : 500,
            message : err.message
        })
    }
}