import { NextRequest, NextResponse } from "next/server";
import prisma from '@/db';
import { redisClient } from '@/lib/redis';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const userId = url.searchParams.get("userId") || "";
  const cacheKey = `cart_${userId}`;

  try {
    const cachedCart = await redisClient.get(cacheKey);
    if (cachedCart) {
      return NextResponse.json({
        cart: JSON.parse(cachedCart),
        fromCache: true
      });
    }

    let cart = await prisma.cart.findFirst({
      where: { userId },
      include: {
        items: {
          include: {
            product: {
              include: {
                styles: {
                  include: {
                    images: true
                  }
                }
              }
            }
          }
        }
      }
    });

    await redisClient.set(cacheKey, JSON.stringify(cart), { EX: 3600 });

    return NextResponse.json({
      cart,
      fromCache: false
    });
  } catch (error) {
    return NextResponse.json({
      msg: "Cannot fetch cart"
    }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const { userId, productId, quantity, styleIdx, sizeIdx } = await req.json();
  let cart = await prisma.cart.findFirst({
    where: { userId },
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: {
        userId,
      },
    });
  }

  const cartItem = await prisma.cartItem.create({
    data: {
      cartId: cart.id,
      productId,
      quantity,
      styleIdx,
      sizeIdx
    }
  });

  // Invalidate the cache for the user's cart
  await redisClient.del(`cart_${userId}`);

  return NextResponse.json({
    msg: "Added Item to Cart"
  });
}

export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const cartItemId = url.searchParams.get("cartItemId") || "";
  const userId = url.searchParams.get("userId") || "";

  if (!cartItemId) {
    return NextResponse.json({ msg: "Cart item ID is required" }, { status: 400 });
  }

  try {
    const cartItem = await prisma.cartItem.findUnique({
      where: { id: cartItemId }
    });

    if (!cartItem) {
      return NextResponse.json({ msg: "Cart item not found" }, { status: 404 });
    }

    await prisma.cartItem.delete({
      where: { id: cartItemId },
    });

    await redisClient.del(`cart_${userId}`);

    return NextResponse.json({
      msg: "Item removed from cart"
    });
  } catch (error) {
    console.error("Error removing item from cart:", error);
    return NextResponse.json({
      msg: "Cannot remove item from cart"
    }, { status: 500 });
  }
}