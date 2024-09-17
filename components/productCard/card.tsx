"use client";
import Image from 'next/image';
import { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Product } from "@/components/types/productType";

const ProductCard = ({ product }: { product: Product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const imageUrl = isHovered
    ? product.styles[0].images && product.styles[0].images.length > 1
      ? product.styles[0].images[1].url + process.env.NEXT_PUBLIC_AZURE_BLOB_TOKEN
      : product.styles[1].images[0].url + process.env.NEXT_PUBLIC_AZURE_BLOB_TOKEN 
    : product.styles[0].images && product.styles[0].images.length > 0
    ? product.styles[0].images[0].url + process.env.NEXT_PUBLIC_AZURE_BLOB_TOKEN
    : '';

  return (
    <div
      className="bg-white m-2 overflow-hidden rounded  transition-transform transform "
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {!imageLoaded && <Skeleton width={380} height={300} />}
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={product.name}
          width={380}
          height={480}
          className={`w-full h-[300px] object-cover transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoadingComplete={() => setImageLoaded(true)}
        />
      )}
      <div className="p-4">
        <h2 className="text-lg font-sans mb-2 truncate">
          {imageLoaded ? product.name : <Skeleton width={200} />}
        </h2>
        <p className="text-gray-600">
          {imageLoaded ? `₹${product.styles[0].price.toFixed(2)}` : <Skeleton width={100} />}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
