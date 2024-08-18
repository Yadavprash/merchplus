import prisma from "@/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const searchQuery = searchParams.get('q') || "";
    const items = await prisma.product.findMany({
        where:{
            name : {
            contains: searchQuery,
            mode: 'insensitive', 
            }
        }
    })
    return NextResponse.json({
        msg: items
    })
}