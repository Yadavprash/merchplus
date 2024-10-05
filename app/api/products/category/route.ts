import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { redisClient } from "@/lib/redis";

export async function GET(req: NextRequest) {
  const cacheKey = "categories";
  try {
    const cachedCategories = await redisClient.get(cacheKey);
    if (cachedCategories) {
      return NextResponse.json({
        categories: JSON.parse(cachedCategories),
        fromCache: true
      });
    }
    const categories = await prisma.category.findMany();
    await redisClient.set(cacheKey, JSON.stringify(categories), { EX: 3600 });
    return NextResponse.json({
      categories,
      fromCache: false
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const { categoryNames, productId }: { categoryNames: string[], productId: string } = await req.json();
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
    await redisClient.del("categories");
    return NextResponse.json({
      msg: "Successfully added categories to product",
    });
  } catch (error) {
    return NextResponse.json({
      msg: "Cannot add category to product",
    }, { status: 500 });
  }
}
