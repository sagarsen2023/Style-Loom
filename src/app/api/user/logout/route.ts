import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request, res: NextResponse) {
    try{
        cookies().delete("_user")
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