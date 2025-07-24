export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startIndex: number;
  endIndex: number;
}

export function calculatePagination(
  page: number,
  totalItems: number,
  itemsPerPage: number = 6
): PaginationInfo {
  const currentPage = Math.max(1, page);
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const actualCurrentPage = Math.min(currentPage, totalPages || 1);

  const startIndex = (actualCurrentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  return {
    currentPage: actualCurrentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    hasNextPage: actualCurrentPage < totalPages,
    hasPreviousPage: actualCurrentPage > 1,
    startIndex,
    endIndex,
  };
}

export function generatePageNumbers(
  currentPage: number,
  totalPages: number
): (number | "ellipsis")[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: (number | "ellipsis")[] = [];

  // Always show first page
  pages.push(1);

  // Determine the range around current page
  let startPage = Math.max(2, currentPage - 1);
  let endPage = Math.min(totalPages - 1, currentPage + 1);

  // Add ellipsis after first page if needed
  if (startPage > 2) {
    pages.push("ellipsis");
  }

  // Add pages around current page
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  // Add ellipsis before last page if needed
  if (endPage < totalPages - 1) {
    pages.push("ellipsis");
  }

  // Always show last page (if it's not the first page)
  if (totalPages > 1) {
    pages.push(totalPages);
  }

  return pages;
}
