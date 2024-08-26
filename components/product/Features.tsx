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
    <div className="flex my-4 justify-between">
      {features.map((feature) => (
        <div key={feature.alt} className="flex flex-col mx-1 items-center justify-center">
          <Image width={80} height={80} src={feature.src} alt={feature.alt} className="p-1 rounded-full border border-2 border-dashed" />
          <label className="text-xs font-serif text-gray-400">{feature.label}</label>
        </div>
      ))}
    </div>
  );
}
