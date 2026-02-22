"use client";
import { Pagination, PaginationItem } from "@mui/material";
import Link from "next/link";

interface AppPaginationProps {
  count: number;
  page: number;
  pathname: string;
}

const AppPagination = ({ count, page, pathname }: AppPaginationProps) => {
  return (
    <Pagination
      page={page}
      count={count}
      renderItem={(item) => (
        <PaginationItem
          component={Link}
          href={`${pathname}?page=${item.page}`}
          {...item}
        />
      )}
    />
  );
};

export default AppPagination;
