import { Product } from "@/components/types/productType";
import axios from "axios";
import { error } from "console";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default async function Home(){
    const searchParams = useParams()
    const id = searchParams.pid;
    const [product,setProduct] = useState<Product>();

    useEffect(() => {
        const fetchData = async() => {
            try{
                const response = await axios.get(`http://localhost:3000/api/products/${id}`);
                setProduct(response.data.msg)
    
            }catch(e){
                console.log(error);
            }
        }
        fetchData();
    },[])

    return <div>
        
    </div>
}