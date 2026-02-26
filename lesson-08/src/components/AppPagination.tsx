import { Link, useLocation } from "react-router";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { Box } from "@mui/material";
import { blue } from "@mui/material/colors";

interface AppPaginationProps {
  page: number;
  lastPage: number;
}

const AppPagination = ({ page, lastPage }: AppPaginationProps) => {
  const location = useLocation();

  return (
    <Box sx={{ bgcolor: blue[50], mt: "auto", p: 4 }}>
      <Pagination
        page={Number(page)}
        count={lastPage}
        renderItem={(item) => {
          const toUrl =
            item.page === 1
              ? location.pathname
              : `${location.pathname}?page=${item.page}`;

          return <PaginationItem component={Link} to={toUrl} {...item} />;
        }}
      />
    </Box>
  );
};

export default AppPagination;
