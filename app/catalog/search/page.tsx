'use client'; 

import { useEffect, useState } from 'react';
import { AppBar } from '@/components/appbar/AppBar';
import CatalogClient from '@/components/CatalogClient';
import { Product, Category } from "@/components/types/productType";
import { BreadCrumbs } from '@/components/BreadCrumbs';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { setProducts } from '@/store/features/productSlice';
import axios from 'axios';

interface CatalogManagerProps {
  initialProducts: Product[];
  categories: Category[];
}



export default  function Home() {
    const [categories,setCategories]  = useState<Category[]>();

    useEffect(()=>{
        const fetchCategories = async() =>{
            const response =  await axios.get(`/api/products/category`);
            setCategories(response.data.categories);
        }
        fetchCategories();
    },[])
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
