"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from "@/components/productCard/card";
import { AppBar } from "@/components/appbar/AppBar";
import { Product } from "@/components/types/productType";
import Link from "next/link";
import { Footer } from "@/components/footer/Footer";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true); // Optional: to handle loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/products'); // Adjust API endpoint as needed
        setProducts(response.data.msg); // Assuming response.data.msg holds the products
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Optional loading state
  }

  return (
    <div>
      <AppBar />
      <div className="flex justify-center">
        <div className="w-2/3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-10">
          {products.map((prod: Product) => (
            prod.styles != null && (
              <Link key={prod.id} href={`/product/${prod.id}`}>
                <ProductCard product={prod} />
              </Link>
            )
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
