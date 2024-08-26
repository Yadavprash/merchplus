import Link from "next/link";
import Image from "next/image";
import { SearchBar } from "../SearchBar";
import { Notibell } from "../Notibell";
import { ShopingBag } from "../shoppingbag";
import { useEffect } from "react";
export const AppBar = () => {
 
  return (
    <header className="bg-white w-full z-10">
      <nav className="container mx-auto w-2/3 flex justify-between items-center ">
        <Image
          src={'/images/logo.png'}
          alt={'Merch Plus'}
          width={130}
          height={130}
          className="object-cover rounded-full"
        />
        <div className="flex flex-row font-sans font-semibold  text-stone-700 ">
            <Link href="/">
              <p className="px-4 py-2 hover:underline rounded
                transition-all duration-200  ease-in-out underline-offset-[16px] decoration-teal-500 
                hover:text-teal-500 
                focus:ring-2 focus:ring-teal-500 
                transform hover:scale-105  hover:underline-offset-4  ">Home</p>
            </Link>
            <Link href="/catalog">
              <p className="px-4 py-2 hover:underline rounded
                transition-all duration-300 delay-100 ease-in-out underline-offset-[16px] decoration-teal-500 
                hover:text-teal-500 
                focus:ring-2 focus:ring-teal-500 
                transform hover:scale-105  hover:underline-offset-4">
                Catalog
              </p>
            </Link>
            <Link href="/">
              <p className="px-4 py-2 hover:underline rounded
                transition-all duration-300 delay-100 ease-in-out underline-offset-[16px] decoration-teal-500 
                hover:text-teal-500 
                focus:ring-2 focus:ring-teal-500 
                transform hover:scale-105  hover:underline-offset-4">Category</p>
            </Link>
            <Link href="/">
              <p className="px-4 py-2 hover:underline rounded
                transition-all duration-300 delay-100 ease-in-out underline-offset-[16px] decoration-teal-500 
                hover:text-teal-500 
                focus:ring-2 focus:ring-teal-500 
                transform hover:scale-105  hover:underline-offset-4">Anime Series</p>
            </Link>
            <Link href="/about">
              <p className="px-4 py-2 hover:underline rounded
                transition-all duration-300 delay-100 ease-in-out underline-offset-[16px] decoration-teal-500 
                hover:text-teal-500 
                focus:ring-2 focus:ring-teal-500 
                transform hover:scale-105  hover:underline-offset-4">Contact</p>
            </Link>
            <Link href="/contact">
              <p className="px-4 py-2 hover:underline rounded
                transition-all duration-300 delay-100 ease-in-out underline-offset-[16px] decoration-teal-500 
                hover:text-teal-500 
                focus:ring-2 focus:ring-teal-500 
                transform hover:scale-105  hover:underline-offset-4">Policies</p>
            </Link>
        </div>
          <div className="mt-1 ">
            <SearchBar/>
          </div>
        <div className="">
          <ShopingBag></ShopingBag>
        </div>
      </nav>
    </header>
  );
};