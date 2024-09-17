import axios from "axios";
import RatingStars from "../RatingStar";
import { Review } from "../types/productType";
import { useState } from "react";
import Image from "next/image";

export const ReviewCard = ({ review }: { review: Review }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(review.likes);

  const handleLikes = async () => {
    if (!liked) {
      try {
        await axios.post("/api/reviews/likes", {
          id: review.id,
          likes: review.likes + 1,
        });
        setLikes(likes + 1);
        setLiked(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="bg-white mt-2 w-full max-w-md mx-auto rounded-md shadow-lg overflow-hidden md:max-w-lg">
      <div className="px-6 py-4">
        {/* User Info */}
        <div className="flex items-center mb-1">
          <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            {!review.userImage && (
              <span className="font-medium text-sm text-gray-600 dark:text-gray-300">
                {review.username.charAt(0)}
              </span>
            )}
            {review.userImage && (
              <Image
                width={32}
                height={32}
                src={review.userImage}
                alt={"User profile"}
                className="object-cover rounded-full"
              />
            )}
          </div>
          <div className="text-gray-600 font-medium ml-2 text-xs">
            {new Date(review.updatedAt).toLocaleDateString()}
          </div>
        </div>

        {/* Rating */}
        <RatingStars rating={review.rating} canHover={false} setRating={null} />

        {/* Title */}
        <h2 className="text-base md:text-lg font-semibold mt-2">{review.title}</h2>

        {/* Review Content */}
        <p className="text-gray-700 text-sm md:text-base mt-1">{review.review}</p>

        {/* Like and Helpful Section */}
        <div className="flex items-center mt-3 space-x-2">
          <div onClick={handleLikes} className="cursor-pointer fill-none mb-1">
            <svg
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              fill={`${liked ? "lightgrey" : "none"}`}
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M6 10C8.28283 8.32595 11.3995 5.54014 13.8271 1.64258C14.1784 1.07865 14.9676 0.967672 15.4374 1.43746L16.0265 2.02648C16.313 2.31302 16.3983 2.74415 16.2424 3.1182L14 8.50003H21.1257C22.3661 8.50003 23.3073 9.61747 23.0966 10.8398L21.2862 21.3398C21.1208 22.2991 20.2888 23 19.3153 23H10L6 20.5"
                  stroke="#767676"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M6 8H1V22H6V8Z"
                  stroke="#767676"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </g>
            </svg>
          </div>
          <div className="text-gray-600 text-sm">{likes}</div>
          <div className="text-xs text-gray-600">People found this helpful.</div>
        </div>
      </div>
    </div>
  );
};
