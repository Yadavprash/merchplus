import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";
export async function POST(req:NextRequest){
    const {id,likes} = await req.json();
    
    if(!likes){
        return NextResponse.json({
            error :"Cannot create review"
        },{status : 400})
    }


    try {
        const response = await prisma.review.update({
            where:{
                id
            },
            data:{
                likes
            }
        })    
        
        return NextResponse.json(response);
    } catch (error) {
        return NextResponse.json({
            msg:"Error Incrementing Likes"
        })
    }

}