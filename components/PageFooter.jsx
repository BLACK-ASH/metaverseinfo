"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const CustomPagination = ({ count,limit }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const pageCount = Math.ceil(count / limit);
  const currentPage = Number(searchParams.get("page")) || 1;

  const handlePageClick = (newPage) => {
    if (newPage < 1 || newPage > pageCount) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage);
    params.set("limit", limit);
    router.push(`${pathname}?${params.toString()}`);
  };

  // Generate visible pages with ellipsis
  const visiblePages = [];
  for (let i = 1; i <= pageCount; i++) {
    if (
      i === 1 ||
      i === pageCount ||
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      visiblePages.push(i);
    } else if (
      (i === currentPage - 2 && currentPage > 3) ||
      (i === currentPage + 2 && currentPage < pageCount - 2)
    ) {
      visiblePages.push("ellipsis");
    }
  }

  return (
    <Pagination className={"mt-4"}>
    
      <PaginationContent>
        {/* Previous */}
        <PaginationPrevious
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handlePageClick(currentPage - 1);
          }}
          disabled={currentPage === 1}
        />

        {/* Pages */}
        {visiblePages.map((p, idx) =>
          p === "ellipsis" ? (
            <PaginationItem key={`ellipsis-${idx}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={p}>
              <PaginationLink
                href="#"
                isActive={p === currentPage}
                onClick={(e) => {
                  e.preventDefault();
                  handlePageClick(p);
                }}
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        {/* Next */}
        <PaginationNext
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handlePageClick(currentPage + 1);
          }}
          disabled={currentPage === pageCount}
        />
      </PaginationContent>
    </Pagination>
  );
};

export default CustomPagination;
