import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import PostComments from "../components/PostComments";
import { usePostComments } from "../hooks/usePostComments";
import { useNavigate } from "react-router-dom";

import Comment from "../components/Comment";
import WriteComment from "../components/WriteComment";
import { ExhibitType } from "../interfaces/ExhibitType";
import { CommentI } from "../interfaces/CommentI";
import {
  fetchComments,
  addComment,
  deleteComment,
} from "../api/commentActions";
import { useAppSelector } from "../store/hooks";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

interface PostProps {
  post: ExhibitType;
  showDelete?: boolean;
  onDelete?: (id: number) => void;
  onClick?: () => void;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Post = ({ post, showDelete = false, onDelete, onClick }: PostProps) => {
  const {
    comments,
    commentsCount,
    loading,
    expanded,
    toggleExpand,
    handleAddComment,
    handleDeleteComment,
  } = usePostComments(post.id, post.commentCount);

  return (
    <Card sx={{ width: 650, maxWidth: "100%", boxShadow: 3, borderRadius: 2 }}>
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
        action={
          showDelete && (
            <IconButton onClick={() => onDelete && onDelete(post.id)}>
              <DeleteIcon />
            </IconButton>
          )
        }
      />
      <CardMedia
        component="img"
        height="300"
        image={post.imageUrl}
        alt={post.title}
        sx={{ objectFit: "cover" }}
        onClick={onClick}
      />

      <CardContent>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            wordWrap: "break-word",
          }}
        >
          {post.description}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        <Box sx={{ marginLeft: "auto", display: "flex", alignItems: "center" }}>
          <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
            {commentsCount}
          </Typography>
          <ExpandMore
            expand={expanded}
            onClick={toggleExpand}
            aria-expanded={expanded}
            aria-label="show more"
            sx={{ marginLeft: 0 }}
          >
            <ModeCommentIcon color="action" />
          </ExpandMore>
        </Box>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <PostComments
            comments={comments}
            loading={loading}
            onAdd={handleAddComment}
            onDelete={handleDeleteComment}
          />
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default Post;
