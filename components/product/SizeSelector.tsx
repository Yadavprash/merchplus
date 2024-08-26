interface SizeSelectorProps {
    sizes: { id: number; name: string }[] | null;
    selectedSize: number;
    setSelectedSize: (id: number) => void;
  }
  
  export default function SizeSelector({ sizes, selectedSize, setSelectedSize }: SizeSelectorProps) {
    return (
      <div className="p-2">
        <strong className="font-semibold text-sm">Size:</strong>
        <ul className="list-disc pl-5 mt-1">
          {sizes && sizes.map((s) => (
            <button
              key={s.id}
              className={`p-3 w-12 border rounded-full mx-1 text-xs font-bold  transition-colors ${
                selectedSize === s.id ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-gray-700 border-gray-300'
              } hover:bg-blue-50`}
              onClick={() => setSelectedSize(s.id)}
            >
              {s.name}
            </button>
          ))}
        </ul>
      </div>
    );
  }
  