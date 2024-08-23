import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import { getServerSession } from "next-auth"
import ProductCard from "@/components/productCard/card";
import { AppBar } from "@/components/appbar/AppBar";
import { Carousel } from "@/components/carousel/Carousel";
import { Gallery } from "@/components/gallery/gallery";
import { Product } from "@/components/types/productType";

const tempProd: Product = {
    id: "5e0056c6-4f6e-4330-9a0f-a89e300f6c09",
    name: "One Piece Lamp Glowing Bounty",
    description: "A nice lamp",
    color: null,
    size: null,
    price: 89,
    image: null,
    categoryid: null,
    Image: [
      {
        id: "dd9025e6-723e-4830-a70e-a27ed5db3210",
        url: "https://merchplus.blob.core.windows.net/merchplusproducts/image_10.jpeg",
        productId: "5e0056c6-4f6e-4330-9a0f-a89e300f6c09"
      },
      {
        id: "469142e6-43f1-49f4-b70f-4d96cd414db2",
        url: "https://merchplus.blob.core.windows.net/merchplusproducts/image_9.jpeg",
        productId: "5e0056c6-4f6e-4330-9a0f-a89e300f6c09"
      },
      {
        id: "9780e802-0cf1-4cc0-bbc6-69bfa2babd60",
        url: "https://merchplus.blob.core.windows.net/merchplusproducts/image_8.jpeg",
        productId: "5e0056c6-4f6e-4330-9a0f-a89e300f6c09"
      },
      {
        id: "8ddb8a01-0d54-43a7-8f4f-1d3f019cf0c0",
        url: "https://merchplus.blob.core.windows.net/merchplusproducts/image_7.jpeg",
        productId: "5e0056c6-4f6e-4330-9a0f-a89e300f6c09"
      },
      {
        id: "b9292c7e-d6a2-47a7-a3a6-407a722ef6d1",
        url: "https://merchplus.blob.core.windows.net/merchplusproducts/image_12.jpeg",
        productId: "5e0056c6-4f6e-4330-9a0f-a89e300f6c09"
      }
    ]
  } ;

const data = [{ url: "https://picsum.photos/seed/random101/500/500" },
    { url: "https://picsum.photos/seed/random102/500/500" }, 
    { url: "https://picsum.photos/seed/random103/500/500" },
    {url : "https://picsum.photos/500/500"},
    {url : "https://picsum.photos/500/500"},
    {url : "https://picsum.photos/500/500"},
    {url : "https://picsum.photos/500/500"},
    {url : "https://picsum.photos/500/500"},
    {url : "https://picsum.photos/500/500"},
     
]

export default async function Home(){
    return <div >
        <AppBar></AppBar>
        <div className="flex justify-center">
            <div className="w-2/3 flex border border-black border-5">
                <Gallery data={tempProd.Image ?? []}></Gallery>
            </div>
        </div>
    </div>
} 