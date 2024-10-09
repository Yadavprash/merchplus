import { Suspense } from 'react';
import { Product, Category } from "@/components/types/productType";
import { AppBar } from "@/components/appbar/AppBar";
import { Footer } from "@/components/footer/Footer";
import { BreadCrumbs } from '@/components/BreadCrumbs';
import CatalogClient from '@/components/CatalogClient';
import Skeleton from 'react-loading-skeleton';

async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/products`, { next: { revalidate: 3600 } });
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  const data = await res.json();
  return data.msg;
}

async function fetchCategories(): Promise<Category[]> {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/products/category`, { next: { revalidate: 3600 } });
  if (!res.ok) {
    throw new Error('Failed to fetch categories');
  }
  const data = await res.json();
  return data.categories;
}

export default async function CatalogPage() {
  const productsData = fetchProducts();
  const categoriesData = fetchCategories();

  const [products, categories] = await Promise.all([productsData, categoriesData]);

  return (
    <div>
      <AppBar setProducts={null} cartLength={null} />
      <div className="flex flex-col w-full md:w-2/3 mx-auto px-4">
        <BreadCrumbs />
        <Suspense fallback={<Skeleton />}>
          <CatalogClient initialProducts={products} categories={categories} />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}