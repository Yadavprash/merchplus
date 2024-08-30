"use client"
import Image from "next/image"
import { useCallback, useState } from "react";
import { Style } from "@/components/types/productType";
interface StyleProps{
    styles: Style[];
    currStyle:number;
    setCurrStyle : React.Dispatch<React.SetStateAction<number>>;
}
export const Styles = ({styles,currStyle ,setCurrStyle}:StyleProps) =>{
    const [currImage,setCurrImage] = useState(0);
    const handleImageChange = useCallback((idx: number) => {
        setCurrImage(idx);
    }, []);
    return <div>
        <div className="font-semibold mx-2 font-serif ">Style: {styles[currStyle].name}</div>
        <div className="flex ">
            {styles && styles.map((style,idx) =>{
            
                const url = style.images[0].url + process.env.NEXT_PUBLIC_AZURE_BLOB_TOKEN 
                return <div key={style.id}>
                    <Image
                        width={60}
                        height={60}
                        src={url}
                        alt="StyleName"
                        onClick={()=>{
                            setCurrStyle(idx)
                        }}
                        onMouseEnter={() =>handleImageChange(idx)}
                        className={`relative border rounded my-2 ml-2 ${
                            currImage === idx ? 'border-4 border-green-600' : 'border-1 border-black'
                        }`}
                        ></Image>
                    </div>
            })}
        </div>
    </div>
}