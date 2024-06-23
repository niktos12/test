import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 5,
}) => {
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = maxVisiblePages;
    const cappedTotalPages = Math.min(totalPages );
    let startPage = Math.max(currentPage - Math.floor(maxPagesToShow / 2), 1);
    let endPage = Math.min(startPage + maxPagesToShow - 1, cappedTotalPages);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(endPage - maxPagesToShow + 1, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (startPage > 1) {
      pageNumbers.unshift("...");
      pageNumbers.unshift(1);
    }

    if (endPage < cappedTotalPages) {
      pageNumbers.push("...");
      pageNumbers.push(cappedTotalPages);
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex justify-center list-none p-0">
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="text-slate-900 border-none my-0 mx-[2px] py-1 px-2 cursor-pointer"
      >
        «
      </button>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="text-slate-900 border-none my-0 mx-[2px] py-1 px-2 cursor-pointer"
      >
        ‹
      </button>
      {pageNumbers.map((page, index) => (
        <button
          key={typeof page === "number" ? page : `ellipsis-${index}`}
          onClick={() => typeof page === "number" && onPageChange(page)}
          className={`${
            page === currentPage ? "bg-slate-200" : ""
          } text-slate-900 border-none my-0 mx-[2px] py-1 px-2 cursor-pointer`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="text-slate-900 border-none my-0 mx-[2px] py-1 px-2 cursor-pointer"
      >
        ›
      </button>
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="text-slate-900 border-none my-0 mx-[2px] py-1 px-2 cursor-pointer"
      >
        »
      </button>
    </div>
  );
};

export default Pagination;
