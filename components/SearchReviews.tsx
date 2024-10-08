"use client"
export const SearchReviews = ({setQuery}:{setQuery : React.Dispatch<React.SetStateAction<string>>}) => {
    
    return (
      <div className="border rounded bg-primary focus-within:border-black">
        <div className="relative flex items-center h-8  rounded py-5 overflow-hidden">
          <div className="grid place-items-center pl-2 w-8 text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="black"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
             </svg> 
            </div>
  
          <input
            className="peer h-full w-full outline-none text-xs text-gray-700 py-5 px-2 bg-primary "
            type="text"
            id="search"
            placeholder="search reviews..."
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>
    );
  };
  