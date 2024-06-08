import connectToDb from "@/dbconfig/dbconfig";
import User from "@/models/user-model";
import Seller from "@/models/seller-model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs"


export async function POST(req : NextRequest, res : NextResponse) {
    await connectToDb();
    const reqBody = await req.json()
    const {name, password, email, type} = reqBody;
    try{

        let user; 
        if(type === "seller"){
            user = await Seller.findOne({email})
        }else{
            user = await User.findOne({email})
        }

        if(user){
            return NextResponse.json({
                status : 400,
                message : "User already exists"
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            password : hashedPassword,
            email
        })

        const savedUser = await newUser.save()

        return NextResponse.json({
            status : 201,
            message : "User created successfully",
            userData : savedUser,
        })

    }catch(err:any){
        return NextResponse.json({
            status : 500,
            message : err.message
        })
    }
}