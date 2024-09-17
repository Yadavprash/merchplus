"use client";
import Image from "next/image";
import { useCallback, useState } from "react";

interface ProductImage {
  id?: string;
  url: string;
  productId?: string;
}

export const Gallery = ({ data }: { data: ProductImage[] }) => {
  const [currImage, setCurrImage] = useState<number>(0);
  const [magnifiedImage, setMagnifiedImage] = useState<string>();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showMagnifier, setShowMagnifier] = useState(false);

  const handleImageChange = useCallback((idx: number) => {
    setCurrImage(idx);
  }, []);

  const handleImageMagnify = useCallback((e: React.MouseEvent<HTMLImageElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setPosition({ x, y });
  }, []);

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Thumbnails */}
      <div className="flex lg:flex-col overflow-auto max-h-[200px] lg:max-h-[400px] relative lg:w-20 w-full mb-2 lg:mb-0">
        <div className="overflow-auto scrollbar-hidden max-h-full flex lg:block">
          {data.map((d, idx) => (
            <Image
              key={idx}
              src={d.url + process.env.NEXT_PUBLIC_AZURE_BLOB_TOKEN}
              alt={`Product Image ${idx + 1}`}
              width={40}
              height={40}
              unoptimized={true}
              onMouseEnter={() => handleImageChange(idx)}
              className={`relative border rounded m-2 ${
                currImage === idx ? "border-4 border-green-500" : "border-1 border-black"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Enlarged image */}
      <div className="m-2 relative w-full lg:w-auto">
        {data.length > 0 && (
          <Image
            src={data[currImage].url + process.env.NEXT_PUBLIC_AZURE_BLOB_TOKEN}
            alt={`Enlarged Product Image ${currImage + 1}`}
            width={489}
            height={489}
            unoptimized={true}
            className="w-full h-auto max-w-[489px] max-h-[489px] object-contain"
            onMouseEnter={() => {
              setShowMagnifier(true);
              setMagnifiedImage(data[currImage].url + process.env.NEXT_PUBLIC_AZURE_BLOB_TOKEN);
            }}
            onMouseOut={() => setShowMagnifier(false)}
            onMouseMove={(e) => handleImageMagnify(e)}
          />
        )}

        {/* Magnifier */}
        {showMagnifier && (
          <div
            className="absolute z-50 hidden lg:block"
            style={{
              width: "326px",
              height: "326px",
              backgroundImage: `url(${magnifiedImage})`,
              backgroundSize: "800px 800px",
              backgroundPosition: `${position.x}% ${position.y}%`,
              border: "1px solid lightgreen",
              pointerEvents: "none",
              transform: "scale(1.5)",
              transformOrigin: "0 0",
              top: 0,
              left: 0,
            }}
          />
        )}
      </div>
    </div>
  );
};
