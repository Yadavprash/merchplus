"use client"
import { useState } from "react";
import RatingStars from "@/components/RatingStar";
import { useSession } from "next-auth/react";
import axios from "axios";
import { Review } from "@/components/types/productType";


export const AddReviewPopup = ({ productId, isOpen, onClose, popupRef,setReviews }: {productId:string, isOpen: boolean, onClose: () => void, popupRef: React.MutableRefObject<HTMLDivElement | null> ,setReviews: React.Dispatch<React.SetStateAction<Review[]>> }) => {
    const [rating, setRating] = useState<number>(0);
    const [title, setTitle] = useState<string>("");
    const [review, setReview] = useState<string>("");
    const { data: session, status } = useSession();  

    const handleSubmit = async() => {
        console.log("hi")
        try {
            const response = await axios.post("/api/reviews",{
                productId,
                title,
                review,
                rating,
                username : session?.user.name,
                userImage : session?.user.image
            })
            setReviews((reviews) => [...reviews,response.data]);
        } catch (error) {
            console.log(error)
        }
        onClose();
    };

    if (!isOpen) return null;



    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div ref={popupRef} className="bg-white w-96 p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Add a Review</h2>
                    <div className="mb-4">
                        <label htmlFor="rating" className="block text-sm font-medium mb-1">
                            Rating
                        </label>
                        <div className="flex ">
                            <RatingStars rating={rating} canHover={true} setRating={setRating} />
                            {["Bad", "Average", "Good", "Excellent", "Excellent+"].map((item, index) => {
                                if (rating == index + 1)
                                    return <div key={index} className="text-sm ml-1">{item}</div>
                            })}

                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-medium mb-1">
                            Title
                        </label>
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Give your review a title"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="review" className="block text-sm font-medium mb-1">
                            Review
                        </label>
                        <textarea
                            id="review"
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Write your review"
                            rows={4}
                        />
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="bg-gray-400 text-white px-4 py-2 rounded mr-2"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-black text-white px-4 py-2 rounded hover:bg-green-600 transition ease-in-out duration-300"
                            onClick={handleSubmit}
                        >
                            Submit Review
                        </button>
                    </div>
            </div>
        </div>
    );
};

