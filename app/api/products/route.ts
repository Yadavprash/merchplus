import prisma  from '@/db';
import { NextResponse } from 'next/server';

export async function GET() {
  const prod = await prisma.product.findMany({
   include:{
    styles:{
      include :{
        images : {
          orderBy :{
            url: 'asc'
          }
        }, 
      }
    },
    categories:true
   }
  })
  return NextResponse.json({
    msg : prod
  });
}

// This function will handle the DELETE request
export async function DELETE(request: Request) {
  try {
    // Extract the product ID from the request URL
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');

    if (!productId) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    // Delete the product and its related data from the database
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