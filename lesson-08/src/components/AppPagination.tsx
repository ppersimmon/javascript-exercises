import { Link, useLocation } from "react-router";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { Box } from "@mui/material";
import { blue } from "@mui/material/colors";

interface AppPaginationProps {
  count: number;
}

const AppPagination = ({ count }: AppPaginationProps) => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get("page") || "1", 10);

  return (
    <Box
      sx={{
        bgcolor: blue[50],
        mt: "auto",
        p: 4,
      }}
    >
      <Pagination
        page={page}
        count={count}
        renderItem={(item) => (
          <PaginationItem
            component={Link}
            to={`${location.pathname}${item.page === 1 ? "" : `?page=${item.page}`}`}
            {...item}
          />
        )}
      />
    </Box>
  );
};

export default AppPagination;
