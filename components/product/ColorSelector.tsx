interface ColorSelectorProps {
    colors: { id: number; name: string }[] | null;
    selectedColor: number;
    setSelectedColor: (id: number) => void;
  }
  
  export default function ColorSelector({ colors, selectedColor, setSelectedColor }: ColorSelectorProps) {
    return (
      <div className="p-2">
        {colors && 
        <strong className="font-semibold text-sm">Color: {colors[selectedColor - 1].name}</strong>
        }
        <ul className="list-disc pl-5 mt-1">
          {colors && colors.map((c) => (
            <button
              key={c.id}
              className={`p-4 border border-2 rounded-full mx-1 text-xs font-medium transition-colors ${
                selectedColor === c.id ? 'bg-gray-800 text-white border-black' : 'bg-white text-gray-700 border-black-600'
              } hover:bg-gray-50`}
              onClick={() => setSelectedColor(c.id)}
              style={{ backgroundColor: c.name.toLowerCase() }}
            />
          ))}
        </ul>
      </div>
    );
  }
  