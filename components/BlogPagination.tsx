"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { generatePageNumbers } from "@/lib/pagination";

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
  basePath?: string;
}

export function BlogPagination({
  currentPage,
  totalPages,
  basePath = "/blog",
}: BlogPaginationProps) {
  if (totalPages <= 1) return null;

  const pageNumbers = generatePageNumbers(currentPage, totalPages);

  const createPageUrl = (page: number) => {
    if (page === 1) {
      return basePath;
    }
    return `${basePath}?page=${page}`;
  };

  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className="mx-auto flex w-full justify-center mt-10"
    >
      <ul className="flex flex-row items-center gap-1">
        {currentPage > 1 && (
          <li>
            <Link
              href={createPageUrl(currentPage - 1)}
              aria-label="Go to previous page"
              className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 hover:text-gray-700 focus:z-10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Previous</span>
            </Link>
          </li>
        )}

        {pageNumbers.map((pageNumber, index) => (
          <li key={index}>
            {pageNumber === "ellipsis" ? (
              <span
                aria-hidden
                className="flex h-9 w-9 items-center justify-center text-gray-500"
              >
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">More pages</span>
              </span>
            ) : (
              <Link
                href={createPageUrl(pageNumber)}
                aria-current={pageNumber === currentPage ? "page" : undefined}
                className={`inline-flex items-center justify-center h-9 w-9 text-sm font-medium border ${
                  pageNumber === currentPage
                    ? "bg-blue-50 border-blue-500 text-blue-600 z-10"
                    : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                } focus:z-10 focus:ring-2 focus:ring-blue-500 focus:outline-none`}
              >
                {pageNumber}
              </Link>
            )}
          </li>
        ))}

        {currentPage < totalPages && (
          <li>
            <Link
              href={createPageUrl(currentPage + 1)}
              aria-label="Go to next page"
              className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 hover:text-gray-700 focus:z-10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <span>Next</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
