import React from "react";

const Pagination = ({ page, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center mt-8 m">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="px-4 py-2 mx-2 bg-gray-800 text-white rounded disabled:opacity-50"
      >
         Prev
      </button>
      <span className="text-gray-300 mx-4">Page {page} of {totalPages}</span>
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="px-4 py-2 mx-2 bg-gray-800 text-white rounded disabled:opacity-50"
      >
        Next 
      </button>
    </div>
  );
};

export default Pagination;
