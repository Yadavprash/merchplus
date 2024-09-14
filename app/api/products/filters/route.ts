import { NextRequest, NextResponse } from "next/server";
import prisma from '@/db';
export async function GET(req: Request) {
  const url = new URL(req.url);
  const categoryNames = url.searchParams.get("category")?.split(",") ?? [];
 
  try {
    if (categoryNames.length > 0) {

      const products = await prisma.product.findMany({
        where: {
          categories: {
            some: {
              name: {
                in: categoryNames,
              },
            },
          },
        },
        include: {
          categories: true,
          reviews: true,
          styles: {
            include: {
              images: {
                orderBy: {
                  url: 'asc'
                }
              }
            },
          }
        }
      });
      return NextResponse.json({
        products
      })
    } 
  } catch (error) {
    return NextResponse.json({
      err: "Cannot get products"
    })
  }
}