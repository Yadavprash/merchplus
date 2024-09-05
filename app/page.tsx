"use client"
import { useState, useEffect } from 'react'
// import { Button } from "@/components/ui/button"
import { Input, Button } from "@mui/base"
import { ShoppingCart, Search, Menu, Facebook, Twitter, Instagram, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Footer } from '@/components/footer/Footer'
import { AppBar } from '@/components/appbar/AppBar'
import axios from 'axios'
import { Product } from '@/components/types/productType'


const featured=["593d8f7f-3c7a-41bf-8bd0-e03c3979437e","438bc178-5948-4b8b-9ec7-bc87c957432e","7b8a3cb2-7866-4cf6-b0e6-e1ee5b2c606b","d494e681-25a9-497a-89be-9fc313c43077"];
const newArrival=["33d13874-a51f-4c75-a577-20cbba273d04","66b369c1-b7ed-42c9-8394-878c6cffc076","787562ca-16ea-47ed-8fab-1979031cd838","b10c22b1-a8b9-43e6-adf0-21a46a09fc44","c005fc81-deab-49a9-aee7-810d7c5e2aaf","8787f1ec-b540-4429-a098-14c69cfa93cf"];

export default function Component() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [featuredProducts,setFeaturedProducts] = useState<Product[] | null>([]);
  const [newProducts,setNewProducts] = useState<Product[] | null>([]);
  const slides = [
    {
      image: "/placeholder.svg?height=600&width=1200",
      title: "Welcome to Merch Plus",
      description: "Discover the best collection of anime merchandise. From figurines to apparel, we've got it all!",
    },
    {
      image: "/placeholder.svg?height=600&width=1200",
      title: "New Arrivals",
      description: "Check out our latest anime collectibles and merchandise!",
    },
    {
      image: "/placeholder.svg?height=600&width=1200",
      title: "Limited Time Offer",
      description: "Get 20% off on all manga series this week only!",
    },
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [])


  useEffect(()=>{
      const fetchFeatured = async() =>{
        try {
          let prods:Product[] =[]
          featured.map(async(id,i)=>{
            const response = await axios.get(`http://localhost:3000/api/products/${id}`);
            prods.push(response.data.prod);
          })
          console.log(prods)
          setFeaturedProducts(prods)
          
        } catch (error) {
          console.log("Cannot fetch featured products");
        }
      }
      fetchFeatured()
  },[featured])

  useEffect(()=>{
    const fetchNewProducts = async() =>{
      try {
        let prods:Product[] =[]
        newArrival.map(async(id,i)=>{
          const response = await axios.get(`http://localhost:3000/api/products/${id}`);
          prods.push(response.data.prod)
        })
        setNewProducts(prods)
        console.log(prods)
      } catch (error) {
        console.log("Cannot fetch newArrival products");
      }
    }
    fetchNewProducts()
},[newArrival])

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <AppBar/>
      <main className="flex-1 w-2/3 justify-center">
        <section className="w-full bg-black rounded-md relative">
          <div className="relative h-[600px] rounded-md overflow-hidden">
            {/* Background Video */}
            <video
              className="absolute top-0 left-0 w-full h-full  object-cover"
              autoPlay
              loop
              muted
            >
              <source src="videos/Landing.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
              >
                {/* Slide Content */}
                {/* <Image
                  alt={slide.title}
                  className="object-cover w-full h-full"
                  height="600"
                  src={slide.image}
                  width="1200"
                /> */}
                <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                  <div className="text-center text-white space-y-4 max-w-4xl px-4">
                    <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                      {slide.title}
                    </h1>
                    <p className="mx-auto max-w-[600px] text-gray-300 md:text-xl">
                      {slide.description}
                    </p>
                    <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
                      <Link
                        className="inline-flex h-10 items-center justify-center rounded-md bg-white px-8 text-sm font-medium text-gray-900 shadow transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
                        href="#"
                      >
                        Shop Now
                      </Link>
                      <Link
                        className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white bg-opacity-20 px-8 text-sm font-medium text-white shadow-sm transition-colors hover:bg-opacity-30 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
                        href="#"
                      >
                        Learn More
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 shadow-lg hover:bg-opacity-75 transition-all"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6 text-gray-800" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 shadow-lg hover:bg-opacity-75 transition-all"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6 text-gray-800" />
          </button>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full ${index === currentSlide ? 'bg-white' : 'bg-gray-400'
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </section>
        <section className="w-full   py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8">Featured Products</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {featuredProducts && featuredProducts.map((prod:Product,i) => {
                const url = prod.styles[0].images[0].url + process.env.NEXT_PUBLIC_AZURE_BLOB_TOKEN;
                return <div key={i} className="relative group overflow-hidden rounded-lg shadow-lg">
                  <Link key={prod.id} href={`/product/${prod.id}`}>
                  <Image
                    alt={`Product ${i}`}
                    className="object-cover w-full h-60"
                    height="300"
                    src={url}
                    width="300"
                    />
                  <div className="absolute inset-0 flex items-end justify-center p-4 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <h3 className="text-lg font-semibold text-white">{prod.name}</h3>
                  </div>
                    </Link>
                </div>
})}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8">New Arrivals</h2>
            <div className="relative">
              <div className="flex overflow-x-scroll space-x-4 p-4 scrollbar-hidden">
                {newProducts && newProducts.map((prod:Product,i) => {
                const url = prod.styles[0].images[0].url + process.env.NEXT_PUBLIC_AZURE_BLOB_TOKEN;

                  return <div key={i} className="flex-none w-64">
                    <Link key={prod.id} href={`/product/${prod.id}`}>
                    <div className="relative group overflow-hidden rounded-lg shadow-lg">
                      <Image
                        alt={`New Arrival ${i}`}
                        className="object-cover w-full h-64"
                        height="300"
                        src={url}
                        width="300"
                      />
                      <div className="absolute inset-0 flex items-end justify-center p-4 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <h3 className="text-lg font-semibold text-white">{prod.name}</h3>
                      </div>
                    </div>
                    </Link>
                  </div>
})}
              </div>
              <button className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg">
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg">
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8">Shop by Category</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {["Figurines", "Apparel", "Accessories", "Manga"].map((category, i) => (
                <div key={i} className="relative group overflow-hidden rounded-lg shadow-lg">
                  <Image
                    alt={category}
                    className="object-cover w-full h-48"
                    height="200"
                    src={`/images/placeholder${i}.jpg`?? `public/images/placeholder${i}.webp`}
                    width="300"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <h3 className="text-xl font-semibold text-white">{category}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <div className='w-full'>
        <Footer />
      </div>
    </div>
  )
}


