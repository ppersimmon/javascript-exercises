import { useLocation } from "react-router";

export const usePageParam = (defaultPage = 1) => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get("page") || String(defaultPage), 10);
  return page;
};
