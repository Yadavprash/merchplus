import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req : NextRequest) {
  const categories = await prisma.category.findMany();
  return NextResponse.json({
    categories
  })
}


export async function POST(req : NextRequest) {
    const {categoryNames,productId}:{categoryNames:string[],productId:string} = await req.json();
    try {
        for (const name of categoryNames) {
            const category = await prisma.category.upsert({
              where: { name },
              update: {},
              create: { name },
            });
          
            await prisma.product.update({
              where: { id: productId },
              data: {
                categories: {
                  connect: { id: category.id },
                },
              },
            });
        }
        return NextResponse.json({
            msg:"Successfull added category to product"
        })

    } catch (error) {
        return NextResponse.json({
            msg:"Cannot add category to product"
        })    
    }

}