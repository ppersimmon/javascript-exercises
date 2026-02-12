import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Comment from "./Comment";
import WriteComment from "./WriteComment";
import { CommentI } from "../interfaces/CommentI";
import { useAppSelector } from "../store/hooks";

interface PostCommentsProps {
  comments: CommentI[];
  loading: boolean;
  onAdd: (text: string) => void;
  onDelete: (id: number) => void;
}

const PostComments = ({
  comments,
  loading,
  onAdd,
  onDelete,
}: PostCommentsProps) => {
  const navigate = useNavigate();
  const currentUser = useAppSelector((state) => state.users.singleUser);

  return (
    <>
      {currentUser ? (
        <WriteComment onAdd={onAdd} />
      ) : (
        <Box sx={{ mb: 3, textAlign: "center" }}>
          <Typography variant="body2" gutterBottom>
            Log in to post a comment.
          </Typography>
          <Button
            variant="outlined"
            size="small"
            onClick={() => navigate("/sign-in")}
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
            isOwner={Number(currentUser?.id) === Number(comment.user?.id)}
            onDelete={onDelete}
          />
        ))
      )}

      {comments.length === 0 && !loading && (
        <Typography variant="body2" color="text.secondary" align="center">
          No comments yet.
        </Typography>
      )}
    </>
  );
};

export default PostComments;
