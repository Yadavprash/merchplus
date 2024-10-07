import Link from "next/link";
import Image from "next/image";
import { ShopingBag } from "../shoppingbag";
import { usePathname } from "next/navigation";

const navLinkClass =
  "px-4 py-2 hover:underline rounded transition-all duration-300 delay-100 ease-in-out underline-offset-[16px] decoration-teal-500 hover:text-teal-500 focus:ring-2 focus:ring-teal-500 transform hover:scale-105 hover:underline-offset-4 active:text-teal-500";



export const AppBarMinimal = ({ cartLength}:{cartLength : number | null}) => {
  const path = usePathname();
  
  return (
    <header className="bg-white w-full z-10">
      <nav className="container mx-auto w-2/3 flex justify-between items-center">
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="Merch Plus"
            width={130}
            height={130}
            className="object-cover rounded-full"
          />
        </Link>


        <div className="flex flex-row font-semibold text-stone-700">
          



          {/* <Link href="/signin">
            <p className={navLinkClass}>SignIn</p>
          </Link> */}

        

          {path !== "/" && (
            <div className="flex items-center">
              <ShopingBag cartSize = {cartLength} />
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};
