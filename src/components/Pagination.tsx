import React from "react";

type PaginationProps = {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const pageCount = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="flex justify-center mt-6">
      {[...Array(pageCount)].map((_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index + 1)}
          className={`px-4 py-2 mx-1 rounded ${
            currentPage === index + 1
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-black"
          }`}
          aria-label={`Page ${index + 1}`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
