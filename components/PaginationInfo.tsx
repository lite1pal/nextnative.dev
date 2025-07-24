interface PaginationInfoProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  startIndex: number;
  endIndex: number;
}

export function PaginationInfo({
  currentPage,
  totalPages,
  totalItems,
  startIndex,
  endIndex,
}: PaginationInfoProps) {
  if (totalItems === 0) {
    return <p className="text-sm text-gray-600">No posts found</p>;
  }

  const actualStart = startIndex + 1;
  const actualEnd = Math.min(endIndex, totalItems);

  return (
    <p className="text-sm text-gray-600 mb-6">
      Showing {actualStart} to {actualEnd} of {totalItems} posts
      {totalPages > 1 && (
        <span className="ml-2">
          (Page {currentPage} of {totalPages})
        </span>
      )}
    </p>
  );
}
