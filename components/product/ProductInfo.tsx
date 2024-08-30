import { useEffect, useState } from 'react';
import { Product, Style } from "@/components/types/productType";
import SizeSelector from "@/components/product/SizeSelector";
import ColorSelector from "@/components/product/ColorSelector";
import Features from "@/components/product/Features";
import RatingStars from "@/components/RatingStar";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Styles } from '@/components/styles/Styles';

interface ProductInfoProps {
  product: Product;
  currStyle:number;
  setCurrStyle:React.Dispatch<React.SetStateAction<number>>;
  styles:Style[];
  overallRating: number;
}

export default function ProductInfo({ product,currStyle,setCurrStyle ,styles,overallRating }:ProductInfoProps) {
  const session = useSession();
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState(0);

  const addToCart = async() =>{
    const result = await(axios.post("http://localhost:3000/api/cart",{
      userId :(session?.data?.user as { id: string }).id,
      productId : product.id,
      quantity: 1,
      styleIdx : currStyle,
      sizeIdx : selectedSize
    }))
    router.push("/cart");
  }

  return (
    <div className="flex flex-col m-3 overflow-auto max-h-screen relative">
      <div className="overflow-auto scrollbar-hidden max-h-full">
        <div className="text-3xl p-2 font-bold text-wrap">{product.name}</div>
        <div className="flex text-xs px-2">
          <RatingStars rating={overallRating} />
          <div className="flex p-1 font-semibold">
            ( {product.reviews.length} Reviews )
          </div>
        </div>
        <div className="text-4xl p-3 font-bold text-wrap">₹{styles[currStyle].price}</div>
        <SizeSelector sizes={product.size} selectedSize={selectedSize} setSelectedSize={setSelectedSize} />
        <Styles currStyle={currStyle}  setCurrStyle={setCurrStyle} styles={styles}></Styles>
        <div className="flex items-center p-2">
          <div className="mx-2">
            <button onClick={addToCart} className="bg-secondary text-sm text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-tertiary focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 transition ease-in-out duration-300">
              ADD TO CART
            </button>
          </div>
          <div className="mx-2">
            <button className="bg-secondary text-white text-sm font-semibold py-2 px-4 rounded-full shadow-lg hover:bg-tertiary focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 transition ease-in-out duration-300">
              BUY NOW
            </button>
          </div>
        </div>
        <Features />
        <div className="p-2">
          <div className="text-lg font-semibold text-gray-800">Description</div>
          <div className="text-gray-700">{product.description}</div>
        </div>
      </div>
    </div>
  );
}
