import { Suspense } from 'react';
import { Product, Category } from "@/components/types/productType";
import { Footer } from "@/components/footer/Footer";
import Skeleton from 'react-loading-skeleton';
import CatalogManager from '@/components/CatalogManager';

async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/products`, { next: { revalidate: 3600 } });
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  const data = await res.json();
  return data.msg;
}

async function fetchCategories(): Promise<Category[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/products/category`, { next: { revalidate: 3600 } });
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
      {/* Render client-side logic in CatalogManager */}
      <Suspense fallback={<Skeleton />}>
        <CatalogManager initialProducts={products} categories={categories} />
      </Suspense>
      <Footer />
    </div>
  );
}
