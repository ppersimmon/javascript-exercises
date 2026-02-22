"use client";

import { useState } from "react";
import { Box, Avatar, Paper, Stack, TextField, Button } from "@mui/material";
import { MAX_COMMENT_LENGTH } from "../utils/constance";

interface WriteCommentProps {
  onAdd: (text: string) => void;
}
const WriteComment = ({ onAdd }: WriteCommentProps) => {
  const [comment, setComment] = useState<string>("");

  const handleSend = () => {
    if (comment.trim()) {
      onAdd(comment);
      setComment("");
    }
  };

  return (
    <Paper sx={{ p: 2, mb: 2, borderRadius: 2 }}>
      <Stack direction="row" spacing={2} alignItems="flex-start">
        <Avatar sx={{ bgcolor: "primary.main" }} />

        <Stack spacing={2} sx={{ width: "100%" }}>
          <TextField
            fullWidth
            multiline
            minRows={2}
            placeholder="Write your comment"
            variant="outlined"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            slotProps={{
              htmlInput: { maxLength: MAX_COMMENT_LENGTH },
            }}
            helperText={`${comment.length}/${MAX_COMMENT_LENGTH}`}
          />

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              onClick={handleSend}
              disabled={!comment.trim()}
            >
              Send
            </Button>
          </Box>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default WriteComment;
