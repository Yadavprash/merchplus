import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import { getServerSession } from "next-auth"
import ProductCard from "@/components/productCard/card";
import { AppBar } from "@/components/appbar/AppBar";

const product = {
    id: '1',
    name: 'One piece lamb',
    price: 10.99,
    imageUrl: 'https://merchplus.blob.core.windows.net/merchplusproducts/image_12.jpeg?sp=r&st=2024-08-18T04:05:02Z&se=2024-08-18T12:05:02Z&spr=https&sv=2022-11-02&sr=b&sig=uZ8gOmsRZpYDHXicumVsIvAZZGeIUqxjeQCx2BnjnyY%3D',
    imageUrl2: '/images/blackHoodie2.jpg'
  };

export default async function Home(){
    const useSession = await getServerSession(NEXT_AUTH_CONFIG);
    return <div>
        <AppBar></AppBar>
        {/* {JSON.stringify(useSession)}; */}
        <div className="flex justify-center">
            <div className="w-2/3 border border-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-10 ">
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
    </div>
}