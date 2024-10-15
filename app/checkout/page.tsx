"use client";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Cart } from "@/components/types/productType"; 
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AppBarMinimal } from '@/components/appbar/AppBarMinimal';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Link from 'next/link';

// Form validation schema using Zod
const checkoutSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    address: z.string().min(1, 'Address is required'),
    city: z.string().min(1, 'City is required'),
    postalCode: z.string().min(5, 'Postal code is required'),
    country: z.string().min(1, 'Country is required'),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

const CheckoutPage = () => {
    const [cart, setCart] = useState<Cart | null>(null);
    const { data: session, status } = useSession();
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchCart = async () => {
            if (status === "authenticated" && session?.user?.id) {
                try {
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_APP_URL}/api/cart?userId=${session.user.id}`);
                    setCart(response.data.cart);
                } catch (e) {
                    console.error("Error fetching cart:", e);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        fetchCart();
    }, [status, session]);

    const { register, handleSubmit,reset, formState: { errors } } = useForm<CheckoutForm>({
        resolver: zodResolver(checkoutSchema),
    });

    const calculateTotal = () => {
        return cart?.items.reduce((total, item) => {
            const style = item.product.styles[item.styleIdx];
            return total + style.price * item.quantity;
        }, 0).toFixed(2);
    };

    const onSubmit  = (data:CheckoutForm) => {
        setIsSubmitting(true);
        
        // Simulating an API call or order processing
        setTimeout(() => {
          console.log("Checkout data:", data);
          setIsSubmitting(false);
          setShowModal(true);  // Show success modal
          reset(); // Reset form after submission
        }, 1000);
      };

    return (
        <div>
            <AppBarMinimal cartLength={null} />

            <div className="flex justify-center px-4">
                <div className="w-full max-w-4xl">
                    <h1 className="text-center text-3xl font-bold mb-6">Checkout</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Billing Details Form */}
                        <div className="order-2 md:order-1">
                            <h2 className="text-2xl font-semibold mb-4">Billing Details</h2>
                           
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium">Full Name</label>
                                        <input
                                            type="text"
                                            {...register('name')}
                                            className="mt-1 p-2 block w-full border rounded-md focus:ring focus:ring-opacity-50"
                                        />
                                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium">Email</label>
                                        <input
                                            type="email"
                                            {...register('email')}
                                            className="mt-1 p-2 block w-full border rounded-md focus:ring focus:ring-opacity-50"
                                        />
                                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium">Address</label>
                                        <input
                                            type="text"
                                            {...register('address')}
                                            className="mt-1 p-2 block w-full border rounded-md focus:ring focus:ring-opacity-50"
                                        />
                                        {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium">City</label>
                                        <input
                                            type="text"
                                            {...register('city')}
                                            className="mt-1 p-2 block w-full border rounded-md focus:ring focus:ring-opacity-50"
                                        />
                                        {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium">Postal Code</label>
                                        <input
                                            type="text"
                                            {...register('postalCode')}
                                            className="mt-1 p-2 block w-full border rounded-md focus:ring focus:ring-opacity-50"
                                        />
                                        {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode.message}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium">Country</label>
                                        <input
                                            type="text"
                                            {...register('country')}
                                            className="mt-1 p-2 block w-full border rounded-md focus:ring focus:ring-opacity-50"
                                        />
                                        {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>}
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 transition"
                                    >
                                        Place Order
                                    </button>
                                </form>
                            
                        </div>

                        {/* Order Summary */}
                        <div className="order-1 md:order-2 bg-gray-50 p-4 rounded-md">
                            <h2 className="text-2xl font-semibold mb-4">Your Order</h2>
                            {isLoading ? (
                                 Array.from({ length: 3 }).map((_, index) => (
                                    <div key={index} className="flex justify-between items-center">
                                        <div className="flex items-center space-x-4">
                                            <Skeleton width={64} height={64} className="rounded" />
                                            <div>
                                                <Skeleton width={120} height={16} />
                                                <Skeleton width={80} height={16} />
                                                <Skeleton width={60} height={16} />
                                            </div>
                                        </div>
                                        <Skeleton width={50} height={20} />
                                    </div>
                                ))
                            ) : (
                                <ul className="space-y-4 h-64 md:h-96 overflow-y-auto">
                                    {cart?.items.map((item) => {
                                        const productStyle = item.product.styles[item.styleIdx];
                                        return (
                                            <div key={item.id} className="flex justify-between items-center">
                                                <div className="flex items-center space-x-4">
                                                    <Image
                                                        src={productStyle.images[0].url + process.env.NEXT_PUBLIC_AZURE_BLOB_TOKEN}
                                                        alt={item.product.name}
                                                        width={64}
                                                        height={64}
                                                        className="object-cover rounded"
                                                    />
                                                    <div>
                                                        <Link href={`/product/${item.product.id}`}>
                                                        <h3 className="font-medium">{item.product.name.length > 50 ?item.product.name.substring(0,50) + "...":item.product.name}</h3>
                                                        </Link>
                                                        <p className="text-sm">Style: {productStyle.name}</p>
                                                        <p className="text-sm">Size: {item.product.size[item.sizeIdx]}</p>
                                                        <p className="text-sm">Quantity: {item.quantity}</p>
                                                    </div>
                                                </div>
                                                <p className="text-lg font-semibold">₹{(productStyle.price * item.quantity).toFixed(2)}</p>
                                            </div>
                                        );
                                    })}
                                </ul>
                            )}
                            {!isLoading && (
                                <div className="border-t mt-4 pt-4 flex justify-between">
                                    <span className="text-lg  font-bold">Total</span>
                                    <span className="text-xl font-bold">₹{calculateTotal()}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal for Order Placed */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm w-full">
            <h3 className="text-lg font-bold">Order Placed Successfully!</h3>
            <p className="mt-4 text-gray-600">Thank you for your purchase.</p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-6 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
        </div>
    );
};

export default CheckoutPage;
