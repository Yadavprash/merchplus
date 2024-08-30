interface SizeSelectorProps {
  sizes: string[];
  selectedSize: number;
  setSelectedSize: React.Dispatch<React.SetStateAction<number>>;
}

export default function SizeSelector({ sizes, selectedSize, setSelectedSize }: SizeSelectorProps) {
  return (
    <div className="p-2 z-10">
      <label htmlFor="size-selector" className="mr-2 font-semibold  font-serif">
        Size:
      </label>
      <select
        id="size-selector"
        value={selectedSize}
        onChange={(e) => setSelectedSize(Number(e.target.value))}
        className="bg-white border border-black z-30 rounded-sm font-serif focus:outline-none focus:ring-1 focus:ring-black"
      >
        {sizes.map((size, index) => (
          <option key={index} value={index}>
            {size}
          </option>
        ))}
      </select>
    </div>
  );
}
