import { useSearchParams } from "react-router";
import { Box, Toolbar, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import ControlBar from "../components/ControlBar";
import PostList from "../components/PostList";
import { useHomePosts } from "../hooks/useHomePosts";
import Loading from "../components/Loading";

const HomePage = () => {
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const {
    data,
    loading,
    error,
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

      {loading && (!data?.data || data.data.length === 0) ? (
        <Loading />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <PostList
          {...data}
          currentUserId={currentUser?.id}
          onDelete={handleDeletePost}
          navigationPath="/?page="
        />
      )}
    </Box>
  );
};

export default HomePage;
