import User from "@/models/usermodel";
import { NextRequest, NextResponse } from "next/server";
import connectToDb from "@/dbconfig/dbconfig";
import bcrypt from "bcryptjs"

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        await connectToDb();
        const reqBody = await req.json();
        const { email, password } = reqBody;
        console.log(email, password)
        const user = await User.findOne({ email });
        console.log(user)
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
        res.cookies.set("token" , user._id)
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
