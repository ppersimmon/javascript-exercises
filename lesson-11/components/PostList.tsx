"use client";

import { Typography } from "@mui/material";
import Post from "./Post";
import { ExhibitType } from "../interfaces/ExhibitType";

interface PostListProps {
  posts: ExhibitType[];
  error: string | null;
  currentUserId: number | null;
}

const PostList = ({ posts, error = null, currentUserId }: PostListProps) => {
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
          showDelete={currentUserId === post.user?.id}
        />
      ))}
    </>
  );
};

export default PostList;
