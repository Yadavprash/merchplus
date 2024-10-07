"use client"
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { SearchBar } from "../SearchBar";
import { ShopingBag } from "../shoppingbag";
import { usePathname } from "next/navigation";
import { Product } from "@/components/types/productType";
import { HiMenu, HiX } from "react-icons/hi"; // Hamburger and close icons

const navLinkClass =
  "px-4 py-2 hover:underline rounded transition-all duration-300 delay-100 ease-in-out underline-offset-[16px] decoration-teal-500 hover:text-teal-500 focus:ring-2 focus:ring-teal-500 transform hover:scale-105 hover:underline-offset-4 active:text-teal-500";

interface DropdownTypes {
  title: string;
  items: {
    name: string;
    href: string;
  }[];
}

const Dropdown = ({ title, items }: DropdownTypes) => (
  <div className="relative group">
    <div className={navLinkClass}>{title}</div>
    <div className="absolute z-30 hidden group-hover:block border-2 bg-primary rounded-md">
      <div className="flex flex-col p-2 space-y-2 items-center shadow hover:shadow-teal-200">
        {items.map(({ name, href }) => (
          <Link key={name} href={href} className={navLinkClass}>
            {name}
          </Link>
        ))}
      </div>
    </div>
  </div>
);

export const AppBar = ({
  setProducts,
  cartLength,
}: {
  setProducts: React.Dispatch<React.SetStateAction<Product[]>> | null;
  cartLength: number | null;
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const path = usePathname();
  
  const categoryItems = [
    { name: "Figurines", href: "/catalog/filters/category/Figurine" },
    { name: "Hoodies", href: "/catalog/filters/category/Hoodie" },
    { name: "Jackets", href: "/catalog/filters/category/Jacket" },
    { name: "Sneakers", href: "/catalog/filters/category/Sneakers" },
    { name: "Accessories", href: "/catalog/filters/category/Accessories" },
  ];

  const animeSeriesItems = [
    { name: "One Piece", href: "/catalog/filters/category/OnePiece" },
    { name: "Naruto", href: "/catalog/filters/category/Naruto" },
    { name: "HunterXHunter", href: "/catalog/filters/category/HunterXHunter" },
    { name: "DragonBall", href: "/catalog/filters/category/DragonBall" },
    { name: "Jujutsu Kaisen", href: "/catalog/filters/category/JujutsuKaisen" },
  ];

  return (
    <header className="bg-white w-full z-10">
      <nav className="container mx-auto w-full flex justify-between items-center px-4 py-2">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="Merch Plus"
            width={130}
            height={130}
            className="object-cover rounded-full"
          />
        </Link>
        
        {/* Search Bar for larger screens */}
        {path !== "/" && path !="/cart" &&  (
          <div className="hidden md:block w-1/3">
            <SearchBar setProducts={setProducts} />
          </div>
        )}

        {/* Desktop Menu */}
        <div className="hidden md:flex flex-row font-semibold text-stone-700">
          <Link href="/catalog">
            <p className={navLinkClass}>Catalog</p>
          </Link>

          <Dropdown title="Category" items={categoryItems} />
          <Dropdown title="Anime Series" items={animeSeriesItems} />

          <Link href="/">
            <p className={navLinkClass}>Contact</p>
          </Link>

          <Link href="/">
            <p className={navLinkClass}>Policies</p>
          </Link>

        </div>

        <div className="flex justify-end">


        {/* Mobile Menu */}
        <div className="md:hidden flex items-center pr-2">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>
        </div>
            <div className="flex items-center">
              <ShopingBag cartSize={cartLength} />
            </div>
          </div>
      </nav>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden w-full bg-white shadow-lg rounded-md p-4 flex flex-col space-y-2 font-semibold text-stone-700">
          {/* Search Bar for mobile */}
          {path !== "/" && (
            <div className="w-full mb-4">
              <SearchBar setProducts={setProducts} />
            </div>
          )}

          <Link href="/catalog">
            <p className={navLinkClass}>Catalog</p>
          </Link>

          <Dropdown title="Category" items={categoryItems} />
          <Dropdown title="Anime Series" items={animeSeriesItems} />

          <Link href="/">
            <p className={navLinkClass}>Contact</p>
          </Link>

          <Link href="/">
            <p className={navLinkClass}>Policies</p>
          </Link>

        </div>
      )}
    </header>
  );
};
