import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";
import {redisClient} from "@/lib/redis";

export async function POST(req: NextRequest) {
  const { query }: { query: string } = await req.json();
  const cacheKey = `search_${query.trim().toLowerCase()}`;

  if (typeof query !== "string" || !query.trim()) {
    return NextResponse.json({
      msg: "Invalid query parameters"
    });
  }

  try {
    const cachedProducts = await redisClient.get(cacheKey);
    if (cachedProducts) {
      return NextResponse.json({
        products: JSON.parse(cachedProducts),
        fromCache: true
      });
    }

    const products = await prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { categories: { some: { name: { contains: query, mode: "insensitive" } } } },
          { description: { contains: query, mode: "insensitive" } }
        ]
      },
      include: {
        categories: true,
        styles: {
          include: {
            images: {
              orderBy: {
                url: "asc"
              }
            }
          }
        }
      }
    });

    await redisClient.set(cacheKey, JSON.stringify(products), { EX: 3600 });

    return NextResponse.json({ products, fromCache: false });
  } catch (error) {
    return NextResponse.json({
      msg: "Invalid query parameters"
    });
  }
}
