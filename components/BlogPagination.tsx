"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { generatePageNumbers } from "@/lib/pagination";

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
  basePath?: string;
  baseUrl?: string; // For tag routes like /blog/category/react
}

export function BlogPagination({
  currentPage,
  totalPages,
  basePath = "/blog/page/",
  baseUrl, // For tag routes like /blog/category/react
}: BlogPaginationProps) {
  if (totalPages <= 1) return null;

  const pageNumbers = generatePageNumbers(currentPage, totalPages);

  const createPageUrl = (page: number) => {
    if (baseUrl) {
      // For tag routes: page 1 goes to baseUrl, page 2+ goes to baseUrl/page/X
      if (page === 1) {
        return baseUrl;
      }
      return `${baseUrl}/page/${page}`;
    } else {
      // For regular blog pagination
      if (page === 1) {
        return "/blog";
      }
      return `${basePath}${page}`;
    }
  };

  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className="mx-auto mt-10 flex w-full justify-center"
    >
      <ul className="flex flex-row items-center gap-1">
        {currentPage > 1 && (
          <li>
            <Link
              href={createPageUrl(currentPage - 1)}
              aria-label="Go to previous page"
              className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700 focus:z-10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
                style={{
                  boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.05)",
                }}
                aria-current={pageNumber === currentPage ? "page" : undefined}
                className={`inline-flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium ${
                  pageNumber === currentPage
                    ? "bg-primary z-10 text-white"
                    : "bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-700"
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
              style={{
                boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.05)",
              }}
              className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700 focus:z-10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
