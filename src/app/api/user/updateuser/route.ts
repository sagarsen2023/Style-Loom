import User from "@/models/user-model";
import connectToDb from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        await connectToDb();
        const reqbody = await req.json();
        const { cart, userID } = reqbody;
        const userData = await User.findByIdAndUpdate({ _id: userID }, {cart});
        console.log(userData)
        return NextResponse.json({
            status: 200,
            message: "User data updated successfully"
        })
    } catch (err:any) {
        return NextResponse.json({
            status: 500,
            message: err.message,
        })
    }
}