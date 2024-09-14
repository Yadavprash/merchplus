interface SizeSelectorProps {
  sizes: string[];
  selectedSize: number;
  setSelectedSize: React.Dispatch<React.SetStateAction<number>>;
}

export default function SizeSelector({ sizes, selectedSize, setSelectedSize }: SizeSelectorProps) {
  return (
    <div className="p-2 z-10">
      <label htmlFor="size-selector" className="mr-2 text-sm  font-semibold font-montserrat">
        Size:
      </label>
      <select
        id="size-selector"
        value={selectedSize}
        onChange={(e) => setSelectedSize(Number(e.target.value))}
        className="bg-white border z-30 rounded-sm font-mono focus:outline-none "
      >
        {sizes.map((size, index) => (
          <option key={index} value={index} className="border-hidden focus:ouline-none">
            {size}
          </option>
        ))}
      </select>
    </div>
  );
}
