"use client";
import { useState } from 'react';
import { Product, Style } from "@/components/types/productType";
import SizeSelector from "@/components/product/SizeSelector";
import Features from "@/components/product/Features";
import RatingStars from "@/components/RatingStar";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useSession, signIn } from 'next-auth/react';
import { Styles } from '@/components/styles/Styles';
import Modal from '@/components/Modal'; 

interface ProductInfoProps {
  product: Product;
  currStyle: number;
  setCurrStyle: React.Dispatch<React.SetStateAction<number>>;
  styles: Style[];
  overallRating: number;
}

export default function ProductInfo({ product, currStyle, setCurrStyle, styles, overallRating }: ProductInfoProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState(0);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleLogin = () => {
    setIsLoginModalOpen(true);
  };

  const closeModal = () => {
    setIsLoginModalOpen(false);
  };

  const guestLogin = async () => {
    const res = await signIn("guest", {
      redirect: false,
  });
    closeModal();
  };

  const addToCart = async () => {
    if (!session) {
      handleLogin();
      return;
    }

    await axios.post(`${process.env.NEXT_PUBLIC_APP_URL}/api/cart`, {
      userId: (session?.user as { id: string }).id,
    productId: product.id,
      quantity: 1,
      styleIdx: currStyle,
      sizeIdx: selectedSize,
    });
    router.push("/cart");
  };

  const addToCheckout = async () => {
    if (!session) {
      handleLogin();
      return;
    }

    await axios.post(`${process.env.NEXT_PUBLIC_APP_URL}/api/cart`, {
      userId: (session?.user as { id: string }).id,
      productId: product.id,
      quantity: 1,
      styleIdx: currStyle,
      sizeIdx: selectedSize,
    });
    router.push("/checkout");
  };

  return (
    <div className="flex flex-col m-3 overflow-auto max-h-screen relative">
      <div className="overflow-auto scrollbar-hidden max-h-full">
        <div className="text-2xl lg:text-3xl p-2 font-bold text-wrap">{product.name}</div>
        
        <div className="flex items-center text-xs px-2">
          <RatingStars rating={overallRating} canHover={false} setRating={null} />
          <div className="flex p-1 font-semibold">
            ({product.reviews.length} Reviews)
          </div>
        </div>
        <div className="text-3xl lg:text-4xl p-3 font-bold text-wrap">₹{styles[currStyle].price}</div>
        
        {/* Size Selector */}
        <div className="my-2">
          <SizeSelector sizes={product.size} selectedSize={selectedSize} setSelectedSize={setSelectedSize} />
        </div>

        {/* Styles Selector */}
        <div className="my-2">
          <Styles currStyle={currStyle} setCurrStyle={setCurrStyle} styles={styles} />
        </div>

        {/* Add to Cart and Buy Now buttons */}
        <div className="flex flex-wrap items-center p-2">
          <button
            onClick={addToCart}
            className="bg-black text-sm text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 transition ease-in-out duration-300 w-full sm:w-auto mb-2 sm:mb-0"
          >
            ADD TO CART
          </button>
          <button
            onClick={addToCheckout}
            className="bg-black text-sm text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 transition ease-in-out duration-300 w-full sm:w-auto sm:ml-4"
          >
            BUY NOW
          </button>
        </div>

        {/* Features */}
        <div className="my-4">
          <Features />
        </div>

        {/* Product Description */}
        <div className="p-2">
          <div className="text-lg font-semibold text-gray-800">Description</div>
          <div className="text-gray-700">{product.description}</div>
        </div>
      </div>

      {/* Login Modal */}
      {isLoginModalOpen && (
        <Modal onClose={closeModal}>
          <div className="p-4 text-center">
            <h2 className="text-xl font-semibold mb-4">Login Required</h2>
            <button
              className="bg-black text-white py-2 px-2 mx-2 rounded-md mb-2"
              onClick={() => signIn('google')}
            >
              Continue with Google
            </button>
            <button
              className="bg-gray-700 text-white py-2 px-4 mx-2 rounded-md mb-2"
              onClick={guestLogin}
            >
              Continue as Guest
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
