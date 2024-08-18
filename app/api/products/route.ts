import prisma  from '@/db';
import { NextResponse } from 'next/server';

export async function GET() {
  const prod = await prisma.product.findMany({
    include:{
      Image : true
    }
  })
  return NextResponse.json({
    msg : prod
  });
}

export async function POST(){
  try{
    const product = await prisma.product.create({
      data: {
        name: "Trendy Sunglasses",
        description: "Stylish sunglasses for summer.",
        price: 29.99,
        image: "trendy-sunglasses.jpg",
        category: {
          create: {
            name: "Accessories",
          },
        },
        reviews: {
          create: [
            {
              rating: 5,
              review: "Absolutely love these sunglasses! Perfect for summer.",
            },
            {
              rating: 4,
              review: "Good quality sunglasses, but a bit expensive.",
            },
          ],
        },
      },
      include: {
        category: true,
        reviews: true,
      },
    })
  }catch(err){
    console.log(err);
    return NextResponse.json({
      msg: "Error"
    })
  }
  return NextResponse.json({
    msg:"Product created"
  })
}