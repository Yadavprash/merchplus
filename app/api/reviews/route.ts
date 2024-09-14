import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";
export async function POST(req:NextRequest){
    const {productId,title,review,rating,username,userImage} = await req.json();
    
    if(!productId||!title||!review||!rating||!username||!userImage){
        return NextResponse.json({
            error :"Cannot create review"
        },{status : 400})
    }


    try {
        const response = await prisma.review.create({
            data:{
                productId,
                title,
                review,
                rating,
                username,
                userImage
            }
        })    
        
        return NextResponse.json(response);
    } catch (error) {
        return NextResponse.json({
            msg:"Cannot create review"
        })
    }

}