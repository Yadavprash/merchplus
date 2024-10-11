import {  NextResponse } from "next/server";
import prisma from '@/db';
import {redisClient} from '@/lib/redis';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const categoryNames = url.searchParams.get("category")?.split(",") ?? [];
  const cacheKey = `products_${categoryNames.join("_")}`;

  try {
    if (categoryNames.length > 0) {
      const cachedProducts = await redisClient.get(cacheKey);
      if (cachedProducts) {
        return NextResponse.json({
          products: JSON.parse(cachedProducts),
          fromCache: true
        });
      }

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

      await redisClient.set(cacheKey, JSON.stringify(products), { EX: 3600 });

      return NextResponse.json({
        products,
        fromCache: false
      });
    }
  } catch (error) {
    return NextResponse.json({
      err: "Cannot get products"
    });
  }
}
