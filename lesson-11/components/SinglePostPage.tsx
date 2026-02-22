"use client";

import { Box, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";
import Post from "./Post";
import { ExhibitType } from "../interfaces/ExhibitType";
import Cookies from "js-cookie";

interface SinglePostPageProps {
  post: ExhibitType;
}

const SinglePostPage = ({ post }: SinglePostPageProps) => {
  const router = useRouter();
  const currentUserId = Cookies.get("userId");

  return (
    <>
      <Box sx={{ mb: 2 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => router.back()}
          variant="outlined"
        >
          Back
        </Button>
      </Box>

      <Post
        post={post}
        showDelete={Number(currentUserId) === Number(post.user?.id)}
      />
    </>
  );
};

export default SinglePostPage;
