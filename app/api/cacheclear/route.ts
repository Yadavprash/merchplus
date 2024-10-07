import { NextRequest, NextResponse } from 'next/server';
import { redisClient } from '@/lib/redis';

export async function GET(req: NextRequest) {
  try {
    await redisClient.flushAll();

    return NextResponse.json({
      msg: 'All Redis cache cleared',
    });
  } catch (error) {
    console.error('Error clearing Redis cache:', error);
    return NextResponse.json(
      { msg: 'Failed to clear Redis cache' },
      { status: 500 }
    );
  }
}
