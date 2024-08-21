"use client"
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Product } from "@/components/types/productType";




const ProductCard = ({ product }:{product : Product}) => {
    const [isHovered, setIsHovered] = useState(false);
    const imageUrl = isHovered
    ? product.Image && product.Image.length > 1
      ? product.Image[0].url + process.env.NEXT_PUBLIC_AZURE_BLOB_TOKEN 
      : ''
    : product.Image && product.Image.length > 1
    ? product.Image[1].url + process.env.NEXT_PUBLIC_AZURE_BLOB_TOKEN
    : '';
    console.log(imageUrl)
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
        <p className="text-gray-600 ">${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
};

// https://merchplus.blob.core.windows.net/merchplusproducts/image_9.jpeg?sv=2022-11-02&ss=b&srt=o&sp=rwdlaciytfx&se=2025-06-01T12:17:31Z&st=2024-08-18T04:17:31Z&spr=https&sig=ic%2BiRdfN767PPtzx0WC3M15WuIsQu9UD3tiOXtS3tao%3D
// https://merchplus.blob.core.windows.net/merchplusproducts/image_9.jpeg?sv=2022-11-02&ss=b&srt=o&sp=rwdlaciytfx&se=2025-06-01T12:17:31Z&st=2024-08-18T04:17:31Z&spr=https&sig=ic%2BiRdfN767PPtzx0WC3M15WuIsQu9UD3tiOXtS3tao%3D 
export default ProductCard;