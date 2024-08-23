"use client"
import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { useState, useEffect } from 'react';
import Image from "next/image";
import { useParams } from 'next/navigation'
import axios from 'axios';
import { AppBar } from "@/components/appbar/AppBar";
import { Product } from "@/components/types/productType";
import { Gallery } from "@/components/gallery/gallery";
import RatingStars from "@/components/RatingStar";


const tempProd: Product = {
  id: "5e0056c6-4f6e-4330-9a0f-a89e300f6c09",
  name: "One Piece Lamp Glowing Bounty",
  description: "A nice lamp. The lamp is a modern, minimalist table lamp with a sleek metal base and a smooth, cylindrical shade. The base is finished in matte black, providing a stylish contrast to the soft white of the fabric shade. Standing about 18 inches tall, the lamp's simple yet elegant design makes it a versatile piece, perfect for a bedside table or a cozy reading nook. When lit, the lamp emits a warm, inviting glow that creates a relaxing ambiance in any room. ",
  color: [
    {
      "id": 1,
      "name": "Red"
    },
    {
      "id": 2,
      "name": "Blue"
    },
    {
      "id": 3,
      "name": "Black"
    },
    {
      "id": 4,
      "name": "Green"
    }
  ],
  size: [
    {
      "id": 1,
      "name": "S"
    },
    {
      "id": 2,
      "name": "M"
    },
    {
      "id": 3,
      "name": "L"
    },
    {
      "id": 4,
      "name": "XL"
    }
  ],
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
  ],
  reviews : [
    {
      "id": "e8c2b9d7-f8d9-4f5e-b0e8-3f4b50b96f52",
      "rating": 5,
      "review": "Excellent product! Highly recommend.",
      "productId": "a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6"
    },
    {
      "id": "d4f5e6c7-b8a9-0e1f-2g3h-4i5j6k7l8m9n",
      "rating": 4,
      "review": "Very good, but could use some improvements.",
      "productId": "a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6"
    },
    {
      "id": "c7e8f9g0-h1i2-3j4k-5l6m-7n8o9p0q1r2s",
      "rating": 3,
      "review": "Average quality. Not bad, but not great.",
      "productId": "a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6"
    },
    {
      "id": "b5c6d7e8-f9g0-1h2i-3j4k-5l6m7n8o9p0q",
      "rating": 2,
      "review": "Disappointed with the product quality.",
      "productId": "a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6"
    },
    {
      "id": "a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6",
      "rating": 1,
      "review": "Terrible experience. Would not recommend.",
      "productId": "a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6"
    }
  ]
};


