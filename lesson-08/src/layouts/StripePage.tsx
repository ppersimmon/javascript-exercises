import { useSearchParams } from "react-router";
import { Box, Toolbar } from "@mui/material";
import { blue } from "@mui/material/colors";
import ControlBar from "../components/ControlBar";
import AppPagination from "../components/AppPagination";
import { useStripePosts } from "../hooks/useStripePosts";
import PostList from "../components/PostList";

const StripePage = () => {
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);

  const {
    posts,
    loading,
    error,
    user,
    totalPages,
    handleDeletePost,
    handlePostCreated,
  } = useStripePosts(page);

  return (
    <Box
      sx={{
        bgcolor: blue[50],
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        gap: 2,
        pb: 4,
      }}
    >
      <ControlBar onPostCreated={handlePostCreated} />
      <Toolbar />

      <PostList
        posts={posts}
        loading={loading}
        error={error}
        onDelete={handleDeletePost}
        currentUserId={user?.id}
      />

      {!loading && !error && <AppPagination count={totalPages} />}
    </Box>
  );
};

export default StripePage;
