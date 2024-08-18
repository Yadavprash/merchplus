"use client"
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface productType{
    id : string
    imageUrl : string,  
    imageUrl2 : string, 
    name : string
    price : number
}

const ProductCard = ({ product }:{product : productType}) => {
    const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="bg-white  m-1 overflow-hidden"
        onMouseEnter={()=>setIsHovered(true)} onMouseLeave={()=>setIsHovered(false)}>
      <Image
        src={isHovered ? product.imageUrl2 : product.imageUrl}
        alt={product.name}
        width={380}
        height={480}
        className=" w-full rounded-xs  object-cover transition-opacity duration-300"
      />
      <div className="flex justify-between pt-4 px-2">
        <h2 className="text-lg text-wrap font-sans mb-2">{product.name}</h2>
        <p className="text-gray-600 ">${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProductCard;