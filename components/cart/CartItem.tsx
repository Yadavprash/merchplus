import axios from "axios";
import { Product } from "../types/productType";
import Image from "next/image";
import { useState } from "react";
import { SkeletonCartItem } from "../skeletons";

interface CartItemProps {
  item: Product;
  quantity: number;
  cartItemId: string;
  styleIdx: number;
  sizeIdx: number;
  onDelete: (cartItemId: string) => void;
  loading?: boolean; // Optional loading prop to show skeletons
}

export const CartItem = ({
  item,
  quantity,
  styleIdx,
  sizeIdx,
  cartItemId,
  onDelete,
  loading = false,
}: CartItemProps) => {
  const url = item?.styles[styleIdx]
    ? item.styles[styleIdx].images[0].url + process.env.NEXT_PUBLIC_AZURE_BLOB_TOKEN
    : "https://picsum.photos/500/500";

  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    try {
      setIsDeleting(true);
      const response = await axios.delete(
        `/api/cart?cartItemId=${cartItemId}`
      );
      console.log("Item deleted:", response.data);
      onDelete(cartItemId);
    } catch (error) {
      console.error("Error deleting item:", error);
    } finally {
      setIsDeleting(false);
    }
  }

  if (loading || isDeleting) {
    return (
      <SkeletonCartItem></SkeletonCartItem>
    );
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
      <div className="w-full p-2 flex flex-col justify-between  ">
        <div className="flex flex-col   md:flex-row justify-between">
          <div className="flex flex-col space-y-1 mb-2 md:mb-0 lg:w-[400px] text-wrap ">
            <div className="text-md font-semibold">{item.name}</div>
            <div className="text-sm text-gray-500">{item.styles[styleIdx].name}</div>
            <div className="text-sm text-gray-500">Size: {item.size[sizeIdx]}</div>
          </div>
          <div className="flex flex-col md:flex-row justify-between ">
            <div className="flex flex-col items-end mx-2">
              <div className="text-sm text-gray-500">Item Price</div>
              <div className="font-medium">₹ {item.styles[styleIdx].price}</div>
            </div>
            <div className="flex flex-col items-end mx-2">
              <div className="text-sm text-gray-500">Quantity</div>
              <div className="font-medium">{quantity}</div>
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
