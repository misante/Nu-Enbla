import React from "react";

const LoadingSkeleton = () => {
  return (
    <>
      <div className="flex h-[200px] rounded-md bg-gray-500  animate-pulse justify-center items-center ">
        Loading...
      </div>
      <div className="flex h-[20px] mt-2 rounded-md bg-gray-500  animate-pulse justify-center items-center "></div>
    </>
  );
};

export default LoadingSkeleton;
