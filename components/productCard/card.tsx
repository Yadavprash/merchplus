"use client"
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Product } from "@/components/types/productType";




const ProductCard = ({ product }:{product : Product}) => {
    const [isHovered, setIsHovered] = useState(false);
    const imageUrl = isHovered
    ? product.styles[0].images && product.styles[0].images.length > 1
      ? product.styles[0].images[0].url + process.env.NEXT_PUBLIC_AZURE_BLOB_TOKEN 
      : ''
    : product.styles[0].images && product.styles[0].images.length > 1
    ? product.styles[0].images[1].url + process.env.NEXT_PUBLIC_AZURE_BLOB_TOKEN
    : '';
  return (
    <div className="bg-white  m-1 overflow-hidden"
        onMouseEnter={()=>setIsHovered(true)} onMouseLeave={()=>setIsHovered(false)}>
      <Image
      src={imageUrl}
      alt={product.name}
      width={380}
      height={480}
      className=" w-full rounded-xs  object-cover transition-opacity duration-300"
      />
      <div className="flex justify-between pt-4 px-2">
        <h2 className="text-lg text-wrap font-sans mb-2">{product.name}</h2>
        <p className="text-gray-600 ">₹{product.styles[0].price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProductCard;