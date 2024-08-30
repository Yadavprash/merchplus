import prisma  from '@/db';
import { NextRequest,NextResponse } from 'next/server';
import { useRouter } from 'next/router'
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const prodId = params.id;
  const prod = await prisma.product.findUnique({
    where:{
      id: prodId
    },
    include:{
      category:true,
      reviews:true,
      styles:{
        include :{
          images : true
        }
      }
    }
  })
  return NextResponse.json({
    prod
  });
}