"use client"
import { AppBar } from "@/components/appbar/AppBar";
import { CartHeader } from "@/components/cart/CartHeader";
import { Product } from "@/components/types/productType";
import { CartItem } from "@/components/cart/CartItem";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Cart } from "@/components/cart/CartTypes";

export default function Home() {
    const [cart, setCart] = useState<Cart|null>(null);
    const [products, setProducts] = useState<Product[]>([]); 
    const [total,setTotal] = useState(0);
    const session = useSession();

    useEffect(() => {
        const fetchCart = async () => {
            if (session.status === "authenticated" && session.data?.user?.id) {
                const id = session.data.user.id;
                try {
                    const response = await axios.get(`http://localhost:3000/api/cart?userId=${id}`);
                    setCart(response.data.cart);
                } catch (e) {
                    console.log(e);
                }
            }
        };
    
        if (session.status === "authenticated") {
            fetchCart();
        }
        
    }, [session]);
  
    useEffect(() => {
        const populateProducts = async () => {
            if (cart && Array.isArray(cart.items)) {
                let prods = [];
                let total = 0;
                for (const item of cart.items) {
                    try {
                        const response = await axios.get(`http://localhost:3000/api/products/${item.productId}`);
                        prods.push(response.data.prod);
                        total += item.quantity * item.price;
                    } catch (e) {
                        console.log(e);
                    }

                }
                setProducts(prods);
                setTotal(total);
            }
        };
        if(cart){
            populateProducts();
        }
    }, [cart]);

    if (session.status === "loading") {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {/* {JSON.stringify(session)} */}
            {/* {JSON.stringify(cart)} */}
            {/* {JSON.stringify(products)} */}
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
                                {Array.isArray(cart?.items) && products.map((product, idx) => (
                                    <CartItem key={idx} quantity={cart.items[idx].quantity} item={product} />
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
