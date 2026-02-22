import AppPagination from "./AppPagination";

interface AppPaginationWrapperProps {
  count: number;
  page: number;
  pathname: string;
}

export default function AppPaginationWrapper({
  count,
  page,
  pathname,
}: AppPaginationWrapperProps) {
  return <AppPagination count={count} page={page} pathname={pathname} />;
}
