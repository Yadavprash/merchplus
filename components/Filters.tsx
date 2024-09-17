import React, { useState, useEffect } from 'react';
import { Product, Category } from "@/components/types/productType";

interface FiltersProps {
  products: Product[];
  setFilteredProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  categories: Category[];
}

type PriceRangePreset = {
  label: string;
  range: [number, number];
};

const priceRangePresets:PriceRangePreset[] = [
  { label: 'Rs. 0 - 1999', range: [0, 1999] },
  { label: 'Rs. 2000 - 4999', range: [2000, 4999] },
  { label: 'Rs. 5000 - 19999', range: [5000, 19999] },
  { label: 'Rs. 20000 and above', range: [20000, 999999] },
  { label: 'Reset Price', range: [0, 999999] }
];

const Filters: React.FC<FiltersProps> = ({ products, setFilteredProducts, categories }) => {
  // Filter states
  const [originalProducts] = useState(products);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([1000, 999999]);

  // Handle category change
  const handleCategoryChange = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter(cat => cat !== categoryId));
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  // Handle price range change for preset ranges
const handlePresetPriceRange = (min: number, max: number) => {
  setPriceRange([min, max]);
};
  const handleReset = () => {
    setSelectedCategories([]);
    setPriceRange([0, 99999]);
    setFilteredProducts(originalProducts); // Restore original products
  };

  // Filtering logic
  useEffect(() => {
    const filtered = originalProducts.filter(product => {
      // Check if product belongs to any selected category
      const isInSelectedCategories = selectedCategories.length
        ? product.categories.some(category => selectedCategories.includes(category.id))
        : true;

      // Check if product is within the selected price range
      const isWithinPriceRange = product.styles[0].price >= priceRange[0] && product.styles[0].price <= priceRange[1];

      // Return product if it matches both category and price range filters
      return isInSelectedCategories && isWithinPriceRange;
    });

    setFilteredProducts(filtered);
  }, [selectedCategories, priceRange, setFilteredProducts, originalProducts]);
  
  return (
    <div className="flex flex-col gap-4 p-4">
  {/* Filter by Category */}
  <div>
    <label className="block text-sm font-medium">Include Categories</label>
    <div className="flex flex-wrap gap-2 max-h-[400px] overflow-y-auto scroll-smooth mt-2">
      {categories.map(category => (
        <div
          key={category.id}
          onClick={() => handleCategoryChange(category.id)}
          className={`inline-flex items-center gap-2 cursor-pointer border-2 p-2 rounded transition-colors duration-300 ${
            selectedCategories.includes(category.id)
              ? 'bg-black text-white border-black'
              : 'bg-white text-black border-gray-200 hover:bg-gray-100'
          }`}
        >
          <span className="text-sm">{category.name}</span>
        </div>
      ))}
    </div>
  </div>

  {/* Filter by Price Range */}
  <div>
    <label className="block text-sm font-medium text-gray-800">Price Range</label>
    <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
      {priceRangePresets.map((preset, index) => (
        <button
          key={index}
          onClick={() => handlePresetPriceRange(...preset.range)}
          className={`px-4 py-2 border rounded-md transition-colors duration-300 ${
            priceRange[0] === preset.range[0] && priceRange[1] === preset.range[1]
              ? 'bg-black text-white border-black'
              : 'bg-white text-black border-gray-300 hover:bg-gray-100'
          }`}
        >
          {preset.label}
        </button>
      ))}
    </div>
  </div>
</div>

  );
};

export default Filters;
