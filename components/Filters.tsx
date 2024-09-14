import React, { useState, useEffect } from 'react';
import { Product, Category } from "@/components/types/productType";

interface FiltersProps {
  products: Product[];
  setFilteredProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  categories: Category[];
}

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
    <div className="flex flex-col  gap-4 p-4 ">
      {/* Filter by Category */}

      <label className="block text-sm font-medium">Include Categories</label>
      <div className="flex flex-wrap gap-2 max-h-[400px] overflow-auto scroll-smooth">
          {categories.map(category => (
            <div
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`inline-flex items-center gap-2 cursor-pointer border-2  p-2 rounded ${
                selectedCategories.includes(category.id)
                  ? 'bg-black text-white border-none'
                  : 'bg-white text-black border-gray-100'
              }`}
            >
              <span className="text-sm">{category.name}</span>
            </div>
          ))}
        </div>

      {/* Filter by Price Range */}
      <div>
  <div>
  <label className="block text-sm font-medium text-gray-800">Price Range</label>
  <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
    <button
      onClick={() => handlePresetPriceRange(0, 1999)}
      className={`px-4 py-2 border rounded-md transition-colors duration-300 ${
        priceRange[0] === 0 && priceRange[1] === 1999
          ? 'bg-black text-white border-black'
          : 'bg-white text-black border-gray-300 hover:bg-gray-100'
      }`}
    >
      Rs. 0 - 1999
    </button>
    <button
      onClick={() => handlePresetPriceRange(2000, 4999)}
      className={`px-4 py-2 border rounded-md transition-colors duration-300 ${
        priceRange[0] === 2000 && priceRange[1] === 4999
          ? 'bg-black text-white border-black'
          : 'bg-white text-black border-gray-300 hover:bg-gray-100'
      }`}
    >
      Rs. 2000 - 4999
    </button>
    <button
      onClick={() => handlePresetPriceRange(5000, 19999)}
      className={`px-4 py-2 border rounded-md transition-colors duration-300 ${
        priceRange[0] === 5000 && priceRange[1] === 19999
          ? 'bg-black text-white border-black'
          : 'bg-white text-black border-gray-300 hover:bg-gray-100'
      }`}
    >
      Rs. 5000 - 19999
    </button>
    <button
      onClick={() => handlePresetPriceRange(20000, 999999)}
      className={`px-4 py-2 border rounded-md transition-colors duration-300 ${
        priceRange[0] === 20000 && priceRange[1] === 999999
          ? 'bg-black text-white border-black'
          : 'bg-white text-black border-gray-300 hover:bg-gray-100'
      }`}
    >
      Rs. 20000 and above
    </button>
    <button
      onClick={() => handlePresetPriceRange(0, 999999)}
      className={`px-4 py-2 border rounded-md transition-colors duration-300 ${
        priceRange[0] === 0 && priceRange[1] === 999999
          ? 'bg-black text-white border-black'
          : 'bg-white text-black border-gray-300 hover:bg-gray-100'
      }`}
    >
      Reset Price
    </button>
  </div>
</div>

</div>
      <button
        onClick={handleReset}
        className="mt-4 p-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default Filters;
