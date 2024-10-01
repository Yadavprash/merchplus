import Image from "next/image";
import Link from "next/link";

export default function ShopByCategory() {
  return (
    <section className="w-full py-12 md:py-18 lg:py-24 bg-gray-100">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter text-center mb-8">
          Shop by Category
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {["Figurine", "Apparel", "Accessories", "Manga"].map(
            (category, i) => (
              <Link
                href={`/catalog/filters/category/${category}`}
                key={i}
                className="relative group overflow-hidden rounded-lg shadow-lg"
              >
                <Image
                  alt={category}
                  className="object-cover w-full h-48"
                  height={192}
                  src={`/images/placeholder${i}.jpg`}
                  width={256}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <h3 className="text-xl font-semibold text-white">
                    {category}
                  </h3>
                </div>
              </Link>
            )
          )}
        </div>
      </div>
    </section>
  );
}