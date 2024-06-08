import mongoose from "mongoose";
import connectToDb from "@/dbconfig/dbconfig";
import User from "@/models/usermodel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs"


export async function POST(req : NextRequest, res : NextResponse) {
    await connectToDb();
    const reqBody = await req.json()
    const {username, password, email} = reqBody;
    try{
        const user = await User.findOne({username})
        if(user){
            return NextResponse.json({
                status : 400,
                message : "User already exists"
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
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