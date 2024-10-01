import Image from "next/image";
import Link from "next/link";
import { Product } from "@/components/types/productType";

export default function FeaturedProducts({ products }: { products: Product[] }) {
  return (
    <section className="w-full py-12 md:py-18 lg:py-24 bg-gray-100">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter text-center mb-8">
          Featured Products
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products?.map((prod: Product, i) => {
            const url =
              prod.styles[0].images[0].url +
              process.env.NEXT_PUBLIC_AZURE_BLOB_TOKEN;
            return (
              <div
                key={i}
                className="relative group overflow-hidden rounded-lg shadow-lg"
              >
                <Link href={`/product/${prod.id}`}>
                  <Image
                    alt={`Product ${i}`}
                    className="object-cover w-full h-60"
                    height={240}
                    src={url}
                    width={240}
                  />
                  <div className="absolute inset-0 flex items-end justify-center p-4 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <h3 className="text-lg font-semibold text-white">
                      {prod.name}
                    </h3>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}