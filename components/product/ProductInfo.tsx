"use client"
import { useState } from 'react';
import { Product, Style } from "@/components/types/productType";
import SizeSelector from "@/components/product/SizeSelector";
import Features from "@/components/product/Features";
import RatingStars from "@/components/RatingStar";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Styles } from '@/components/styles/Styles';

interface ProductInfoProps {
  product: Product;
  currStyle: number;
  setCurrStyle: React.Dispatch<React.SetStateAction<number>>;
  styles: Style[];
  overallRating: number;
}

export default function ProductInfo({ product, currStyle, setCurrStyle, styles, overallRating }: ProductInfoProps) {
  const session = useSession();
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState(0);

  const addToCart = async () => {
    await axios.post("/api/cart", {
      userId: (session?.data?.user as { id: string }).id,
      productId: product.id,
      quantity: 1,
      styleIdx: currStyle,
      sizeIdx: selectedSize,
    });
    router.push("/cart");
  };

  const addToCheckout = async () => {
    await axios.post("/api/cart", {
      userId: (session?.data?.user as { id: string }).id,
      productId: product.id,
      quantity: 1,
      styleIdx: currStyle,
      sizeIdx: selectedSize,
    });
    router.push("/checkout");
  };

  return (
    <div className="flex flex-col m-3 overflow-auto max-h-screen relative">
      <div className="overflow-auto scrollbar-hidden max-h-full">
        <div className="text-2xl lg:text-3xl p-2 font-bold text-wrap">{product.name}</div>
        <div className="flex items-center text-xs px-2">
          <RatingStars rating={overallRating} canHover={false} setRating={null} />
          <div className="flex p-1 font-semibold">
            ({product.reviews.length} Reviews)
          </div>
        </div>
        <div className="text-3xl lg:text-4xl p-3 font-bold text-wrap">₹{styles[currStyle].price}</div>
        
        {/* Size Selector */}
        <div className="my-2">
          <SizeSelector sizes={product.size} selectedSize={selectedSize} setSelectedSize={setSelectedSize} />
        </div>

        {/* Styles Selector */}
        <div className="my-2">
          <Styles currStyle={currStyle} setCurrStyle={setCurrStyle} styles={styles} />
        </div>

        {/* Add to Cart and Buy Now buttons */}
        <div className="flex flex-wrap items-center p-2">
          <button
            onClick={addToCart}
            className="bg-black text-sm text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 transition ease-in-out duration-300 w-full sm:w-auto mb-2 sm:mb-0"
          >
            ADD TO CART
          </button>
          <button
            onClick={addToCheckout}
            className="bg-black text-sm text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 transition ease-in-out duration-300 w-full sm:w-auto sm:ml-4"
          >
            BUY NOW
          </button>
        </div>

        {/* Features */}
        <div className="my-4">
          <Features />
        </div>

        {/* Product Description */}
        <div className="p-2">
          <div className="text-lg font-semibold text-gray-800">Description</div>
          <div className="text-gray-700">{product.description}</div>
        </div>
      </div>
    </div>
  );
}
