import { useSearchParams } from "react-router";
import { Box, Toolbar, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import ControlBar from "../components/ControlBar";
import Loading from "../components/Loading";
import { useStripePosts } from "../hooks/useStripePosts";
import PostList from "../components/PostList";

const StripePage = () => {
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);

  const { data, loading, error, user, handleDeletePost, handlePostCreated } =
    useStripePosts(page);

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
          currentUserId={user?.id}
          onDelete={handleDeletePost}
          navigationPath="/stripe?page="
        />
      )}
    </Box>
  );
};

export default StripePage;
