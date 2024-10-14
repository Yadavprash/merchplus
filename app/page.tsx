import { Suspense } from 'react';
import { Footer } from "@/components/footer/Footer";
import { AppBar } from "@/components/appbar/AppBar";
import { Product } from "@/components/types/productType";
import HeroSection from '@/components/HeroSection';
import FeaturedProducts from '@/components/FeaturedProducts';
import NewArrivals from '@/components/NewArrival';
import ShopByCategory from '@/components/ShopByCategory';

const featured = [
  "593d8f7f-3c7a-41bf-8bd0-e03c3979437e",
  "438bc178-5948-4b8b-9ec7-bc87c957432e",
  "7b8a3cb2-7866-4cf6-b0e6-e1ee5b2c606b",
  "d494e681-25a9-497a-89be-9fc313c43077",
  "2bcd910b-8b9b-41bd-aa25-8613ce8cee0b",
  "49582968-8c62-48e3-abf9-f97c0752d4b5",
  "7efe8c70-d83c-4240-a831-6897cc66bd17",
  "5039d1a0-2220-488e-ae6d-4902007f8779"
];
const newArrival = [
  "33d13874-a51f-4c75-a577-20cbba273d04",
  "66b369c1-b7ed-42c9-8394-878c6cffc076",
  "787562ca-16ea-47ed-8fab-1979031cd838",
  "b10c22b1-a8b9-43e6-adf0-21a46a09fc44",
  "c005fc81-deab-49a9-aee7-810d7c5e2aaf",
  "8787f1ec-b540-4429-a098-14c69cfa93cf",
];

async function fetchProducts(ids: string[]): Promise<Product[]> {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/products?ids=${ids.join(",")}`, { next: { revalidate: 3600 } });
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  const data = await res.json();
  return data.msg;
}



export default async function Home() {
  const featuredProducts = await fetchProducts(featured);
  const newProducts = await fetchProducts(newArrival);

  return (
    <div className="flex flex-col min-h-screen">
      <AppBar   />
      <main className="flex-1 w-full justify-center">
        <Suspense fallback={<div>Loading...</div>}>
          <HeroSection />
        </Suspense>
        <FeaturedProducts products={featuredProducts} />
        <NewArrivals products={newProducts} />
        <ShopByCategory />
      </main>
      <Footer />
    </div>
  );
}