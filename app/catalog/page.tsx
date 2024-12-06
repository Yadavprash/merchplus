import { Suspense } from 'react';
import { Product, Category } from "@/components/types/productType";
import { Footer } from "@/components/footer/Footer";
import Skeleton from 'react-loading-skeleton';
import CatalogManager from '@/components/CatalogManager';
import axios from 'axios';

async function fetchProducts(): Promise<Product[]> {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_APP_URL}/api/products`, {
      headers: {
        'Cache-Control': 'public, max-age=3600',  // Equivalent to revalidate
      },
    });
    return res.data.msg;
  } catch (error) {
    console.log(error)
    throw new Error('Failed to fetch products');
  }
}

async function fetchCategories(): Promise<Category[]> {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_APP_URL}/api/products/category`, {
      headers: {
        'Cache-Control': 'public, max-age=3600',  // Equivalent to revalidate
      },
    });
    return res.data.categories;
  } catch (error) {
    throw new Error('Failed to fetch categories');
  }
}

export default async function CatalogPage() {
  const productsData = fetchProducts();
  const categoriesData = fetchCategories();

  const [products, categories] = await Promise.all([productsData, categoriesData]);

  return (
    <div>
      {/* Render client-side logic in CatalogManager */}
      <Suspense fallback={<Skeleton />}>
        <CatalogManager initialProducts={products} categories={categories} />
      </Suspense>
      <Footer />
    </div>
  );
}
