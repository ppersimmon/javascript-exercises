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

import PostComments from "../components/PostComments";
import { usePostComments } from "../hooks/usePostComments";
import { ExhibitType } from "../interfaces/ExhibitType";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

interface PostProps extends ExhibitType {
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

const Post = ({
  id,
  description,
  imageUrl,
  user,
  createdAt,
  commentCount,
  showDelete = false,
  onDelete,
  onClick,
}: PostProps) => {
  const {
    comments,
    commentsCount,
    loading,
    expanded,
    toggleExpand,
    handleAddComment,
    handleDeleteComment,
  } = usePostComments(id, commentCount);

  return (
    <Card sx={{ width: 650, maxWidth: "100%", boxShadow: 3, borderRadius: 2 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "primary.main" }} aria-label="recipe">
            {user?.username ? user.username[0].toUpperCase() : "U"}
          </Avatar>
        }
        title={user?.username || "Unknown User"}
        subheader={createdAt ? new Date(createdAt).toLocaleDateString() : ""}
        action={
          showDelete && (
            <IconButton onClick={() => onDelete && onDelete(id)}>
              <DeleteIcon />
            </IconButton>
          )
        }
      />
      <CardMedia
        component="img"
        height="300"
        image={imageUrl}
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
          {description}
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
