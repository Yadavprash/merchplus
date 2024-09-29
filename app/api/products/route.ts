import prisma from '@/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const productIds = url.searchParams.get("ids")?.split(",");

  if (productIds) {
    const prod = await prisma.product.findMany({
      where: { id: { in: productIds } },
      include: { styles: { include: { images: {orderBy:{url:"asc"}} } } },
    });
    return NextResponse.json({
      msg: prod
    });
  }
  else {

    const prod = await prisma.product.findMany({
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
    return NextResponse.json({
      msg: prod
    });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');

    if (!productId) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    await prisma.product.delete({
      where: {
        id: productId,
      },
    });

    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}