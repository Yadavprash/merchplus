"use client"
import { AppBar } from "@/components/appbar/AppBar";
import { CartHeader } from "@/components/cart/CartHeader";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Cart, Product } from "@/components/types/productType";
import { DefaultSession } from "next-auth";
import { CartItem } from "@/components/cart/CartItem";

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

    useEffect(() => {
        const fetchCart = async () => {
            if (status === "authenticated" && session?.user?.id) {
                try {
                    const response = await axios.get(`http://localhost:3000/api/cart?userId=${session.user.id}`);
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
                    const productRequests = cart.items.map(item =>
                        axios.get(`http://localhost:3000/api/products/${item.productId}`)
                    );
                    const productResponses = await Promise.all(productRequests);
                    const fetchedProducts = productResponses.map(response => response.data.prod);
                    const newTotal = fetchedProducts.reduce((sum, prod, idx) => sum + prod.styles[cart.items[idx].styleIdx].price * cart.items[idx].quantity, 0);
                    setProducts(fetchedProducts);
                    setTotal(newTotal);
                } catch (e) {
                    console.error("Error fetching products:", e);
                }
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

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <AppBar />
            <div className="flex m-5 justify-center">
                <div className="w-full mx-20">
                    <div className="grid grid-cols-4">
                        <div className="col-span-3 p-10">
                            <div className="text-2xl font-bold">
                                My Bag ({cart?.items?.length ?? 0} items)
                            </div>
                            <div className="my-3">
                                <CartHeader />
                            </div>
                            <div>
                                {cart?.items.length === products.length &&  Array.isArray(cart?.items) && products.map((product, idx) => (
                                    <CartItem 
                                        key={idx} 
                                        cartItemId={cart.items[idx].id} 
                                        quantity={cart.items[idx].quantity} 
                                        item={product} 
                                        styleIdx={cart.items[idx].styleIdx} 
                                        sizeIdx={cart.items[idx].sizeIdx} 
                                        onDelete={handleItemDelete} 
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="col-span-1 mt-10 py-10 px-5 bg-white text-black">
                            <div className="text-3xl font-bold mb-4">Order Summary</div>
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
                            <div>
                                <button className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition">
                                    CHECKOUT
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
