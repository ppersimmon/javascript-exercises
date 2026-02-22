"use client";

import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import DeleteButton from "./DeleteButton";
import PostComments from "./PostComments";
import { ExhibitType } from "../interfaces/ExhibitType";
import Link from "next/link";

interface PostProps {
  post: ExhibitType;
  showDelete?: boolean;
}

const Post = ({ post, showDelete = false }: PostProps) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
  const cleanBaseUrl = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
  const cleanImagePath = post.imageUrl?.startsWith("/")
    ? post.imageUrl
    : `/${post.imageUrl}`;
  const ImageUrl = `${cleanBaseUrl}${cleanImagePath}`;

  return (
    <Card
      sx={{
        width: 650,
        maxWidth: "100%",
        boxShadow: 3,
        borderRadius: 2,
        mb: 2,
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "primary.main" }} aria-label="recipe">
            {post.user?.username ? post.user.username[0].toUpperCase() : "U"}
          </Avatar>
        }
        title={post.user?.username || "Unknown User"}
        subheader={
          post.createdAt ? new Date(post.createdAt).toLocaleDateString() : ""
        }
        action={showDelete && <DeleteButton postId={post.id} />}
      />
      <Link href={`/post/${post.id}`} style={{ textDecoration: "none" }}>
        <CardMedia
          component="img"
          height="300"
          image={ImageUrl}
          alt={post.title}
          sx={{ objectFit: "cover" }}
        />
      </Link>

      <CardContent>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ wordWrap: "break-word" }}
        >
          {post.description}
        </Typography>
      </CardContent>

      <PostComments postId={post.id} initialCount={post.commentCount} />
    </Card>
  );
};

export default Post;
