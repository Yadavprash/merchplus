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
  return NextResponse.json({
    prod
  });
}