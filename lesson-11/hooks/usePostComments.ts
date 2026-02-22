import { useState } from "react";
import {
  fetchComments,
  addComment,
  deleteComment,
} from "../api/commentActions";
import { CommentI } from "../interfaces/CommentI";

export const usePostComments = (postId: number, initialCount: number = 0) => {
  const [comments, setComments] = useState<CommentI[]>([]);
  const [loading, setLoading] = useState(false);
  const [commentsCount, setCommentsCount] = useState(initialCount);
  const [expanded, setExpanded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const toggleExpand = async () => {
    if (!expanded && !isLoaded && commentsCount > 0) {
      setLoading(true);
      try {
        const data: any = await fetchComments(postId);
        setComments(data);
        setIsLoaded(true);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    setExpanded((prev) => !prev);
  };

  const handleAddComment = async (text: string) => {
    try {
      const newComment: any = await addComment(postId, text);
      setComments((prev) => [...prev, newComment]);
      setCommentsCount((prev) => prev + 1);
    } catch (e) {
      console.error("Failed to add comment", e);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      await deleteComment(postId, commentId);
      setComments((prev) => prev.filter((c) => c.id !== commentId));
      setCommentsCount((prev) => prev - 1);
    } catch (e) {
      console.error("Failed to delete comment", e);
    }
  };

  return {
    comments,
    commentsCount,
    loading,
    expanded,
    toggleExpand,
    handleAddComment,
    handleDeleteComment,
  };
};
