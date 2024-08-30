import { NextRequest, NextResponse } from "next/server";
import prisma  from '@/db';
export async function GET(req : Request){
    //Get The current Users Cart
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId") || "";
    let cart = await prisma.cart.findFirst({
        where: { userId },
        include : {
            items:true
        }
      });
    return NextResponse.json({
        cart
    })
}

export async function POST(req : NextRequest){
    const {userId,productId,quantity ,styleIdx,sizeIdx} = await req.json();
    // Find an existing cart for the user
    let cart = await prisma.cart.findFirst({
        where: { userId },
      });

      // If no cart exists, create a new one
      if (!cart) {
        cart = await prisma.cart.create({
          data: {
            userId,
          },
        });
      }

    const cartItem = await prisma.cartItem.create({
        data:{
            cartId : cart.id,
            productId,
            quantity,
            styleIdx,
            sizeIdx
        }
    })
    return NextResponse.json({
        msg: "Added Item to Cart"
    })
}

export async function DELETE(req : Request){
  //Get The current Users Cart
  const url = new URL(req.url);
  const id = url.searchParams.get("cartItemId") || "";
  try{
     await prisma.cartItem.delete({
        where: { id },
        
      });
      return NextResponse.json({
        msg:"Item removed from cart"  
      })
  }catch(e){
    console.log(e)
  }
}