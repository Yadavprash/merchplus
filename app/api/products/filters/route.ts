import { NextRequest, NextResponse } from "next/server";
import prisma  from '@/db';
export async function GET(req : Request){
    const url = new URL(req.url);
    const categoryNames = url.searchParams.get("category")?.split(",") ?? [];
    try {
        const products = await prisma.product.findMany({
            where: {
              categories: {
                some: {
                  name: {
                    in: categoryNames,  // Replace with the category names you want to filter by
                  },
                },
              },
            },
            include:{
                categories:true,
                reviews:true,
                styles:{
                  include :{
                    images : {
                      orderBy:{
                        url:'asc'
                      }
                    }
                  }
                }
              }
          });
        return NextResponse.json({
            products
        })
    } catch (error) {
        return NextResponse.json({
            err:"Cannot get products"
        })
    }
}