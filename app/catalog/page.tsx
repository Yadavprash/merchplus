"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from "@/components/productCard/card";
import { AppBar } from "@/components/appbar/AppBar";
import { Product,Category } from "@/components/types/productType";
import Link from "next/link";
import { Footer } from "@/components/footer/Footer";
import { PathName } from '@/components/PathName';
import SortProducts from '@/components/SortBy';
import GridColumnToggle from '@/components/GridColumnToggle';
import Filters from '@/components/Filters';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories,setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilter, setShowFilter] = useState(false);
  const [gridCols, setGridCols] = useState("4");
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/products');
        setProducts(response.data.msg);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    const fetchCategories = async () =>{
      try {
        const response = await axios.get('/api/products/category');
        setCategories(response.data.categories);
        console.log(categories);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
    fetchCategories();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div >
      <div
        onClick={() => setShowFilter(false)}
        className={`fixed top-0 left-0 bg-gray-100/[.3] h-screen w-full z-20 transition-all duration-300 ${showFilter ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`bg-white w-1/4 h-screen transition-transform duration-500 ease-in-out ${showFilter ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <div className="p-4 ">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Filters</h2>
              <button onClick={() => setShowFilter(false)} className="text-red-500">Close</button>
            </div>

            <div className="overflow-y-auto h-full">
              <Filters categories={categories} products={products} setFilteredProducts={setProducts}></Filters>
            </div>
          </div>
        </div>
      </div>

      <AppBar setProducts={setProducts} />
      <div className='flex justify-center'>
        <div className="flex  flex-col w-2/3 ">
          <PathName></PathName>
          <div className=' flex  justify-between items-center font-sans text-sm'>
            <div className='flex space-x-2'>
              <div
                onClick={() => setShowFilter(true)}
                className='flex items-center px-4 py-2 rounded bg-white border text-black cursor-pointer hover:bg-gray-100 transition-colors duration-150  '
              >
                <span className='text-sm font-semibold'>Filters</span>
              </div>

              <SortProducts products={products} setProducts={setProducts}></SortProducts>
            </div>
            <GridColumnToggle setGridCols={setGridCols} />
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className={`w-2/3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-${gridCols} lg:grid-cols-${gridCols} gap-4 m-10`}>
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
