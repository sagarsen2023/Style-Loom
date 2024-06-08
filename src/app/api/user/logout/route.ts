import { NextResponse } from "next/server";

export async function POST(req: Request, res: NextResponse) {
    try{
        res.cookies.set("token" , "")
        return NextResponse.json({
            status : 200,
            message : "Logout Successful"
        })
    }catch(err:any){
        return NextResponse.json({
            status : 500,
            message : err.message
        })
    }
}