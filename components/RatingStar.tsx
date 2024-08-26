// components/RatingStars.js
import React from 'react';

const RatingStars = ({ rating }:{rating:number}) => {
  // Generate an array of stars based on the rating
  const stars = Array.from({ length: 5 }, (_, index) => {
    const starRating = index + 1;
    return (
      <svg
        key={starRating}
        className={`w-5 h-5 ${starRating <= rating ? 'text' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
        />
      </svg>
    );
  });

  return <div className="flex">{stars}</div>;
};

export default RatingStars;
