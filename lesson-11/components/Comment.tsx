"use client";

import {
  Box,
  Typography,
  Avatar,
  Paper,
  Stack,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { CommentI } from "../interfaces/CommentI";

interface CommentProps {
  comment: CommentI;
  isOwner: boolean;
  onDelete: (id: number) => void;
}

const Comment = ({ comment, isOwner, onDelete }: CommentProps) => {
  return (
    <Box sx={{ mt: 1 }}>
      <Paper sx={{ padding: 2, bgcolor: "#ffffff" }}>
        <Stack direction="row" spacing={2} alignItems="flex-start">
          <Avatar sx={{ bgcolor: "primary.main" }}>
            {comment.user.username[0].toUpperCase()}
          </Avatar>

          <Stack direction="column" sx={{ flexGrow: 1 }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="subtitle2" fontWeight="bold">
                {comment.user.username}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {new Date(comment.createdAt).toLocaleDateString()}
              </Typography>
            </Stack>

            <Typography variant="body2" sx={{ mt: 0.5 }}>
              {comment.text}
            </Typography>
          </Stack>

          {isOwner && (
            <IconButton
              size="small"
              onClick={() => onDelete(comment.id)}
              color="error"
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          )}
        </Stack>
      </Paper>
    </Box>
  );
};

export default Comment;
