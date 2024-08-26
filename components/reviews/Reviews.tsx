import RatingStars from "../RatingStar"
import { SearchBar } from "../SearchBar"
import { Review } from "../types/productType"
export const Reviews = ({ data }: { data: Review[] }) => {


    return <div className="flex justify-center mt-5 ">
        <div className="w-2/3  grid grid-cols-4  border-t">
            <div className="col-span-1 font-serif">
                <div className="text-3xl my-4 font-sans font-bold">
                    Reviews
                </div>
                <div className="">
                    <div className="font-sans mb-1 font-semibold">
                        Filter Reviews
                    </div>
                    <div>
                        <SearchBar />
                    </div>
                </div>
                <div>
                    <div className="p-4 my-2 bg-white ">
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
                                        />
                                        <label htmlFor={`${rating}stars`}>
                                            {rating} stars
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h2 className="font-semibold pt-1">Photos</h2>
                            <div className="mt-1">
                                <div>
                                    <input
                                        type="checkbox"
                                        id="withImages"
                                        className="mr-2"
                                    />
                                    <label htmlFor="withImages">Only show posts with images</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-span-3 pl-5">
                <div className="flex justify-center m-5">
                    <div>
                        <div className="flex">
                            <div className="font-serif text-3xl">4.3</div>
                            <div className="flex flex-col justify-evenly">
                                <div></div>
                                <RatingStars rating={4.3} />
                            </div>
                        </div>

                        <div className="text-gray-600 text-xs ">
                            Based on 5783 ratings
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex justify-between">
                        <div className="text-sm font-semibold">
                            Showing 1 of 1 results
                        </div>
                        <div>
                            <div className="flex justify-center items-center ">
                                <label htmlFor="sort" className="text-xs text-gray-700">Sort by:</label>
                                <select
                                    id="sort"
                                    // value={selectedOption}
                                    // onChange={handleChange}
                                    className="bg-primary w-28 text-xs text-gray-700  pl-2  focus:outline-none"
                                >
                                    <option>Most Recent</option>
                                    <option>Most Helpful</option>
                                    <option>Highest to Lowest Rating</option>
                                    <option>Lowest to Highest Rating</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="bg-white mt-2">
                        <div className="px-6 py-4">
                            <div className="flex items-center mb-1">
                                <div className="relative inline-flex items-center justify-center w-5 h-5 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                                    <span className="font-medium text-xs text-gray-600 dark:text-gray-300">J</span>
                                </div>

                                <div className="text-gray-600 mx-2 text-xs">6 days ago</div>
                            </div>
                            <RatingStars rating={3} />
                            <h2 className="text-lg font-semibold mt-1 ">Oversized</h2>
                            <p className="text-gray-700 text-sm mt-1">I love the oversized look it’s comfy for lounging. The color is stellar. For a the price I wouldn’t buy again in another color. The hardware is plastic and while it keeps it lightweight makes it feel cheap and I worry about the longevity of the piece which is usually what attracts me to this store.</p>

                            <div className="flex items-center mt-2">
                                <div>
                                    <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 10C8.28283 8.32595 11.3995 5.54014 13.8271 1.64258C14.1784 1.07865 14.9676 0.967672 15.4374 1.43746L16.0265 2.02648C16.313 2.31302 16.3983 2.74415 16.2424 3.1182L14 8.50003H21.1257C22.3661 8.50003 23.3073 9.61747 23.0966 10.8398L21.2862 21.3398C21.1208 22.2991 20.2888 23 19.3153 23H10L6 20.5" stroke="#767676" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6 8H1V22H6V8Z" stroke="#767676" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                </div>
                                <div className="text-gray-600 ml-2 ">
                                    5
                                </div>
                                <div className="flex items-center text-sm ml-1 text-gray-600">
                                    People found this helpful
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}