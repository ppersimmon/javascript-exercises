"use client";

import {
  Box,
  Button,
  Typography,
  CardActions,
  Collapse,
  CardContent,
  IconButton,
  IconButtonProps,
} from "@mui/material";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import Comment from "./Comment";
import WriteComment from "./WriteComment";
import { usePostComments } from "../hooks/usePostComments";
import Cookies from "js-cookie";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
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

interface PostCommentsProps {
  postId: number;
  initialCount: number;
}

const PostComments = ({ postId, initialCount }: PostCommentsProps) => {
  const router = useRouter();

  const currentUserId = Cookies.get("userId");
  const isLoggedIn = !!currentUserId;

  const {
    comments,
    commentsCount,
    loading,
    expanded,
    toggleExpand,
    handleAddComment,
    handleDeleteComment,
  } = usePostComments(postId, initialCount);

  return (
    <>
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
            <ModeCommentIcon color={expanded ? "primary" : "action"} />
          </ExpandMore>
        </Box>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {isLoggedIn ? (
            <WriteComment onAdd={handleAddComment} />
          ) : (
            <Box sx={{ mb: 3, textAlign: "center" }}>
              <Typography variant="body2" gutterBottom>
                Log in to post a comment.
              </Typography>
              <Button
                variant="outlined"
                size="small"
                onClick={() => router.push("/sign-in")}
              >
                Sign In
              </Button>
            </Box>
          )}

          {loading ? (
            <Typography>Loading comments...</Typography>
          ) : (
            comments.map((comment) => (
              <Comment
                key={comment.id}
                comment={comment}
                isOwner={Number(currentUserId) === Number(comment.user?.id)}
                onDelete={handleDeleteComment}
              />
            ))
          )}

          {comments.length === 0 && !loading && (
            <Typography variant="body2" color="text.secondary" align="center">
              No comments yet.
            </Typography>
          )}
        </CardContent>
      </Collapse>
    </>
  );
};

export default PostComments;
