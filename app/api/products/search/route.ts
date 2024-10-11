import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";
import {redisClient} from "@/lib/redis";
import Fuse from 'fuse.js';


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

  const fuseOptions = {
    keys: ['name', 'description','categories.name','styles.name'],
    includeScore: true,
  };

  const fuse = new Fuse(products, fuseOptions);
  const results = fuse.search(query);

  // Map results to return only the products
  const filteredProducts = results.map(result => result.item);

    await redisClient.set(cacheKey, JSON.stringify(filteredProducts), { EX: 3600 });

    return NextResponse.json({ products:  filteredProducts, fromCache: false });
  } catch (error) {
    return NextResponse.json({
      msg: "Invalid query parameters"
    });
  }
}
