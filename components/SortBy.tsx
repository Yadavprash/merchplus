import React, { useState } from 'react';
import { Product } from "@/components/types/productType";
import { useDispatch } from 'react-redux';
import { setProducts } from '@/store/features/productSlice';

interface SortProductsProps {
  products: Product[];
  setProducts : typeof setProducts
}

const SortProducts: React.FC<SortProductsProps> = ({ products, setProducts }) => {
  const [sortOption, setSortOption] = useState<string>('');
  const dispatch = useDispatch();

  // Function to sort products by name ascending
  const sortByNameAsc = () => {
    const sortedProducts = [...products].sort((a, b) => a.name.localeCompare(b.name));
    dispatch(setProducts(sortedProducts));
  };

  // Function to sort products by name descending
  const sortByNameDesc = () => {
    const sortedProducts = [...products].sort((a, b) => b.name.localeCompare(a.name));
    dispatch(setProducts(sortedProducts));
  };

  // Function to sort products by price ascending
  const sortByPriceAsc = () => {
    const sortedProducts = [...products].sort((a, b) => a.styles[0].price - b.styles[0].price);
    dispatch(setProducts(sortedProducts));
  };

  // Function to sort products by price descending
  const sortByPriceDesc = () => {
    const sortedProducts = [...products].sort((a, b) => b.styles[0].price - a.styles[0].price);
    dispatch(setProducts(sortedProducts));
  };

  const sortByRatingDesc = () => {
    const sortedProducts = [...products].sort((a, b) => {
      const avgRatingA = a.reviews.reduce((acc, review) => acc + review.rating, 0) / a.reviews.length || 0;
      const avgRatingB = b.reviews.reduce((acc, review) => acc + review.rating, 0) / b.reviews.length || 0;
      return avgRatingB - avgRatingA;
    });
    dispatch(setProducts(sortedProducts));
  };
  

  // Handle selection change
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSortOption(value);

    // Perform the sorting based on the selected option
    switch (value) {
      case 'name-asc':
        sortByNameAsc();
        break;
      case 'name-desc':
        sortByNameDesc();
        break;
      case 'price-asc':
        sortByPriceAsc();
        break;
      case 'price-desc':
        sortByPriceDesc();
        break;
      case 'rating-desc':
        sortByRatingDesc();
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sort" className="text-sm font-medium">Sort By:</label>
      <select
        id="sort"
        value={sortOption}
        onChange={handleSortChange}
        className="border border-gray-300 bg-white  rounded px-2 py-1 text-sm focus:outline-none"
      >
        <option value="">Select</option>
        <option value="name-asc">Name (A - Z)</option>
        <option value="name-desc">Name (Z - A)</option>
        <option value="price-asc">Price (Low to High)</option>
        <option value="price-desc">Price (High to Low)</option>
        <option value="rating-desc">Rating (High to Low)</option>
      </select>
    </div>
  );
};

export default SortProducts;
