import { Typography } from "@mui/material";
import Post from "./Post";
import Loading from "./Loading";
import { ExhibitType } from "../interfaces/ExhibitType";
import { useNavigate } from "react-router";

interface PostListProps {
  posts: ExhibitType[];
  loading: boolean;
  error: string | null;
  onDelete: (id: number) => void;
  currentUserId?: number;
}

const PostList = ({
  posts,
  loading,
  error,
  onDelete,
  currentUserId,
}: PostListProps) => {
  const navigate = useNavigate();

  if (loading) return <Loading />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!Array.isArray(posts) || posts.length === 0) {
    return <Typography>No posts found</Typography>;
  }

  return (
    <>
      {posts.map((post) => (
        <Post
          key={post.id}
          post={post}
          showDelete={currentUserId === post.user.id}
          onDelete={onDelete}
          onClick={() => navigate(`/post/${post.id}`)}
        />
      ))}
    </>
  );
};

export default PostList;
