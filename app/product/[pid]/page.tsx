"use client";
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { AppBar } from "@/components/appbar/AppBar";
import { Product, Style } from "@/components/types/productType";
import { Gallery } from "@/components/gallery/gallery";
import ProductInfo from "@/components/product/ProductInfo";
import { Reviews } from '@/components/reviews/Reviews';
import { Footer } from '@/components/footer/Footer';
import { BreadCrumbs } from '@/components/BreadCrumbs';

export default function ProductDetails() {
  const searchParams = useParams();
  const pid = searchParams?.pid;

  const [product, setProduct] = useState<Product | null>(null);
  const [overallRating, setOverallRating] = useState(0);
  const [styles, setStyles] = useState<Style[] | null>(null);
  const [currStyle, setCurrStyle] = useState<number>(0);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); 

      try {
        const productResponse = await axios.get(`${process.env.NEXT_PUBLIC_APP_URL}/api/products/${pid}`);
        if (productResponse.data.prod) {
          // console.log(productResponse.data.prod)
          setProduct(productResponse.data.prod);
          setStyles(productResponse.data.prod.styles);
        }
      
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, [pid]);

  // Skeleton for the Gallery section
  const GallerySkeleton = () => (
    <div className="w-full h-64 bg-gray-300 animate-pulse rounded-md"></div>
  );

  // Skeleton for the Product Info section
  const ProductInfoSkeleton = () => (
    <div className="flex flex-col space-y-4">
      <div className="w-48 h-8 bg-gray-300 animate-pulse rounded"></div>
      <div className="w-32 h-10 bg-gray-300 animate-pulse rounded"></div>
      <div className="w-full h-12 bg-gray-300 animate-pulse rounded"></div>
      <div className="w-full h-12 bg-gray-300 animate-pulse rounded"></div>
      <div className="flex space-x-4">
        <div className="w-24 h-10 bg-gray-300 animate-pulse rounded"></div>
        <div className="w-24 h-10 bg-gray-300 animate-pulse rounded"></div>
      </div>
      <div className="w-full h-24 bg-gray-300 animate-pulse rounded"></div>
    </div>
  );

  // Skeleton for the Reviews section
  const ReviewsSkeleton = () => (
    <div className="space-y-4">
      <div className="w-full h-6 bg-gray-300 animate-pulse rounded"></div>
      <div className="w-full h-4 bg-gray-300 animate-pulse rounded"></div>
      <div className="w-full h-4 bg-gray-300 animate-pulse rounded"></div>
    </div>
  );

  if (loading) {
    return (
      <div>
        
        <AppBar  />
        
        {/* Breadcrumbs/BreadCrumbs */}
        <div className='flex justify-center'>
          <div className='w-full md:w-2/3 px-4'>
            <BreadCrumbs />
          </div>
        </div>

        {/* Product Details Section Skeletons */}
        <div className="flex justify-center">
          <div className="w-full md:w-2/3 grid grid-cols-1 lg:grid-cols-2 gap-4 px-4">
            {/* Gallery Skeleton */}
            <GallerySkeleton />

            {/* Product Info Skeleton */}
            <ProductInfoSkeleton />
          </div>
        </div>

        {/* Reviews Section Skeleton */}
        <div className="w-full flex justify-center mt-8 px-4">
          <div className="w-full md:w-2/3">
            <ReviewsSkeleton />
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div>
      
      <AppBar  />
      {/* {JSON.stringify(product)} */}
      {/* Breadcrumbs/BreadCrumbs */}
      <div className='flex justify-center'>
        <div className='w-full md:w-2/3 px-4'>
          <BreadCrumbs />
        </div>
      </div>

      {/* Product Details Section */}
      <div className="flex justify-center">
        <div className="w-full md:w-2/3 grid grid-cols-1 lg:grid-cols-2 gap-4 px-4">
          {/* Gallery */}
          {styles && <Gallery data={styles[currStyle]?.images ?? []} />}
          
          {/* Product Info */}
          {styles && (
            <ProductInfo 
              product={product!} 
              currStyle={currStyle} 
              setCurrStyle={setCurrStyle} 
              styles={styles} 
              overallRating={overallRating} 
            />
          )}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="w-full flex justify-center mt-8 px-4">
        <div className="w-full md:w-2/3">
          <Reviews productId={product!.id} setOverallRating={setOverallRating} data={product!.reviews} />
        </div>
      </div>

      <Footer />
    </div>
  );
}
