"use client";
import RatingStars from "../RatingStar";
import { ReviewCard } from "@/components/reviews/ReviewCard";
import { SearchBar } from "@/components/SearchBar";
import { Review } from "@/components/types/productType";
import { AddReviewPopup } from "./AddReview";
import { useState, useRef, useEffect } from "react";
import { SearchReviews } from "../SearchReviews";

export const Reviews = ({
  productId,
  data,
  setOverallRating,
}: {
  productId: string;
  data: Review[];
  setOverallRating: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const popupRef = useRef<HTMLDivElement | null>(null);
  const handleOpenPopup = () => setIsPopupOpen(true);
  const handleClosePopup = () => setIsPopupOpen(false);

  // Filter states
  const [originalReviews] = useState(data);
  const [reviews, setReviews] = useState(data);
  const [selectedRating, setSelectedRatings] = useState<number[]>([]);
  const [searchString, setSearchString] = useState("");
  const [sortOption, setSortOption] = useState("");

  const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rating = parseInt(event.target.value);

    if (event.target.checked) {
      setSelectedRatings((prev) => [...prev, rating]);
    } else {
      setSelectedRatings((prev) => prev.filter((r) => r !== rating));
    }
  };

  useEffect(() => {
    const filteredReviews = originalReviews.filter((review) => {
      const withinSelectedRatings = selectedRating.length
        ? selectedRating.includes(review.rating)
        : true;
      const containsQueryString = searchString.length
        ? review.title.toLowerCase().includes(searchString) ||
          review.review.toLowerCase().includes(searchString)
        : true;

      return withinSelectedRatings && containsQueryString;
    });
    setReviews(filteredReviews);
  }, [selectedRating, searchString]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (popupRef.current && !popupRef.current.contains(target)) {
        handleClosePopup();
      }
    };
    if (isPopupOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isPopupOpen]);

  const overallRating = () => {
    const rating = data.reduce((acc, curr) => acc + curr.rating, 0) / data.length;
    setOverallRating(rating);
    return rating;
  };

  function sortByMostRecent() {
    const sortedReviews = [...reviews].sort((a, b) => {
      const dateA = new Date(a.updatedAt).getTime();
      const dateB = new Date(b.updatedAt).getTime();
      return dateB - dateA;
    });
    setReviews(sortedReviews);
  }

  function sortByMostHelpful() {
    const sortedReviews = [...reviews].sort((a, b) => b.likes - a.likes);
    setReviews(sortedReviews);
  }

  function sortByRatingAsc() {
    const sortedReviews = [...reviews].sort((a, b) => a.rating - b.rating);
    setReviews(sortedReviews);
  }

  function sortByRatingDesc() {
    const sortedReviews = [...reviews].sort((a, b) => b.rating - a.rating);
    setReviews(sortedReviews);
  }

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    setSortOption(value);

    switch (value) {
      case "most-recent":
        sortByMostRecent();
        break;
      case "most-helpful":
        sortByMostHelpful();
        break;
      case "rating-asc":
        sortByRatingAsc();
        break;
      case "rating-desc":
        sortByRatingDesc();
        break;
      default:
        break;
    }
  }

  return (
    <div className="flex justify-center mt-5">
      <div className="w-full lg:w-2/3 grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-8 border-t">
        <div className="col-span-1 font-serif">
          <div className="text-2xl lg:text-3xl my-4 font-sans font-bold">Reviews</div>
          <div className="space-y-4">
            <div className="font-sans mb-1 font-semibold">Filter Reviews</div>
            <SearchReviews setQuery={setSearchString} />
            <div className="p-4 my-2 bg-white rounded-md">
              <div className="mb-1 pb-2 border-b">
                <h2 className="font-semibold">Rating</h2>
                <div className="mt-1 space-y-1">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating}>
                      <input
                        type="checkbox"
                        id={`${rating}stars`}
                        value={rating}
                        className="mr-2"
                        onChange={handleRatingChange}
                      />
                      <label htmlFor={`${rating}stars`}>{rating} stars</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-3 pl-5 min-h-[400px]">
          <div className="flex flex-col lg:flex-row justify-between my-5">
            <div>
              <div className="flex items-center">
                <div className="font-serif text-3xl">{overallRating().toFixed(1)}</div>
                <div className="flex flex-col justify-evenly ml-2">
                  <RatingStars rating={overallRating()} setRating={null} canHover={false} />
                </div>
              </div>
              <div className="text-gray-600 text-xs">Based on {data.length} ratings</div>
            </div>
            <div className="mt-4 lg:mt-0">
              <button
                className="bg-black text-sm text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 transition ease-in-out duration-300"
                onClick={handleOpenPopup}
              >
                Add Review
              </button>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row justify-between">
            <div className="text-sm font-semibold">Showing {reviews.length} of {reviews.length} results</div>
            <div className="mt-4 lg:mt-0 flex justify-center items-center">
              <label htmlFor="sort" className="text-xs text-gray-700">Sort by:</label>
              <select
                id="sort"
                value={sortOption}
                onChange={handleChange}
                className="bg-primary w-28 text-xs text-gray-700 pl-2 focus:outline-none"
              >
                <option value="most-recent">Most Recent</option>
                <option value="most-helpful">Most Helpful</option>
                <option value="rating-desc">Highest to Lowest Rating</option>
                <option value="rating-asc">Lowest to Highest Rating</option>
              </select>
            </div>
          </div>
          <div className="mt-4">
            {reviews.map((review, idx) => (
              <ReviewCard key={idx} review={review} />
            ))}
          </div>
        </div>
      </div>
      <AddReviewPopup productId={productId} isOpen={isPopupOpen} onClose={handleClosePopup} popupRef={popupRef} />
    </div>
  );
};
