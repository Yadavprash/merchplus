import prisma from '@/db';
import { redisClient } from '@/lib/redis';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const productIds = url.searchParams.get("ids")?.split(",");

  const cacheKey = productIds ? `products:${productIds.join(",")}` : "all-products";

  try{
    const cacheData = await redisClient.get(cacheKey);

    if(cacheData){
      return NextResponse.json({
        msg: JSON.parse(cacheData),
        fromCache:true
      });
    }
    
    let prods;
    if (productIds) {
      prods = await prisma.product.findMany({
        where: { id: { in: productIds } },
        include: { styles: { include: { images: {orderBy:{url:"asc"}} } } },
      });
     
    }
    else {
      
      prods = await prisma.product.findMany({
        include: {
          styles: {
            include: {
              images: {
                orderBy: {
                  url: 'asc'
                }
              },
            }
          },
          categories: true
        }
      })

    }

    await redisClient.set(cacheKey,JSON.stringify(prods),{EX:3600});
    return NextResponse.json({
      msg: prods,
      fromCache:false
    });
  }catch (error) {
    console.error('Error fetching or caching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');

    if (!productId) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    const existingProduct = await prisma.product.findUnique({
      where: { id: productId }
    });

    if (!existingProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }


    await prisma.product.delete({
      where: {
        id: productId,
      },
    });

      // Invalidate cache when a product is deleted
      await redisClient.del(`products:${productId}`);
      await redisClient.del('all-products'); // Invalidate all products cache

    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}