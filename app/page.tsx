import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import { getServerSession } from "next-auth"
import ProductCard from "@/components/productCard/card";
import { AppBar } from "@/components/appbar/AppBar";

const product = {
    id: '1',
    name: 'Black Butler Hoodie',
    price: 10.99,
    imageUrl: 'https://merchplus.blob.core.windows.net/merchplusproducts/image_12.jpeg?sv=2022-11-02&ss=b&srt=o&sp=rwdlaciytfx&se=2025-06-01T12:17:31Z&st=2024-08-18T04:17:31Z&spr=https&sig=ic%2BiRdfN767PPtzx0WC3M15WuIsQu9UD3tiOXtS3tao%3D',
    imageUrl2: '/images/blackHoodie2.jpg'
  };

export default async function Home(){
    const useSession = await getServerSession(NEXT_AUTH_CONFIG);
    return <div>
        <AppBar></AppBar>
        {/* {JSON.stringify(useSession)}; */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-10 ">
        <ProductCard key={product.id} product={product} />
        <ProductCard key={product.id} product={product} />
        <ProductCard key={product.id} product={product} />
        <ProductCard key={product.id} product={product} />
        <ProductCard key={product.id} product={product} />
        <ProductCard key={product.id} product={product} />
        <ProductCard key={product.id} product={product} />
        <ProductCard key={product.id} product={product} />
        <ProductCard key={product.id} product={product} />
        <ProductCard key={product.id} product={product} />
        <ProductCard key={product.id} product={product} />
        <ProductCard key={product.id} product={product} />
    </div>
    </div>
}