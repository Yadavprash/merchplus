import prisma from '@/db';
import { NextRequest, NextResponse } from 'next/server';
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const prodId = params.id;
    const prod = await prisma.style.findMany({
        where: {
            productId: prodId
        },
        include: {
            images: true
        }
    })
    return NextResponse.json({
        prod
    });
}