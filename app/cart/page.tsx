"use client";
import { AppBar } from "@/components/appbar/AppBar";
import { CartHeader } from "@/components/cart/CartHeader";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Cart, Product } from "@/components/types/productType";
import { DefaultSession } from "next-auth";
import { CartItem } from "@/components/cart/CartItem";
import Link from "next/link";
import { SkeletonCartItem, SkeletonSummary } from "@/components/skeletons";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export default function Home() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      if (status === "authenticated" && session?.user?.id) {
        try {
          const response = await axios.get(`/api/cart?userId=${session.user.id}`);
          setCart(response.data.cart);
        } catch (e) {
          console.error("Error fetching cart:", e);
        }
      }
    };

    fetchCart();
  }, [status, session]);

  useEffect(() => {
    const populateProducts = async () => {
      if (cart && cart.items.length > 0) {
        try {
          const productIds = cart.items.map(item => item.productId).join(",");
          const response = await axios.get(`/api/products?ids=${productIds}`);
          const fetchedProducts = response.data.msg;

          const newTotal = fetchedProducts.reduce(
            (sum:number, prod:Product, idx:number) =>
              sum + prod.styles[cart.items[idx].styleIdx].price * cart.items[idx].quantity,
            0
          );
          setProducts(fetchedProducts);
          setTotal(newTotal);
        } catch (e) {
          console.error("Error fetching products:", e);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    populateProducts();
  }, [cart]);

  const handleItemDelete = (cartItemId: string) => {
    if (cart) {
      setCart({
        ...cart,
        items: cart.items.filter(item => item.id !== cartItemId)
      });
    }
  };

  if (status === "loading" || loading) {
    return (
      <div>
        <AppBar setProducts={null} cartLength={cart?.items.length || null} />
        <div className="flex flex-col md:flex-row m-5">
          <div className="flex-1 md:mx-20">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
              <div className="col-span-1 md:col-span-3 p-5 md:p-10 bg-white rounded">
                <div className="text-2xl font-bold mb-4">My Bag</div>
                <CartHeader />
                <SkeletonCartItem />
                <SkeletonCartItem />
                <SkeletonCartItem />
              </div>
              <div className="col-span-1 bg-white rounded p-5">
                <SkeletonSummary />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* {JSON.stringify(session)} */}
      <AppBar setProducts={null} cartLength={cart?.items.length || null} />
      <div className="flex flex-col md:flex-row m-5">
        <div className="flex-1 md:mx-20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            <div className="col-span-1 md:col-span-3 p-5 md:p-10 bg-white rounded">
              <div className="text-2xl font-bold mb-4">
                My Bag ({cart?.items?.length ?? 0} items)
              </div>
              <CartHeader />
              <div>
                {cart?.items.length === products.length && Array.isArray(cart?.items) &&
                  products.map((product, idx) => (
                    <CartItem
                      key={idx}
                      cartItemId={cart.items[idx].id}
                      quantity={cart.items[idx].quantity}
                      item={product}
                      styleIdx={cart.items[idx].styleIdx}
                      sizeIdx={cart.items[idx].sizeIdx}
                      onDelete={handleItemDelete}
                    />
                  ))
                }
              </div>
            </div>
            {cart?.items.length === products.length && (
              <div className="col-span-1 bg-white rounded p-5">
                <div className="text-2xl font-bold mb-4">Order Summary</div>
                <div className="flex justify-between mb-2 pb-3 border-b">
                  <div>Subtotal</div>
                  <div>₹{total.toFixed(2)}</div>
                </div>
                <div className="flex justify-between mb-2 pb-3 border-b">
                  <div>Shipping</div>
                  <div>Free</div>
                </div>
                <div className="flex text-xl font-semibold justify-between mb-4">
                  <div>Estimated Total</div>
                  <div>₹{total.toFixed(2)}</div>
                </div>
                <Link href="/checkout">
                  <button className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition">
                    CHECKOUT
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
