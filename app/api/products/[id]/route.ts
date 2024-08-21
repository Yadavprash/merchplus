import prisma  from '@/db';
import { NextRequest,NextResponse } from 'next/server';
import { useRouter } from 'next/router'
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const prodId = params.id;
  console.log(prodId);
  const prod = await prisma.product.findUnique({
    where:{
      id: prodId
    },
    include:{
      category:true,
      reviews:true,
      Image:true
    }
  })
  return NextResponse.json({
    msg : prod
  });
}