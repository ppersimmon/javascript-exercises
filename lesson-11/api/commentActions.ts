import { fetchClient } from "./fetchClient";
import { CommentI } from "../interfaces/CommentI";

export const fetchComments = async (exhibitId: number) => {
  return await fetchClient<CommentI[]>(`/api/exhibits/${exhibitId}/comments`);
};

export const addComment = async (exhibitId: number, text: string) => {
  return await fetchClient<CommentI>(`/api/exhibits/${exhibitId}/comments`, {
    method: "POST",
    body: JSON.stringify({ text }),
  });
};

export const deleteComment = async (exhibitId: number, commentId: number) => {
  return await fetchClient(`/api/exhibits/${exhibitId}/comments/${commentId}`, {
    method: "DELETE",
  });
};
