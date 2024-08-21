"use client"
import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import { getServerSession } from "next-auth";
import {useState,useEffect} from 'react';
import axios from 'axios';
import ProductCard from "@/components/productCard/card";
import { AppBar } from "@/components/appbar/AppBar";
import { Product } from "@/components/types/productType";
import Link from "next/link";

const product = {
    id: '1',
    name: 'One piece lamb',
    price: 10.99,
    imageUrl: 'https://merchplus.blob.core.windows.net/merchplusproducts/image_12.jpeg?sp=r&st=2024-08-18T04:05:02Z&se=2024-08-18T12:05:02Z&spr=https&sv=2022-11-02&sr=b&sig=uZ8gOmsRZpYDHXicumVsIvAZZGeIUqxjeQCx2BnjnyY%3D',
    imageUrl2: '/images/blackHoodie2.jpg'
  };

  
  export default function Home(){
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:3000/api/products'); // replace with your endpoint
            // console.log(response.data);
            setProducts(response.data.msg);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);
    return <div>
        <AppBar></AppBar>
        <div className="flex justify-center">
            <div className="w-2/3 border border-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-10 ">
            {products.map((prod:Product,idx)=>{
                if(prod.Image != null)
                 return <Link key={prod.id} href={`/product/${prod.id}`}>
                  <ProductCard key={idx} product ={prod} />
                 </Link> 
                return null;
            })}
        </div>
    </div>
    </div>
}