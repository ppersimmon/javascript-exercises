import { useSearchParams } from "react-router";
import { Box, Toolbar } from "@mui/material";
import { blue } from "@mui/material/colors";
import ControlBar from "../components/ControlBar";
import AppPagination from "../components/AppPagination";
import PostList from "../components/PostList";
import { useHomePosts } from "../hooks/useHomePosts";

const HomePage = () => {
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const {
    posts,
    loading,
    error,
    totalPages,
    currentUser,
    handleDeletePost,
    handlePostCreated,
  } = useHomePosts(page);

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
        currentUserId={currentUser?.id}
      />

      {!loading && !error && <AppPagination count={totalPages} />}
    </Box>
  );
};

export default HomePage;
