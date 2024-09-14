import axios from "axios"
import RatingStars from "../RatingStar"
import { Review } from "../types/productType"
import { useState } from "react"
import Image from "next/image"


export const ReviewCard = ({review}:{review : Review}) =>{
    const [liked,setLiked] = useState(false);
    const [likes,setLikes] = useState(review.likes);
    const handleLikes = async() =>{
        if(!liked){
            try {
                const response = await axios.post("/api/reviews/likes",{
                    id : review.id,
                    likes : review.likes + 1   
                })
                setLikes(likes + 1);
                setLiked(true)
            } catch (error) {
                console.log(error)
            }
        }
    }
    return  <div className="bg-white mt-2">
    <div className="px-6 py-4">
        <div className="flex items-center mb-1">
            <div className="relative inline-flex items-center justify-center w-5 h-5 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                {!review.userImage && <span className="font-medium text-xs text-gray-600 dark:text-gray-300">{review.username.charAt(1)}</span>}
                {review.userImage && <Image 
                    width={20}
                    height={20}
                    src={review.userImage}
                    alt={"pp"}
                ></Image>}
            </div>

            <div className="text-gray-600 font-medium mx-2 text-xs">{new Date(review.updatedAt).toLocaleDateString()}</div>
        </div>
        <RatingStars rating={review.rating} canHover={false} setRating={null} />
        
        <h2 className="text-lg font-semibold mt-1 ">{review.title}</h2>
        <p className="text-gray-700 text-sm mt-1">{review.review}</p>

        <div className="flex items-center mt-2">
            <div onClick={handleLikes} className="fill-none mb-1">
                <svg width="22px" height="22px" viewBox="0 0 24 24" fill={`${liked && "lightgrey"}`} xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 10C8.28283 8.32595 11.3995 5.54014 13.8271 1.64258C14.1784 1.07865 14.9676 0.967672 15.4374 1.43746L16.0265 2.02648C16.313 2.31302 16.3983 2.74415 16.2424 3.1182L14 8.50003H21.1257C22.3661 8.50003 23.3073 9.61747 23.0966 10.8398L21.2862 21.3398C21.1208 22.2991 20.2888 23 19.3153 23H10L6 20.5" stroke="#767676" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M6 8H1V22H6V8Z" stroke="#767676" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
            </div>
            <div className="flex items-center text-gray-600 ml-1 mt-1 text-sm " >
                {review.likes}
            </div>
            <div className="flex items-center text-xs ml-1 mt-1 text-gray-600">
                People found this helpful.
            </div>
        </div>
    </div>
</div>
}