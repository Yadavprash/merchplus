// /pages/add-category.tsx
"use client"
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function AddCategory() {
    const [products, setProducts] = useState<any[]>([]);
    const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
    const [categoryNames, setCategoryNames] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        // Fetch products from the API
        async function fetchProducts() {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_APP_URL}/api/products`);
            setProducts(res.data.msg);
        }

        fetchProducts();
    }, []);

    const handleAddCategory = async () => {
        if (!selectedProductId || !categoryNames) {
            setMessage("Please select a product and enter categories.");
            return;
        }

        const categoryArray = categoryNames.split(',').map(name => name.trim());

        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/products/category`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                categoryNames: categoryArray,
                productId: selectedProductId,
            }),
        });

        const result = await res.json();
        console.log(result.msg)
        setMessage(result.msg);
    };

    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-4">Add Category to Product</h1>
            
            <div className="mb-4">
                <label className="block text-gray-700">Select Product</label>
                <select
                    className="mt-2 p-2 border border-gray-300 rounded"
                    onChange={(e) => setSelectedProductId(e.target.value)}
                >
                    <option value="">-- Select a Product --</option>
                    {products.map(product => (
                        <option key={product.id} value={product.id}>
                            {product.name}
                        </option>
                    ))}
                </select>
            </div>
            
            <div className="mb-4">
                <label className="block text-gray-700">Categories (comma-separated)</label>
                <input
                    type="text"
                    className="mt-2 p-2 border border-gray-300 rounded w-full"
                    value={categoryNames}
                    onChange={(e) => setCategoryNames(e.target.value)}
                />
            </div>

            <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleAddCategory}
            >
                Add Category
            </button>

            {message && (
                <div className="mt-4 text-green-600">
                    {message}
                </div>
            )}
        </div>
    );
}
