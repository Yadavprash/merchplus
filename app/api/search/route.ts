import prisma from "@/db";
import { NextResponse } from "next/server";
import {redisClient} from "@/lib/redis";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const searchQuery = searchParams.get('q') || "";
  const cacheKey = `search_${searchQuery.trim().toLowerCase()}`;

  try {
    const cachedItems = await redisClient.get(cacheKey);
    if (cachedItems) {
      return NextResponse.json({
        msg: JSON.parse(cachedItems),
        fromCache: true
      });
    }

    const items = await prisma.product.findMany({
      where: {
        name: {
          contains: searchQuery,
          mode: 'insensitive',
        }
      }
    });

    await redisClient.set(cacheKey, JSON.stringify(items), { EX: 3600 });

    return NextResponse.json({
      msg: items,
      fromCache: false
    });
  } catch (error) {
    return NextResponse.json({
      msg: "Error fetching items"
    }, { status: 500 });
  }
}
