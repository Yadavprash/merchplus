"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from "@/components/productCard/card";
import { AppBar } from "@/components/appbar/AppBar";
import { Product } from "@/components/types/productType";
import Link from "next/link";
import { Footer } from "@/components/footer/Footer";
import { useParams } from 'next/navigation';

export default function Home() {
  const [loading, setLoading] = useState(true); // Optional: to handle loading state
  const params = useParams<{type:string,name:string}>();
  const filterType = params.type;
  const filterName = params.name;
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (filterType) {
      // Fetch products based on the category or filter products
      const fetchProducts = async () => {
        const response = await fetch(`/api/products/filters?${filterType}=${filterName}`);
        const products = await response.json();
        setFilteredProducts(products.products);
        console.log(filteredProducts)
        setLoading(false)
      };

      fetchProducts();
    }
  }, [filterType]);

  if (loading) {
    return <div>Loading...</div>; // Optional loading state
  }

  return (
    <div>
      <AppBar />
      <div className="flex justify-center">
        <div className="w-2/3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-10">
          {filteredProducts.map((prod: Product) => (
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
