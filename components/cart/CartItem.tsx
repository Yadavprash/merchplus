import axios from "axios";
import { Product } from "../types/productType";
import Image from "next/image";
import { useState } from "react";

interface CartItemProps {
  item: Product;
  quantity: number;
  cartItemId: string;
  styleIdx: number;
  sizeIdx: number;
  onDelete: (cartItemId: string) => void; // Add a callback prop to update the parent component
}

export const CartItem = ({
  item,
  quantity,
  styleIdx,
  sizeIdx,
  cartItemId,
  onDelete, // Accept the callback
}: CartItemProps) => {
  const url = item?.styles[styleIdx]
    ? item.styles[styleIdx].images[0].url + process.env.NEXT_PUBLIC_AZURE_BLOB_TOKEN
    : "https://picsum.photos/500/500";

  const [isDeleting, setIsDeleting] = useState(false); // State to track deletion status

  async function handleDelete() {
    try {
      setIsDeleting(true);
      const response = await axios.delete(
        `http://localhost:3000/api/cart?cartItemId=${cartItemId}`
      );
      console.log("Item deleted:", response.data);
      onDelete(cartItemId); // Call the callback to update the parent component
    } catch (error) {
      console.error("Error deleting item:", error);
    } finally {
      setIsDeleting(false); // Reset deletion status
    }
  }

  return (
    <div className={`flex border-b ${isDeleting ? "opacity-50" : ""}`}>
      <div className="my-2">
        <Image width={200} height={200} src={url} alt="prodImage" />
      </div>
      <div className="w-full p-2">
        <div className="flex flex-col">
          <div>{item.name}</div>
          <div>{item.styles[styleIdx].name}</div>
          <div>{item.size[sizeIdx]}</div>
        </div>
        <div className="flex justify-end">
          <div className="flex mx-2 flex-col">
            <div>Item Price</div>
            <div>{item.styles[styleIdx].price}</div>
          </div>
          <div className="flex mx-2 flex-col">
            <div>Quantity</div>
            <div>{quantity}</div>
          </div>
          <div className="flex ml-2 flex-col">
            <div>Total Price</div>
            <div>₹ {item.styles[styleIdx].price * quantity}</div>
          </div>
        </div>
        <div className="flex mt-2 justify-between">
          <div className="font-mono">Free Shipping + Free Returns</div>
          <div>
            <button
              onClick={handleDelete}
              className="underline"
              disabled={isDeleting}
            >
              {isDeleting ? "Removing..." : "Remove"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
