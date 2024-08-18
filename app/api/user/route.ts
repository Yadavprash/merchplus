import { NextRequest, NextResponse } from "next/server";
import prisma  from '@/db';

export async function GET(req : NextRequest){
    const users = await prisma.user.findMany({
        include:{
            userCart : true
        }
    });
    return NextResponse.json({
        user : users
    })
}

export async function POST(req : NextRequest){
    const data  = await req.json();
    const result = await prisma.user.create({
        data:{
            name : data.name,
            email : data.email,
            password : data.password
        }
    })
    console.log(result);
    return NextResponse.json({
        msg:"User Created"
    })
}