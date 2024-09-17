import Image from "next/image";

export default function Features() {
  const features = [
    { src: "/images/returns.jpeg", alt: "10 Day returns", label: "10 Day returns" },
    { src: "/images/deliveryTruck.jpeg", alt: "Free Delivery", label: "Free Delivery" },
    { src: "/images/payOnDelivery.jpeg", alt: "Pay on delivery", label: "Pay on delivery" },
    { src: "/images/topBrand.jpeg", alt: "Top Brand", label: "Top Brand" },
    { src: "/images/securedPayment.jpeg", alt: "Secured Payments", label: "Secured Payments" },
  ];

  return (
    <div className="flex  justify-between my-4 space-y-4 lg:space-y-0">
      {features.map((feature) => (
        <div
          key={feature.alt}
          className="flex flex-col mx-2 items-center justify-center w-1/2 sm:w-1/4 md:w-1/5 lg:w-auto"
        >
          <Image
            width={80}
            height={80}
            src={feature.src}
            alt={feature.alt}
            className="p-1 rounded-full border border-2 border-dashed"
          />
          <label className="text-xs font-serif text-gray-400 text-center mt-2">{feature.label}</label>
        </div>
      ))}
    </div>
  );
}
