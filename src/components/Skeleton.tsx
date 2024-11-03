import React from "react";

interface SkeletonProps {
  rows?: number;
  showImage?: boolean;
}

const SkeletonLoader: React.FC<SkeletonProps> = ({
  rows = 2,
  showImage = true,
}) => {
  return (
    <div className="w-full max-w-96 mx-auto bg-white shadow-lg rounded-lg p-3 animate-pulse mt-10">
      {showImage && (
        <div className="w-full h-48 bg-gray-300 rounded-lg mb-4"></div>
      )}
      <div className="w-3/4 h-8 bg-gray-300 rounded mb-4"></div>
      {[...Array(rows)].map((_, i) => (
        <div key={i} className="w-full h-4 bg-gray-300 rounded mb-2"></div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