export default function Home() {
  const searchParams = useParams()
  const pid = searchParams.pid;

  const [product, setProduct] = useState<Product>(tempProd);
  const [selectedSize, setSelectedSize] = useState(1);
  const [selectedColor, setSelectedColor] = useState(1);
  const [overallRating,setOverallRating] = useState(4);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/products/${pid}`);
        setProduct(response.data.msg);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();


  }, []);

  return <div>
    <AppBar></AppBar>
    <div className="flex justify-center">
      <div className="w-2/3 grid grid-cols-2 border border-black border-5">
        <Gallery data={product.Image ?? []}></Gallery>
        <div className="flex flex-col m-3 overflow-auto max-h-screen relative">
          <div className="overflow-auto scrollbar-hidden max-h-full">
            <div className="text-3xl p-2 font-bold text-wrap">{product.name}</div>
            <div className="flex text-xs px-2">
              <RatingStars rating={overallRating} ></RatingStars> 
              <div className="flex p-1 font-semibold">
                ( {tempProd.reviews.length} Reviews )
              </div> 
            </div>
            <div className="text-4xl p-3 font-bold text-wrap">₹{product.price}</div>
              {/* Size Information */}
      <div className="p-2">
        {tempProd.size && tempProd.size.length  > 0 ? (
          <div>
            <strong className="font-semibold text-sm">Size:</strong>
            <ul className="list-disc pl-5 mt-1">
              {tempProd.size.map((s) => (
                 <button
                 key={s.id}
                 className={`p-3 w-12 border rounded-full mx-1 text-xs font-bold  transition-colors ${
                   selectedSize === s.id  
                     ? 'bg-blue-500 text-white border-blue-500'
                     : 'bg-white text-gray-700 border-gray-300'
                 } hover:bg-blue-50`}
                 onClick={() => setSelectedSize(s.id)}
               >
                 {s.name}
               </button>
              ))}
            </ul>
          </div>
        ) : (
          <div className="text-gray-500">Size info not available</div>
        )}
      </div>
      
      {/* Color Information */}
      <div className="p-2">
        {tempProd.color && tempProd.color.length > 0 ? (
          <div>
            <strong className="font-semibold text-sm">Color:{tempProd.color[selectedColor-1].name}</strong>
            <ul className="list-disc pl-5 mt-1">
              {tempProd.color.map((c) => (
                <button
                key={c.id}
                className={`p-4 border border-2 rounded-full mx-1 text-xs font-medium transition-colors ${
                  selectedColor === c.id
                  ? 'bg-gray-800 text-white border-black'
                     : 'bg-white text-gray-700 border-black-600'
                 } hover:bg-gray-50`}
                 onClick={() => setSelectedColor(c.id)}
                 style={{ backgroundColor:  c.name.toLowerCase() }}
                 >
                
               </button>
              ))}
            </ul>
          </div>
        ) : (
          <div className="text-gray-500">Color info not available</div>
        )}
      </div>

            <div className="flex items-center p-2">
              <div className="mx-2">
                <button className="bg-blue-600 text-sm text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition ease-in-out duration-300">
                  ADD TO CART
                </button>
              </div>
              <div className="mx-2">
                <button className="bg-orange-500 text-white text-sm  font-semibold py-2 px-4 rounded-full shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 transition ease-in-out duration-300">
                  BUY NOW
                </button>
              </div>
            </div>
            <div className="flex my-4 justify-between">
              <div className="flex flex-col mx-1 items-center justify-center">
                <Image width={80} height={80} src={"/images/returns.jpeg"} alt="10dayreturn" className="p-1 rounded-full border border-2 border-dashed"></Image>
                <label className="text-xs font-serif text-gray-400">10 Day returns</label>
              </div>
              <div className="flex flex-col mx-1 items-center justify-center">
                <Image width={80} height={80} src={"/images/deliveryTruck.jpeg"} alt="10dayreturn" className="p-1 rounded-full border border-2 border-dashed"></Image>
                <label className="text-xs font-serif text-gray-400">Free Delivery</label>

              </div>
              <div className="flex flex-col mx-1 items-center justify-center">
                <Image width={80} height={80} src={"/images/payOnDelivery.jpeg"} alt="10dayreturn" className="p-1 rounded-full border border-2 border-dashed"></Image>
                <label className="text-xs font-serif text-gray-400">Pay on delivery</label>

              </div>
              <div className="flex flex-col mx-1 items-center justify-center">
                <Image width={80} height={80} src={"/images/topBrand.jpeg"} alt="10dayreturn" className="p-1 rounded-full border border-2 border-dashed"></Image>
                <label className="text-xs font-serif text-gray-400">Top Brand</label>

              </div>
              <div className="flex flex-col mx-1 items-center justify-center">
                <Image width={80} height={80} src={"/images/securedPayment.jpeg"} alt="10dayreturn" className="p-1 rounded-full border border-2 border-dashed"></Image>
                <label className="text-xs font-serif text-gray-400">Secured Payments</label>

              </div>

            </div>
            <div className="p-2">
              <div className="text-lg  font-semibold text-gray-800">
                Description
              </div>
              <div className="text-gray-700">
                {tempProd.description}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="w-2/3">
      Customer Reviews Here
    </div>
  </div>
}