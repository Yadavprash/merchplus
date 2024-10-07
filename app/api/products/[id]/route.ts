import prisma  from '@/db';
import { redisClient } from '@/lib/redis';
import { NextRequest,NextResponse } from 'next/server';
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const prodId = params.id;

  const cacheKey = `product:${prodId}`;

  try{
    const cacheData = await redisClient.get(cacheKey);

    if(cacheData){
      return NextResponse.json({
        prod: JSON.parse(cacheData),
        fromCache:true
      });
    }
    
    const prod = await prisma.product.findUnique({
    where:{
      id: prodId
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
  })
  console.log(prod)
  await redisClient.set(cacheKey,JSON.stringify(prod),{EX:3600});
  return NextResponse.json({
    prod,
    fromCache:false
  });
}catch (error) {
  console.error('Error fetching or caching products:', error);
  return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
}
}