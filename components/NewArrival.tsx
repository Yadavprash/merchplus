import Image from "next/image";
import Link from "next/link";
import { Product } from "@/components/types/productType";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function NewArrivals({ products }: { products: Product[] }) {
  return (
    <section className="w-full py-12 md:py-18 lg:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter text-center mb-8">
          New Arrivals
        </h2>
        <div className="relative">
          <div className="flex overflow-x-scroll space-x-4 p-4 scrollbar-hidden">
            {products?.map((prod: Product, i) => {
              const url =
                prod.styles[0].images[0].url +
                process.env.NEXT_PUBLIC_AZURE_BLOB_TOKEN;

              return (
                <div key={i} className="flex-none w-48 sm:w-56">
                  <Link href={`/product/${prod.id}`}>
                    <div className="relative group overflow-hidden rounded-lg shadow-lg">
                      <Image
                        alt={`New Arrival ${i}`}
                        className="object-cover w-full h-64"
                        height={256}
                        src={url}
                        width={256}
                      />
                      <div className="absolute inset-0 flex items-end justify-center p-4 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <h3 className="text-lg font-semibold text-white">
                          {prod.name}
                        </h3>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
          <button className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg">
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg">
            <ChevronRight className="h-6 w-6" />
          </button> 
        </div>
      </div>
    </section>
  );
}