"use client"
import {  useEffect, useState } from "react";
import { Product } from "@/components/types/productType";
import axios from "axios";
import { usePathname,useRouter } from "next/navigation";
import { setProducts } from "@/store/features/productSlice";
import { useDispatch } from "react-redux";


export const SearchBar = () => {
    const [query,setQuery] = useState("");
    const [debouncedQuery,setDebouncedQuery] = useState("");
    const path = usePathname();
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(()=>{
      const timerId = setTimeout(()=>{
        setDebouncedQuery(query);
      },500)

      return () =>{
        clearTimeout(timerId);
      }
      
    },[query])
    useEffect(()=>{
      const fetchResults = async () => {
        if (query.length && setProducts) {
          try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_APP_URL}/api/products/search`, { query :debouncedQuery });
            
            const data = response.data.products;
        `1267`
            dispatch(setProducts(data));
            console.log(path);
            if(path.startsWith("/product")){
              router.push("/catalog/search");
            }
          } catch (error) {
            console.error("Error fetching search results:", error);
          }
        } 
      };
      
      fetchResults();
    },[debouncedQuery,setProducts]);
    return (
      <div className="border rounded bg-primary focus-within:border-black">
        <div className="relative flex items-center h-8  rounded py-5 overflow-hidden">
          <div className="grid place-items-center pl-2 w-8 text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="black"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
             </svg> 
            </div>
  
          <input
            className="peer h-full w-full outline-none text-xs text-gray-700 py-5 px-2 bg-primary "
            type="text"
            id="search"
            placeholder="search for products"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>
    );
  };
  