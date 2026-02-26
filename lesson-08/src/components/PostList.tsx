import { Typography } from "@mui/material";
import Post from "./Post";
import AppPagination from "./AppPagination";
import { ExhibitType } from "../interfaces/ExhibitType";
import { useNavigate } from "react-router";

interface PostListProps {
  data: ExhibitType[];
  page: number;
  lastPage: number;
  navigationPath: string;
  onDelete: (id: number) => void;
  currentUserId?: number;
}

const PostList = ({
  data,
  page,
  lastPage,
  onDelete,
  currentUserId,
}: PostListProps) => {
  const navigate = useNavigate();

  if (!Array.isArray(data) || data.length === 0) {
    return <Typography>No posts found</Typography>;
  }

  return (
    <>
      {data.map((post) => (
        <Post
          key={post.id}
          {...post}
          showDelete={currentUserId === post?.user?.id}
          onDelete={onDelete}
          onClick={() => navigate(`/post/${post.id}`)}
        />
      ))}
      {lastPage > 1 && <AppPagination page={page} lastPage={lastPage} />}
    </>
  );
};

export default PostList;
