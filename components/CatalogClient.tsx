'use client'

import { useState, useEffect } from 'react';
import ProductCard from "@/components/productCard/card";
import Link from "next/link";
import SortProducts from '@/components/SortBy';
import GridColumnToggle from '@/components/GridColumnToggle';
import Filters from '@/components/Filters';
import { Product, Category } from "@/components/types/productType";
import Skeleton from 'react-loading-skeleton';



export default function CatalogClient({ initialProducts, categories }: { initialProducts: Product[], categories: Category[] }) {
    const [products, setProducts] = useState(initialProducts);
    const [showFilter, setShowFilter] = useState(false);
    const [gridCols, setGridCols] = useState("4");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(false);
    }, []);



    return <div>
        <div
            onClick={() => setShowFilter(false)}
            className={`fixed top-0 left-0 bg-gray-100/[.3] h-screen w-full z-20 transition-all duration-300 ${showFilter ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`bg-white w-3/4  md:w-1/2  lg:w-1/4 h-screen transition-transform duration-500 ease-in-out ${showFilter ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold">Filters</h2>
                        <button onClick={() => setShowFilter(false)} className="text-red-500">Close</button>
                    </div>

                    <div className="overflow-y-auto h-full">
                        {isLoading ? (
                            <>
                                <Skeleton height={30} width={150} />
                                <Skeleton height={20} width={`100%`} count={8} />
                            </>
                        ) : (
                            <Filters categories={categories} products={products} setFilteredProducts={setProducts} />
                        )}
                    </div>
                </div>
            </div>
        </div>



        {/* Main Content */}

        <div className="flex-1 md:flex justify-between items-center font-sans text-sm mb-4">
            <div className="flex space-x-2">
                <div
                    onClick={() => setShowFilter(true)}
                    className="flex items-center px-4 py-2 rounded bg-white border text-black cursor-pointer hover:bg-gray-100 transition-colors duration-150"
                >
                    <span className="text-sm font-semibold">Filters</span>
                </div>

                {isLoading ? (
                    <Skeleton height={30} width={100} />
                ) : (
                    <SortProducts products={products} setProducts={setProducts} />
                )}
            </div>
            {isLoading ? (
                <Skeleton height={30} width={100} />
            ) : (
                <GridColumnToggle currentCols={gridCols} setGridCols={setGridCols} />
            )}
        </div>

        {/* Product Grid */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-${gridCols} lg:grid-cols-${gridCols} gap-4 mb-10`}>
            {isLoading ? (
                Array.from({ length: 8 }).map((_, index) => (
                    <div key={index} className="bg-white p-4 rounded">
                        <Skeleton height={300} />
                        <Skeleton height={20} width={`80%`} className="mt-2" />
                        <Skeleton height={20} width={`40%`} />
                    </div>
                ))
            ) : (
                products.map((prod: Product) => (
                    prod.styles != null && (
                        <Link key={prod.id} href={`/product/${prod.id}`}>
                            <ProductCard product={prod} />
                        </Link>
                    )
                ))
            )}
        </div>
    </div>
}