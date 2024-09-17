// components/skeletons.tsx
export const SkeletonCartItem = () => (
    <div className="animate-pulse flex flex-col space-y-1 mb-2 pb-2 md:flex-row border-b">
    <div className="my-2 md:w-1/3 w-full flex justify-center">
      <div className="bg-gray-300 w-48 h-48" />
    </div>
    <div className="w-full p-2 flex flex-col justify-between">
      <div className="flex flex-col md:flex-row justify-between">
        <div className="flex flex-col space-y-1 mb-2 md:mb-0 lg:w-[400px]">
          <div className="bg-gray-300 h-6 w-32" />
          <div className="bg-gray-300 h-4 w-24 mt-2" />
          <div className="bg-gray-300 h-4 w-20 mt-2" />
        </div>
        <div className="flex flex-col md:flex-row justify-between ">
          <div className="flex flex-col items-end mx-2">
            <div className="bg-gray-300 h-4 w-12" />
            <div className="bg-gray-300 h-6 w-16 mt-2" />
          </div>
          <div className="flex flex-col items-end mx-2">
            <div className="bg-gray-300 h-4 w-12" />
            <div className="bg-gray-300 h-6 w-8 mt-2" />
          </div>
          <div className="flex flex-col items-end mx-2">
            <div className="bg-gray-300 h-4 w-16" />
            <div className="bg-gray-300 h-6 w-20 mt-2" />
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="bg-gray-300 h-4 w-32" />
        <div className="bg-gray-400 h-8 w-24 rounded"></div>
      </div>
    </div>
  </div>
  );
  
  export const SkeletonSummary = () => (
    <div className="animate-pulse space-y-4">
      <div className="h-6 bg-gray-200 rounded w-1/2"></div>
      <div className="h-4 bg-gray-200 rounded"></div>
      <div className="h-4 bg-gray-200 rounded"></div>
      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
      <div className="h-10 bg-gray-200 rounded w-full"></div>
    </div>
  );
  