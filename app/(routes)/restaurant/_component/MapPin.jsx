import React from "react";

const MapPin = () => {
  return (
    <div class="w-4 h-4 bg-white rounded-full shadow-lg flex items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4 text-gray-600"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M10 0a7 7 0 0 1 7 7c0 5.25-7 13-7 13S3 12.25 3 7a7 7 0 0 1 7-7zm0 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
        />
      </svg>
    </div>
  );
};

export default MapPin;
