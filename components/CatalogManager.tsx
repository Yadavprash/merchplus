'use client'; 

import { useState } from 'react';
import { AppBar } from '@/components/appbar/AppBar';
import CatalogClient from '@/components/CatalogClient';
import { Product, Category } from "@/components/types/productType";
import { BreadCrumbs } from '@/components/BreadCrumbs';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { setProducts } from '@/store/features/productSlice';

interface CatalogManagerProps {
  initialProducts: Product[];
  categories: Category[];
}

export default function CatalogManager({ initialProducts, categories }: CatalogManagerProps) {
  // const [products, setProducts] = useState<Product[]>(initialProducts);
  // const products = useSelector((state:RootState) => state.products.products);
  const dispatch = useDispatch();
  dispatch(setProducts(initialProducts));
  return (
    <div>
      <AppBar  />
      <div className="flex flex-col w-full md:w-2/3 mx-auto px-4">
        <BreadCrumbs />
        <CatalogClient categories={categories}  />
      </div>
    </div>
  );
}
