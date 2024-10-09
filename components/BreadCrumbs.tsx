"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export const BreadCrumbs = () => {
    const path = usePathname();
    const segments = useMemo(() => path?.split('/').filter(Boolean).filter(segment => !["filters", "category"].includes(segment)), [path]);

    return (
        <div className='flex items-center text-sm my-2 p-2 rounded border font-sans text-gray-800'>
            <div className='flex items-center'>
                <Link href='/'>
                <span className='font-medium'>Home</span>
                </Link>
                <svg
                    fill="#000000"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="10px"
                    height="12px"
                    viewBox="0 0 51.388 51.388"
                    className='mx-2'
                >
                    <g>
                        <path d="M9.169,51.388c-0.351,0-0.701-0.157-0.93-0.463c-0.388-0.514-0.288-1.243,0.227-1.634l31.066-23.598L8.461,2.098C7.95,1.708,7.85,0.977,8.237,0.463c0.395-0.517,1.126-0.615,1.64-0.225l33.51,25.456L9.877,51.151C9.664,51.31,9.415,51.388,9.169,51.388z"></path>
                    </g>
                </svg>
            </div>
            {segments &&  segments.map((segment, index) => (
                <div key={index} className='flex items-center'>
                    <Link href={'/catalog'}>
                    <span className='font-medium capitalize'>{segment}</span>
                    </Link>
                    {index < segments.length - 1 && (
                        <svg
                            fill="#000000"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            width="10px"
                            height="12px"
                            viewBox="0 0 51.388 51.388"
                            className='mx-2'
                        >
                            <g>
                                <path d="M9.169,51.388c-0.351,0-0.701-0.157-0.93-0.463c-0.388-0.514-0.288-1.243,0.227-1.634l31.066-23.598L8.461,2.098C7.95,1.708,7.85,0.977,8.237,0.463c0.395-0.517,1.126-0.615,1.64-0.225l33.51,25.456L9.877,51.151C9.664,51.31,9.415,51.388,9.169,51.388z"></path>
                            </g>
                        </svg>
                    )}
                </div>
            ))}
        </div>
    );
};
