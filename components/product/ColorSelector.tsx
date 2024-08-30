import { Style } from "../types/productType";

interface ColorSelectorProps {
    colors: Style[];
    selectedColor: number;
    setSelectedColor: (id: number) => void;
  }
  
  export default function ColorSelector({ colors, selectedColor, setSelectedColor }: ColorSelectorProps) {
    return (
      <div className="p-2"> 
      Styles here
           </div>
    );
  }
  