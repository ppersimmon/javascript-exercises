import { useState, useEffect, useCallback } from "react";
import { useAppSelector } from "../store/hooks";
import { getEveryExhibit, deleteExhibit } from "../api/exhibitActions";
import { ExhibitType, PaginatedResponse } from "../interfaces/ExhibitType";

export const useStripePosts = (page: number) => {
  const [data, setData] = useState<PaginatedResponse<ExhibitType>>({
    data: [],
    total: 0,
    page: page,
    lastPage: 1,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const user = useAppSelector((state) => state.users.singleUser);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getEveryExhibit(page);
      setData(response);
    } catch (e) {
      console.error(e);
      setError("Failed to load posts");
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleDeletePost = useCallback(async (id: number) => {
    try {
      await deleteExhibit(id);
      setData((prev) => ({
        ...prev,
        data: prev.data.filter((p) => p.id !== id),
      }));
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handlePostCreated = useCallback(async () => {
    await fetchPosts();
  }, [fetchPosts]);

  return {
    data,
    loading,
    error,
    user,
    handleDeletePost,
    handlePostCreated,
  };
};
