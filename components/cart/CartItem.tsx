import axios from "axios";
import { Product } from "../types/productType";
import Image from "next/image";
import { useState } from "react";
import { SkeletonCartItem } from "../skeletons";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface CartItemProps {
  item: Product;
  quantity: number;
  cartItemId: string;
  styleIdx: number;
  sizeIdx: number;
  onDelete: (cartItemId: string) => void;
  loading?: boolean; 
}

export const CartItem = ({
  item,
  quantity: initialQuantity,
  styleIdx,
  sizeIdx,
  cartItemId,
  onDelete,
  loading = false,
}: CartItemProps) => {
  const url = item?.styles[styleIdx]
    ? item.styles[styleIdx].images[0].url + process.env.NEXT_PUBLIC_AZURE_BLOB_TOKEN
    : "https://picsum.photos/500/500";

  const [quantity, setQuantity] = useState(initialQuantity); 
  const [isDeleting, setIsDeleting] = useState(false);
  const { data: session, status } = useSession();
  const userId = session?.user.id;

  async function handleDelete() {
    try {
      setIsDeleting(true);
      const response = await axios.delete(
        `/api/cart?userId=${userId}&cartItemId=${cartItemId}`
      );
      console.log("Item deleted:", response.data);
      onDelete(cartItemId);
    } catch (error) {
      console.error("Error deleting item:", error);
    } finally {
      setIsDeleting(false);
    }
  }

  async function handleIncrement() {
    try {
      const updatedQuantity = quantity + 1;
      const response = await axios.post(`/api/cart`, {
        userId,
        cartItemId,
        quantity: updatedQuantity,
        styleIdx,
        sizeIdx
      });
      setQuantity(updatedQuantity);
      // console.log("Quantity incremented:", response.data);
    } catch (error) {
      console.error("Error incrementing quantity:", error);
    }
  }

  async function handleDecrement() {
    if (quantity === 1) return; 
    try {
      const updatedQuantity = quantity - 1;
      const response = await axios.post(`/api/cart`, {
        userId,
        cartItemId,
        quantity: updatedQuantity,
      });
      setQuantity(updatedQuantity);
      // console.log("Quantity decremented:", response.data);
    } catch (error) {
      console.error("Error decrementing quantity:", error);
    }
  }

  if (loading || isDeleting) {
    return <SkeletonCartItem />;
  }

  return (
    <div className={`flex flex-col space-y-1 mb-2 pb-2 md:flex-row border-b ${isDeleting ? "opacity-50" : ""}`}>
      <div className="my-2 md:w-1/3 w-full flex justify-center">
        <Image
          width={200}
          height={200}
          src={url}
          alt="prodImage"
          className="object-cover max-w-full h-auto"
        />
      </div>
      <div className="w-full p-2 flex flex-col justify-between">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="flex flex-col space-y-1 mb-2 md:mb-0 lg:w-[400px] text-wrap">
            <Link href={`/product/${item.id}`}>
              <div className="text-md font-semibold">{item.name}</div>
            </Link>
            <div className="text-sm text-gray-500">{item.styles[styleIdx].name}</div>
            <div className="text-sm text-gray-500">Size: {item.size[sizeIdx]}</div>
          </div>
          <div className="flex flex-col md:flex-row justify-between">
            <div className="flex flex-col items-end mx-2">
              <div className="text-sm text-gray-500">Item Price</div>
              <div className="font-medium">₹ {item.styles[styleIdx].price}</div>
            </div>
            <div className="flex flex-col items-end mx-2">
              <div className="text-sm text-gray-500">Quantity</div>
              <div className="flex items-center">
                <button
                  onClick={handleDecrement}
                  className="px-2 py-1 bg-gray-300 text-gray-800 rounded-l"
                  disabled={quantity === 1}
                >
                  -
                </button>
                <div className="px-4 py-1 font-medium">{quantity}</div>
                <button
                  onClick={handleIncrement}
                  className="px-2 py-1 bg-gray-300 text-gray-800 rounded-r"
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex flex-col items-end mx-2">
              <div className="text-sm text-gray-500">Total Price</div>
              <div className="font-medium">₹ {item.styles[styleIdx].price * quantity}</div>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="font-mono text-sm text-gray-600">Free Shipping + Free Returns</div>
          <button
            onClick={handleDelete}
            className="bg-gray-600 text-white text-xs p-2 rounded hover:bg-red-700 transition"
            disabled={isDeleting}
          >
            {isDeleting ? "Removing..." : "Remove"}
          </button>
        </div>
      </div>
    </div>
  );
};
