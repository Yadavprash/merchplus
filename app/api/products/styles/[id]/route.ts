import prisma from '@/db';
import { NextRequest, NextResponse } from 'next/server';
import {redisClient} from '@/lib/redis';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const prodId = params.id;
  const cacheKey = `styles_${prodId}`;

  try {
    const cachedStyles = await redisClient.get(cacheKey);
    if (cachedStyles) {
      return NextResponse.json({
        prod: JSON.parse(cachedStyles),
        fromCache: true
      });
    }

    const prod = await prisma.style.findMany({
      where: {
        productId: prodId
      },
      include: {
        images: true
      }
    });

    await redisClient.set(cacheKey, JSON.stringify(prod), { EX: 3600 });

    return NextResponse.json({
      prod,
      fromCache: false
    });
  } catch (error) {
    return NextResponse.json({
      msg: "Cannot fetch styles"
    }, { status: 500 });
  }
}
