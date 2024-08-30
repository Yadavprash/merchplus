"use client"
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { AppBar } from "@/components/appbar/AppBar";
import { Product, Style } from "@/components/types/productType";
import { Gallery } from "@/components/gallery/gallery";
import ProductInfo from "@/components/product/ProductInfo";
import { Reviews } from '@/components/reviews/Reviews';
import {Footer} from '@/components/footer/Footer';
import RouteName from '@/components/RouteName';


export default function ProductDetails() {
  const searchParams = useParams();
  const pid = searchParams.pid;

  const [product, setProduct] = useState<Product|null>(null);
  const [overallRating, setOverallRating] = useState(4);
  const [styles,setStyles] = useState<Style[] | null>(null);
  const [currStyle,setCurrStyle] = useState<number>(0);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/products/${pid}`);
        setProduct(response.data.prod);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(()=>{
    const fetchStyles = async() =>{
      if(product){
          try{
            const response = await axios.get(`http://localhost:3000/api/products/styles/${product.id}`);
            setStyles(response.data.prod)
          }catch(e){
            console.log(e);
          }
      }
    }
    fetchStyles()
  },[product])
  if(!product){
    return <div>
      loading...
    </div>
  }
  return (
    <div>
      <AppBar />
      {/* <RouteName/> */}
      <div className="flex justify-center">
        <div className="w-2/3 grid grid-cols-2 ">
          {styles && <Gallery data={styles[currStyle].images ?? []} /> }
          {styles &&<ProductInfo product={product} currStyle={currStyle} setCurrStyle={setCurrStyle} styles={styles} overallRating={overallRating} />}
        </div>
      </div>
      <div className="w-full ">
        <Reviews data={product.reviews} />
      </div>
      <Footer/>
    </div>
  );
}
