import User from "@/models/user-model";
import Seller from "@/models/seller-model";
import { NextRequest, NextResponse } from "next/server";
import connectToDb from "@/dbconfig/dbconfig";
import bcrypt from "bcryptjs"
import { cookies } from 'next/headers'

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        await connectToDb();
        const reqBody = await req.json();
        const { email, password, type } = reqBody;
        
        let user;
        
        type === "seller"
            ? user = await Seller.findOne({ email })
            : user = await User.findOne({ email })
        
        if (!user) {
            return NextResponse.json({
                message: "User not found. Please Create an account",
                status: 404
            })
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({
                message: "Invalid Credentials",
                status: 401
            })
        }

        cookies().set("_user", user._id)
        cookies().set("_userType", type)

        return NextResponse.json({
            message: "Login Successful",
            status: 200,
            userdata: user
        })

    } catch (err: any) {
        return NextResponse.json({
            message: err.message,
            status: 500
        })
    }
}
